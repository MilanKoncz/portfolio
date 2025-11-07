/**
 * Global site configuration
 * - Centralizes navigation, social links, contact info, and feature toggles
 * - Update values here to reflect across the app
 */

export type SupportedPageKey = 'home' | 'about' | 'portfolio' | 'skills' | 'contact';

export interface NavItem {
    key: SupportedPageKey;
    path: string;
    enabled: boolean;
    /**
     * Optional custom aria-label for accessibility; if omitted, the localized label is used.
     */
    ariaLabel?: string;
}

export const navigation: NavItem[] = [
    { key: 'home', path: '/', enabled: true },
    { key: 'about', path: '/about', enabled: true },
    { key: 'portfolio', path: '/portfolio', enabled: false },
    { key: 'skills', path: '/skills', enabled: true },
    { key: 'contact', path: '/contact', enabled: true },
];

export const siteMeta = {
    title: 'Milan Koncz - Portfolio',
    baseUrl: 'https://milankoncz.me',
};

export const socialLinks = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
};

export const contact = {
    email: 'milan.koncz1@gmail.com',
    phone: '+49 1734151315',
    location: 'Mannheim, Germany',
    /**
     * Optional contact form endpoint (POST JSON: { name, email, message })
     * Leave empty to use local simulated submit.
     */
    formEndpoint: '/api/contact',
};

export const documents = {
    // Serve CV from public to get a stable, unhashed path and avoid AV false-positives.
    cvUrl: '/CVMilanKoncz.pdf',
};

export const featureToggles = {
    /** Show the Pacman easter-egg icon in the footer */
    showPacmanIcon: true,
    /** PWA update behavior: 'manual' (banner + button) or 'auto' (update immediately). */
    pwaUpdateMode: 'manual' as 'manual' | 'auto',
};

export const analytics = {
    /** Enable privacy-friendly analytics (Plausible) */
    enabled: true,
    /** Domain to track, e.g., "milan-koncz.com" */
    plausibleDomain: 'milankoncz.me',
    /** Script URL for Plausible */
    scriptSrc: 'https://plausible.io/js/script.js',
};

export const captcha = {
    /** Set provider to 'turnstile' to enable Cloudflare Turnstile; leave siteKey empty to disable on client. */
    provider: 'turnstile' as 'turnstile' | 'none',
    /** Turnstile site key (public). Secret belongs in server env TURNSTILE_SECRET_KEY. */
    siteKey: '0x4AAAAAAB_sUqiozJeeFdCu',
};
