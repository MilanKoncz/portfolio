import { useEffect } from 'react';
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

    useEffect(() => {
        // noop; `needRefresh` is a ref-like signal used below
    }, [needRefresh]);

    return (
        <div>
            {/* Controlled inline banner */}
            {needRefresh && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded shadow">
                    <span className="mr-3">Neue Version verfügbar.</span>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                        onClick={() => updateServiceWorker(true)}
                    >
                        Aktualisieren
                    </button>
                </div>
            )}
        </div>
    );
}
