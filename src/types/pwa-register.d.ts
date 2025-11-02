declare module 'virtual:pwa-register/react' {
    export function useRegisterSW(options?: {
        immediate?: boolean;
        onRegisteredSW?: (swUrl: string, registration: ServiceWorkerRegistration | undefined) => void;
        onRegisterError?: (error: any) => void;
    }): {
        needRefresh: boolean;
        offlineReady: boolean;
        updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
    };
}
