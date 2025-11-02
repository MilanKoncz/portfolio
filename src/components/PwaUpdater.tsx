import { useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Displays a subtle toast when a new version is available and prompts user to refresh.
 */
export default function PwaUpdater() {
    const { needRefresh, updateServiceWorker } = useRegisterSW({
        onRegisteredSW(_swUrl, _reg) {
            // Optional: log or analytics
        },
        onRegisterError(_error) {
            // Optional: log errors
            // console.error('SW registration failed', error);
        },
    });

    const hasUpdatedRef = useRef(false);

    useEffect(() => {
        // Sobald eine neue Version verfügbar ist, automatisch aktualisieren
        if (!hasUpdatedRef.current && needRefresh) {
            hasUpdatedRef.current = true;
            (async () => {
                try {
                    await updateServiceWorker(true);
                    setTimeout(() => {
                        if (typeof window !== 'undefined') {
                            (window as any).location?.reload?.();
                        }
                    }, 1500);
                } catch {
                    if (typeof window !== 'undefined') {
                        (window as any).location?.reload?.();
                    }
                }
            })();
        }
    }, [needRefresh, updateServiceWorker]);

    // Keine UI nötig – Update passiert automatisch
    return null;
}
