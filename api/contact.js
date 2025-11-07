// Vercel Serverless Function (Node.js, ESM)
// Receives POST JSON: { name, email, message }
// Sends an email via SMTP using environment variables.

import nodemailer from 'nodemailer';
import https from 'https';

// Simple in-memory IP rate limiting (best-effort in serverless warm instances)
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 10); // requests
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000); // 1 hour
const ipBuckets = new Map(); // ip -> { count: number, windowStart: number }

function getClientIp(req) {
    const xfwd = req.headers['x-forwarded-for'];
    if (typeof xfwd === 'string' && xfwd.length > 0) {
        return xfwd.split(',')[0].trim();
    }
    const xreal = req.headers['x-real-ip'];
    if (typeof xreal === 'string' && xreal.length > 0) return xreal.trim();
    return req.socket?.remoteAddress || 'unknown';
}

function rateLimitAllow(ip) {
    const now = Date.now();
    const bucket = ipBuckets.get(ip);
    if (!bucket || now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
        ipBuckets.set(ip, { count: 1, windowStart: now });
        return true;
    }
    if (bucket.count >= RATE_LIMIT_MAX) return false;
    bucket.count += 1;
    return true;
}

/**
 * Safely parse the JSON body for environments that don't auto-parse req.body.
 */
async function parseBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    try {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString('utf8');
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Apply IP rate limiting early
    const ip = getClientIp(req);
    if (!rateLimitAllow(ip)) {
        res.setHeader('Retry-After', Math.ceil(RATE_LIMIT_WINDOW_MS / 1000).toString());
        res.status(429).json({ error: 'Too many requests' });
        return;
    }

    const body = await parseBody(req);
    const { name, email, message, website, cfTurnstileToken } = body || {};

    // Basic validations
    if (website) {
        // Honeypot field filled => very likely a bot
        res.status(200).json({ ok: true });
        return;
    }

    if (!name || !email || !message) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }

    const {
        SMTP_HOST,
        SMTP_PORT = '587',
        SMTP_USER,
        SMTP_PASS,
        MAIL_FROM,
        MAIL_TO,
        SIMULATE_EMAIL,
        TURNSTILE_SECRET_KEY,
    } = process.env;

    const shouldSimulate = SIMULATE_EMAIL === 'true' || !SMTP_HOST || !SMTP_USER || !SMTP_PASS;

    // Optional: verify Cloudflare Turnstile token if provided
    async function verifyTurnstile(token) {
        // If no server secret is configured, skip verification
        if (!TURNSTILE_SECRET_KEY) return true;
        // If secret exists but no token provided, fail fast
        if (!token) return false;
        const postData = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token }).toString();
        return await new Promise((resolve) => {
            const req = https.request({
                method: 'POST',
                hostname: 'challenges.cloudflare.com',
                path: '/turnstile/v0/siteverify',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) }
            }, (r) => {
                const chunks = [];
                r.on('data', (c) => chunks.push(c));
                r.on('end', () => {
                    try {
                        const json = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                        resolve(Boolean(json.success));
                    } catch {
                        resolve(false);
                    }
                });
            });
            req.on('error', () => resolve(false));
            req.write(postData);
            req.end();
        });
    }

    const turnstileOk = await verifyTurnstile(cfTurnstileToken);
    if (!turnstileOk) {
        res.status(400).json({ error: 'Captcha verification failed' });
        return;
    }

    if (shouldSimulate) {
        // Pseudo-simulated send: log and respond OK without external services
        console.log('[contact] Simulated send:', { name, email, message });
        // Small delay to mimic network/SMTP latency
        await new Promise((r) => setTimeout(r, 500));
        res.status(200).json({ ok: true, simulated: true });
        return;
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: String(SMTP_PORT) === '465', // true for 465, false for other ports
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const to = MAIL_TO || SMTP_USER;
    const from = MAIL_FROM || `Portfolio Contact <${SMTP_USER}>`;

    const safe = String(message)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const subject = `New message from ${name}`;
    const text = `You have received a new message via the portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
    const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.5;color:#111">
            <h2 style="margin:0 0 12px">New message from ${name}</h2>
            <p style="margin:0 0 6px"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="white-space:pre-wrap">${safe}</p>
        </div>
    `;

    try {
        await transporter.sendMail({ from, to, subject, text, html, replyTo: email });
        res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Email send failed', err);
        res.status(502).json({ error: 'Failed to send email' });
    }
}
