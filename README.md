# Turf Khuji — টার্ফ খুঁজি

Find. Book. Play.

Interactive prototype of the Turf Khuji Android app, built as a web app (React + Vite)
so it can be previewed in a browser or embedded anywhere. It renders a phone-frame
mockup with Home, Explore, Turf Details, the full booking flow (slots → summary →
payment → success), Bookings, Play, and Profile — including a working dark/light
toggle and EN/বাং language switch.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs static files to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Deploy

`dist/` is a plain static site, so any static host works.

**Vercel**
```bash
npm i -g vercel
vercel
```
(Framework preset: Vite. Build command `npm run build`, output directory `dist`.)

**Netlify**
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**GitHub Pages**
1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the
   `gh-pages` npm package / a GitHub Actions workflow).
3. Set `base: "/your-repo-name/"` in `vite.config.js` if the site isn't served
   from the domain root.

## Project structure

```
turf-khuji/
├── index.html          Vite entry HTML
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx         Mounts <App /> into #root
│   ├── App.jsx           All screens, components, and styles
│   └── index.css         Minimal reset
```

## Notes

- All UI, mock data (turfs, slots, pricing, bookings), and styling live in
  `src/App.jsx` — it's a single self-contained component with a `<style>`
  block, so there's nothing else to wire up.
- Turf photos are CSS-generated grass-stripe/floodlight tiles, not images,
  so there are no external asset dependencies.
- This is a front-end prototype only — there's no backend, auth, or real
  payment integration. Booking data resets on page reload.
- To turn this into the real native app described in the design brief,
  the next step would be a Jetpack Compose implementation for Android
  (the design tokens in `App.jsx`'s `CSS` constant map directly to
  `Color.kt` / `Type.kt` / `Shape.kt` values).
