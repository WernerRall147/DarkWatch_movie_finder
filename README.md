# DarkWatch

## CI Status

[![Smoke Tests](https://github.com/WernerRall147/DarkWatch_movie_finder/workflows/Smoke%20Tests/badge.svg)](https://github.com/WernerRall147/DarkWatch_movie_finder/actions/workflows/smoke.yml)
[![Link Checker](https://github.com/WernerRall147/DarkWatch_movie_finder/workflows/Link%20Checker/badge.svg)](https://github.com/WernerRall147/DarkWatch_movie_finder/actions/workflows/links.yml)

Regional Movie Finder (static front-end prototype).  
Fetches popular (and optionally searched) movie titles per locale using **unofficial** JustWatch endpoints. Optional trailer lookup via YouTube Data API and IMDb ratings via OMDb.

> The JustWatch endpoints used here are undocumented and may break without notice. For production, seek proper licensed APIs or an official partnership.

## Features
- Region selector (locale switching)
- Popular list & free-text search
- Incremental pagination (Load more)
- Skeleton loading placeholders
- Optional YouTube trailer modal
- Optional OMDb ratings (IMDb)
- PWA Manifest + light service worker (offline shell)
- Responsive pure static front-end (no build step)

## Quick Start
1. Clone repository.
2. (Optional) Edit `index.html` and add:
   ```js
   const YOUTUBE_API_KEY = "YOUR_YOUTUBE_DATA_API_KEY";
   const OMDB_API_KEY = "YOUR_OMDB_KEY";
   ```
3. Commit & push (already mostly done via init-site branch).
4. Enable GitHub Pages: Settings → Pages → Source: Deploy from branch → main → /(root).
5. After merging this branch, Pages will serve `index.html`.

## API Keys
| Feature | Service | Notes |
|---------|---------|-------|
| Trailers | YouTube Data API v3 | Put key in `index.html` constant |
| IMDb ratings | OMDb | Free tier has rate limits |

Without keys those buttons/features gracefully degrade.

## Hardening & Privacy
Exposed keys on a public static site are not secure. Consider a tiny proxy (Cloudflare Worker / Vercel edge) that:
- Accepts sanitized query parameters
- Injects secret keys server-side
- Adds short-lived caching (e.g. 12h per title)

## Roadmap Ideas
- Provider icon mapping (show where it’s streaming)
- Infinite scroll (replace load button)
- Watchlist (localStorage)
- Theme toggle (light/dark variants)
- Worker/Edge proxy for API calls
- GitHub Action to snapshot daily data JSON
- Add TV series toggle (content_types includes "show")

## Development
No build step needed. Still, you can add tooling:
```
npm init -y
npm install --save-dev prettier eslint
```

## License
MIT (see LICENSE).

## Disclaimer
JustWatch endpoints are unofficial. Respect their Terms. Educational / personal use only.