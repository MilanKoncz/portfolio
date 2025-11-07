// Serverless function to submit URLs to IndexNow
// Endpoint: /api/indexnow
// Usage (client or manual): POST JSON { urls?: string[] } -> will default to site base URL
// Requires environment variable SITE_BASE_URL (e.g. https://milankoncz.me)
// Optional: INDEXNOW_KEY (must match key file placed under public/ named indexnow-key-<KEY>.txt)
// Docs: https://www.indexnow.org/documentation

import https from 'https';

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

function postIndexNow(data) {
    const payload = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        const req = https.request({
            method: 'POST',
            hostname: 'api.indexnow.org',
            path: '/IndexNow',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => {
                const body = Buffer.concat(chunks).toString('utf8');
                resolve({ status: res.statusCode, body });
            });
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const body = await parseBody(req);
    const { urls } = body || {};

    const { SITE_BASE_URL, INDEXNOW_KEY } = process.env;
    if (!SITE_BASE_URL || !INDEXNOW_KEY) {
        res.status(500).json({ error: 'Missing SITE_BASE_URL or INDEXNOW_KEY env var' });
        return;
    }

    // Only allow our own domain URLs for safety
    const normalized = (Array.isArray(urls) && urls.length ? urls : [SITE_BASE_URL])
        .filter(u => typeof u === 'string' && u.startsWith(SITE_BASE_URL));

    const data = {
        host: SITE_BASE_URL.replace(/^https?:\/\//, ''),
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_BASE_URL}/indexnow-key-${INDEXNOW_KEY}.txt`,
        urlList: normalized
    };

    try {
        const result = await postIndexNow(data);
        res.status(200).json({ ok: true, submitted: normalized, remoteStatus: result.status, remoteBody: result.body });
    } catch (err) {
        console.error('[indexnow] submission failed', err);
        res.status(502).json({ error: 'IndexNow submission failed' });
    }
}
