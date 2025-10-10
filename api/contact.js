// Vercel Serverless Function (Node.js, ESM)
// Receives POST JSON: { name, email, message }
// Sends an email via SMTP using environment variables.

import nodemailer from 'nodemailer';

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

    const body = await parseBody(req);
    const { name, email, message, website } = body || {};

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
    } = process.env;

    const shouldSimulate = SIMULATE_EMAIL === 'true' || !SMTP_HOST || !SMTP_USER || !SMTP_PASS;

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

    const subject = `New message from ${name}`;
    const text = `You have received a new message via the portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
    const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New message from ${name}</h2>
      <p style="margin:0 0 6px"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p style="white-space:pre-wrap">${String(message).replace(/</g, '&lt;')}</p>
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
