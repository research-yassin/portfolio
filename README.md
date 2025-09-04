# Personal Website — GitHub Pages Starter

Static, data-driven personal site for **Dr. Mohammad Hany Yassin**. No build step required — just HTML/CSS/JS.
Edit JSON files in `/data` to update Projects, Publications, and Teaching.

## Features
- Single-page app with hash routing (`#/home`, `#/projects`, `#/publications`, `#/teaching`, `#/cv`, `#/contact`)
- Dark mode toggle (persists via `localStorage`)
- Data-driven sections (edit `/data/*.json`)
- Search + BibTeX export in Publications
- Print-friendly CV and direct CV download
- Mobile-friendly, accessible navigation
- GitHub Pages workflow included

## Quick Start
1. Click **Use this template** or upload the files into a new GitHub repo.
2. Commit to the `main` branch.
3. Enable **Pages**: *Settings → Pages → Build and deployment → GitHub Actions → Deploy from a branch*. The included workflow will deploy automatically.
4. Visit the URL shown by the workflow (e.g., `https://<username>.github.io/<repo>`).

Alternatively (no Actions): *Settings → Pages → Source: Deploy from branch (main / root)*.

## Customize
- `data/profile.json` — name, title, bio, links, CV url
- `data/projects.json` — list of research/industry projects
- `data/publications.json` — publications (type, venue, doi)
- `data/teaching.json` — courses

## Custom Domain (optional)
- Add `CNAME` file with your domain, and set DNS `CNAME` to `<username>.github.io`.

## Local Preview
Double-click `index.html` or use any static server (e.g., `python -m http.server`).

---
*Generated 2025-09-04*
