// Post-build IndexNow ping. Runs automatically via npm "postbuild".
// Only acts in production environment and when required env vars are set.
// Env vars required in Vercel: SITE_BASE_URL, INDEXNOW_KEY.

import https from 'https';

const baseUrl = process.env.SITE_BASE_URL;
const key = process.env.INDEXNOW_KEY;
const env = process.env.VERCEL_ENV || process.env.NODE_ENV;

if (!baseUrl || !key) {
    console.log('[indexnow] skipped (missing SITE_BASE_URL or INDEXNOW_KEY)');
    process.exit(0);
}

if (env && env !== 'production') {
    console.log(`[indexnow] skipped (env=${env})`);
    process.exit(0);
}

const payload = JSON.stringify({
    host: baseUrl.replace(/^https?:\/\//, ''),
    key,
    keyLocation: `${baseUrl}/indexnow-key-${key}.txt`,
    urlList: [baseUrl]
});

function postIndexNow(data) {
    return new Promise((resolve, reject) => {
        const req = https.request({
            method: 'POST',
            hostname: 'api.indexnow.org',
            path: '/IndexNow',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

(async () => {
    try {
        const result = await postIndexNow(payload);
        console.log('[indexnow] done', result.status, result.body);
    } catch (e) {
        console.error('[indexnow] failed', e);
        // don't fail the build; just log
    }
})();
