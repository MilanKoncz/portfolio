// TypeScript shim to prevent duplicate implementations.
// Prefer the JavaScript handler at api/contact.js.
// If Vercel resolves this file, return 501 to avoid confusion.
export default async function handler(_req: any, res: any) {
    return res.status(501).json({ error: 'Use api/contact.js handler' });
}
