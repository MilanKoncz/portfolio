## Portfolio (React + Vite + TypeScript + Tailwind)

This repository contains a single-page application (SPA) portfolio site. It uses React Router for client-side routing, Vite for bundling, TailwindCSS for styling, and a small PWA setup.

Key highlights
- Centralized config for content and navigation: see `src/config/`
- Language toggle (English/German) with `LanguageContext`
- Accessible, responsive layout with animated UI flourishes
- Deployed on Vercel with SPA rewrites via `vercel.json`

Project structure
- `src/`
	- `main.tsx` bootstraps React and mounts `<App />`
	- `App.tsx` defines the route map using `createBrowserRouter`
	- `layout/Layout.tsx` renders the header, footer, nav, and `<Outlet />`
	- `pages/` contains route components (Home, About, Portfolio, Skills, Contact, Pacman)
	- `components/` reusable UI (LoadingBar, BackToTop, SkipToContent, PacmanIcon)
	- `context/LanguageContext.tsx` language and translations
	- `config/`
		- `site.ts` global navigation, social/contact links, feature toggles, meta
		- `content.ts` editable text content for sections

How it works
1) Entry point `index.html` loads `src/main.tsx`
2) `<App />` sets up routes and wraps everything in `LanguageProvider`
3) `Layout` renders the navigation based on `config/site.ts` and shows children via `<Outlet />`
4) Each page can read from `config/site.ts` and `config/content.ts` to display centralized content/links

Edit content in one place
- Navigation and feature toggles: `src/config/site.ts`
- Page text content: `src/config/content.ts`

Enable/disable pages in the header
- In `src/config/site.ts`, flip the `enabled` flag for `navigation` items. Disabled pages are hidden from the header while routes remain available if you navigate directly.

Development
```powershell
npm install
npm run dev
```

Build
```powershell
npm run build
npm run preview
```

Vercel deployment notes
- `vercel.json` rewrites all non-file requests to `/index.html` for SPA routing.
- Build command: `vite build`, output directory: `dist`.

Additional ideas
- Add analytics opt-in (e.g., Plausible) via a toggle in `site.ts`.
- Extract projects list in Portfolio to `config/portfolio.ts` for easier editing.
- Add a contact form backend (Vercel/Netlify function or third-party service) and point the form submit there.

Sicherer CV-Download (Hinweise)
- Lege die PDF unter `public/` ab (z. B. `/CVMilanKoncz.pdf`). Vite/Vercel liefern diese Datei unverändert, mit korrektem MIME-Type.
- Verlinke in der App mit einem stabilen Pfad (siehe `documents.cvUrl` in `src/config/site.ts`). Kein Import aus `src/assets` nötig.
- Bei False-Positives von Virenscannern: Datei neu exportieren (ohne eingebettete Skripte/Metadaten), ggf. umbenennen und Signatur/Zeitstempel entfernen.
- Alternativ extern hosten (z. B. GitHub Releases, Google Drive mit Direct-Link) und `documents.cvUrl` entsprechend setzen.

SMTP email for the contact form
- Backend lives at `api/contact.js` and uses Nodemailer over SMTP.
- Configure these environment variables in Vercel Project Settings → Environment Variables (and locally in a `.env` file if you run with a Node adapter):
	- `SMTP_HOST` (e.g., smtp.gmail.com or your provider)
	- `SMTP_PORT` (465 for SSL or 587 for STARTTLS; default 587)
	- `SMTP_USER` (SMTP username)
	- `SMTP_PASS` (SMTP password or app-specific password)
	- `MAIL_FROM` (optional, default uses SMTP_USER)
	- `MAIL_TO` (optional, default sends to SMTP_USER)
- The contact form posts to `/api/contact`. A honeypot `website` field is handled to reduce bot spam.
