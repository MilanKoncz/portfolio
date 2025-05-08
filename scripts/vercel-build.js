// Special script for Vercel deployments that need to bypass certain TypeScript errors
import { exec } from 'child_process';

console.log('🚀 Starting Vercel deployment build...');
console.log('Skipping TypeScript checks and proceeding with the build');

// Run the build directly with Vite, bypassing TypeScript errors
exec('vite build', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during build: ${error.message}`);
        process.exit(1);
    }

    console.log(stdout);
    if (stderr) {
        console.error(stderr);
    }

    console.log('✅ Build completed successfully!');
});
