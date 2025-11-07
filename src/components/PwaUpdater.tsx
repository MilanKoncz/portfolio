import { useCallback, useEffect, useRef, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { featureToggles } from '../config/site';

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

    const [suppress, setSuppress] = useState(false);
    const updatingRef = useRef(false);

    useEffect(() => {
        // Wenn wir gerade ein Update ausgelöst haben, nach Reload nicht erneut sofort triggern
        if (typeof window !== 'undefined') {
            const justUpdated = sessionStorage.getItem('pwa-just-updated');
            if (justUpdated) {
                sessionStorage.removeItem('pwa-just-updated');
                setSuppress(true);
            }
        }
    }, []);

    const handleUpdate = useCallback(async () => {
        if (updatingRef.current) return;
        updatingRef.current = true;
        try {
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('pwa-just-updated', '1');
            }
            await updateServiceWorker(true);
            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    (window as any).location?.reload?.();
                }
            }, 1200);
        } catch {
            if (typeof window !== 'undefined') {
                (window as any).location?.reload?.();
            }
        } finally {
            updatingRef.current = false;
        }
    }, [updateServiceWorker]);

    // Auto-Update-Modus: direkt aktualisieren, aber mit Session-Guard (kein Loop)
    useEffect(() => {
        if (featureToggles.pwaUpdateMode === 'auto' && needRefresh && !suppress) {
            void handleUpdate();
        }
    }, [handleUpdate, needRefresh, suppress]);

    if (!needRefresh || suppress || featureToggles.pwaUpdateMode === 'auto') return null;

    // Manual-Modus: Banner + Button anzeigen
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded shadow flex items-center gap-3">
            <span>Neue Version verfügbar.</span>
            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded" onClick={handleUpdate}>
                Aktualisieren
            </button>
        </div>
    );
}
