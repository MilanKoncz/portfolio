#!/usr/bin/env node

// This script prepares the environment for Vercel deployment
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create the necessary directory structure if it doesn't exist
const typeDirs = [
    path.join(rootDir, '.react-router', 'types', 'dev'),
    path.join(rootDir, 'app', '+types'),
    path.join(rootDir, 'app', 'routes', '+types')
];

typeDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Create @react-router/dev shim modules
const devConfigShim = `// This is a shim for @react-router/dev/config
export interface Config {
  ssr?: boolean;
  [key: string]: any;
}`;

const devRoutesShim = `// This is a shim for @react-router/dev/routes
export type RouteConfig = any[];
export const index = (path: string) => ({ path: "/", component: path });`;

// Write the shim modules
fs.writeFileSync(path.join(rootDir, '.react-router', 'types', 'dev', 'config.ts'), devConfigShim);
fs.writeFileSync(path.join(rootDir, '.react-router', 'types', 'dev', 'routes.ts'), devRoutesShim);

console.log('Environment prepared for build!');
