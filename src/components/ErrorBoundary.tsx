import React from 'react';

// Small utility to detect chunk load errors
const isChunkLoadError = (error: unknown) => {
    const msg = (error as any)?.message || '';
    const name = (error as any)?.name || '';
    return /ChunkLoadError|Loading chunk [\d]+ failed|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
        msg + ' ' + name
    );
};

type Props = {
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
    isChunkError: boolean;
    error?: Error;
};

/**
 * Global Error Boundary
 * - Catches runtime exceptions and common chunk loading failures from code-splitting/PWA updates
 * - Offers a quick retry for chunk errors and a full refresh button
 */
export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, isChunkError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, isChunkError: isChunkLoadError(error), error };
    }

    componentDidCatch(_error: Error, _info: React.ErrorInfo): void {
        // In production, send to analytics/logging here if needed
    }

    handleRetry = () => {
        // Try to re-request the failing chunk by reloading the current route component
        // A minimal approach is a soft reload via history.replaceState then location.reload
        // But we first try a cache-busting reload
        if (typeof window !== 'undefined') {
            const now = Date.now();
            const last = Number(sessionStorage.getItem('last-reload-ts') || '0');
            if (!last || now - last > 5000) {
                sessionStorage.setItem('last-reload-ts', String(now));
                (window as any).location?.reload?.();
            }
        }
    };

    handleHardRefresh = () => {
        if (typeof window !== 'undefined') {
            if ('caches' in window) {
                const now = Date.now();
                const last = Number(sessionStorage.getItem('last-reload-ts') || '0');
                if (last && now - last <= 5000) return;
                caches
                    .keys()
                    .then((keys) => keys.forEach((k) => caches.delete(k)))
                    .finally(() => {
                        sessionStorage.setItem('last-reload-ts', String(Date.now()));
                        (window as any).location?.reload?.();
                    });
            } else {
                sessionStorage.setItem('last-reload-ts', String(Date.now()));
                (window as any).location?.reload?.();
            }
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-gray-900">
                    <div className="max-w-md w-full text-center">
                        <h1 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Etwas ist schiefgelaufen.</h1>
                        {this.state.isChunkError ? (
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Eine neue Version der Seite wurde veröffentlicht und manche Dateien konnten nicht geladen werden.
                                Bitte aktualisiere die Seite.
                            </p>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Ein unerwarteter Fehler ist aufgetreten. Du kannst es erneut versuchen oder die Seite neu laden.
                            </p>
                        )}
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={this.handleRetry}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                Neu laden
                            </button>
                            <button
                                onClick={this.handleHardRefresh}
                                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Hartes Refresh
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
