// vite-plugin-ignore-ts-errors.js
export default function ignoreTypeScriptErrors() {
    return {
        name: 'vite:ignore-ts-errors',
        handleHotUpdate({ file, server }) {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                return [];
            }
        },
        resolveId(id) {
            // Provide shim modules for common imports
            if (id === '@react-router/dev/config') {
                return '\0virtual:@react-router/dev/config';
            }
            if (id === '@react-router/dev/routes') {
                return '\0virtual:@react-router/dev/routes';
            }
            return null;
        },
        load(id) {
            // Provide implementations for virtual modules
            if (id === '\0virtual:@react-router/dev/config') {
                return 'export const Config = {}; export default {};';
            }
            if (id === '\0virtual:@react-router/dev/routes') {
                return 'export const RouteConfig = []; export const index = (path) => ({ path: "/", component: path });';
            }
            return null;
        },
        transform(code, id) {
            // Handle specific modules with known issues
            if (id.includes('@react-router/dev') || id.includes('framer-motion')) {
                return {
                    code: code.replace(/import\s+.*?from\s+['"]@react-router\/dev\/.*?['"]/gs,
                        '// TypeScript import shim'),
                    map: null
                };
            }

            // Handle all TypeScript references
            if (id.endsWith('.tsx') || id.endsWith('.ts')) {
                return {
                    code: code.replace(/import\s+type\s+.*?;/gs, '// Type import removed'),
                    map: null
                };
            }

            return null;
        }
    };
}
