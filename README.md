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

PWA Update-Verhalten
- Steuerbar via `featureToggles.pwaUpdateMode` in `src/config/site.ts`:
	- `manual` (Standard): Zeigt einen Hinweis mit Button „Aktualisieren“.
	- `auto`: Aktualisiert automatisch, sobald eine neue Version verfügbar ist.
	- Beide Modi sind gegen Reload-Schleifen abgesichert (Session-Guards).

Suchmaschinen & Indexierung

Google (Search Console)
- Du musst nichts „manuell“ indexieren – Google findet dich über Links und/oder Besuch deiner Domain.
- Optional: In der Google Search Console (Property anlegen) kannst du deine Startseite oder `sitemap.xml` manuell crawlen lassen (URL-Prüfung → Indexierung anfordern). Das beschleunigt erste Aufnahme.

Bing Webmaster Tools
1. Property hinzufügen (URL eingeben) und verifizieren (am einfachsten per DNS TXT oder CNAME; alternativ HTML-Datei oder Meta-Tag).
2. `https://milankoncz.me/sitemap.xml` einreichen (Menü: Sitemaps). Unsere Sitemap enthält nur die Root-URL, damit nur Home indexiert wird.
3. „URL Submission“ / „Indexierung anfordern“ nutzen für schnellere Aufnahme bei großen Änderungen.

DuckDuckGo
- Nutzt vorrangig Bing-Index + eigene Quellen. Sobald du bei Bing erscheinst, tauchst du meist zeitnah bei DuckDuckGo auf. Keine eigene Konsole nötig.

Was heißt „Sitemap einreichen“?
- In einem Webmaster Tool (Google Search Console oder Bing) fügst du die URL zur Sitemap hinzu. Das hilft dem Crawler zu verstehen, welche Seiten du priorisierst. Da deine Sitemap nur `/` enthält, verstärkst du das Signal: „Nur Startseite indexieren“.

`noindex` Umsetzung
- Alle Unterseiten (About, Skills, Contact, Portfolio) besitzen `<meta name="robots" content="noindex,follow">`, sodass sie nicht im Index landen, aber interne Links weitergegeben werden.

Social Banner (Open Graph / Twitter Card)
- Ein Social Banner ist ein breites Bild (idealerweise 1200x630 px, PNG oder JPEG) das beim Teilen deiner URL auf Plattformen (Slack, LinkedIn, Twitter, Facebook) angezeigt wird.
- Erstelle z.B. `public/og-banner.png` mit Titel + kurzer Tagline.
- Dann in `index.html` und/oder `Home.tsx` die Tags ersetzen:
  - `og:image` → `/og-banner.png`
  - `twitter:image` → `/og-banner.png`
  - Beibehalten von `summary_large_image` für großformatige Darstellung.

IndexNow (schnelle Aktualisierungs-Pings für Bing & andere)
- IndexNow ist ein Protokoll, mit dem du Suchmaschinen aktiv anstupst, wenn Inhalte sich ändern.
- Implementierung in diesem Repo: `/api/indexnow.js` (Vercel Function)
	- Env Variablen in Vercel setzen:
		- `SITE_BASE_URL` = `https://milankoncz.me`
		- `INDEXNOW_KEY` = z. B. `3f2c7d8e2a1b4c5d6e7f8a9b0c`
	- Lege die Key-Datei unter `public/indexnow-key-<INDEXNOW_KEY>.txt` an (bereits vorhanden) – Inhalt ist nur der Key selbst.
	- Nutzung: `POST https://milankoncz.me/api/indexnow` mit Body `{ "urls": ["https://milankoncz.me/"] }`. Ohne Body pingt die Startseite.
	- Sicherheit: Es werden nur URLs akzeptiert, die mit `SITE_BASE_URL` beginnen.
	- Referenz: https://www.indexnow.org/documentation

Optional: Automatisch nach Deploy pingen
- Du kannst in Vercel ein deploy hook oder nach-Build Schritt konfigurieren, der `POST /api/indexnow` ohne Body ausführt, sodass die Startseite nach jedem Release gemeldet wird.

Hinweis bei Key-Änderung (IndexNow)
- Wenn du später den IndexNow-Key änderst, müssen IMMER zwei Dinge synchron angepasst werden:
	1) Die Datei unter `public/indexnow-key-<KEY>.txt` (Dateiname + Dateiinhalt = neuer Key)
	2) Die Vercel Environment Variable `INDEXNOW_KEY`
- Danach neu deployen, damit beides live ist und die Pings wieder akzeptiert werden.

Favicon / Icon Best Practices
- `favicon.ico` liegt im Root und wird von älteren Browsern/Clients verwendet.
- Zusätzlich ein eigens skaliertes PNG `favicon-32-32.png` für gestochen scharfes SERP/Sharing Icon.
- Weitere Größen (48x48, 192x192, 512x512) decken PWA + hochauflösende Geräte ab.
- Wenn Google dein Icon nicht sofort zeigt: Warten (Caching), oder in Search Console „Seite erneut crawlen“ anfordern.

Zusammenfassung der SEO-Signale
- Sitemap nur mit `/` → Fokus auf Startseite.
- `noindex,follow` auf Unterseiten.
- Vollständige OG/Twitter Meta + strukturierte Daten (Person, WebSite) in `Home.tsx`.
- Saubere Favicons (ICO + PNG 32x32 + PWA Icons).
- Optional: Social Banner hinzufügen für bessere Teil-Vorschau.
