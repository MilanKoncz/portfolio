/**
 * Wrap React.lazy dynamic imports to retry once after a short delay.
 * Helps with transient chunk load errors after deploys/PWA updates.
 */
export function lazyImportWithRetry<T>(importer: () => Promise<T>, retries = 1, delayMs = 200) {
    const attempt = (n: number): Promise<T> =>
        importer().catch((err) => {
            if (n <= 0) throw err;
            return new Promise<T>((resolve, reject) => {
                setTimeout(() => {
                    attempt(n - 1).then(resolve).catch(reject);
                }, delayMs);
            });
        });
    return () => attempt(retries);
}
