# The Audorra Project — Vue 3 Pastel Site

**Tech**: Vue 3 + Vite + TailwindCSS

### 1) Install & run
```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

### 2) Build
```bash
pnpm build
pnpm preview
```

### 3) Deploy
- **Netlify**: drag-drop the folder or connect repo. Netlify Forms works out of the box.
- **Vercel**: add project, set framework "Vite".

### 4) Config you may want to tweak
- Replace `/public/avatar.jpg` with your own.
- Update links (LinkedIn, Instagram, YouTube) in components.
- Edit the Song-of-the-Day `SEED` list in `SongOfTheDay.vue`.
- Change brand text in `HeaderHero.vue` / footer.

### APIs
- **iTunes Search API** (no key): used to search songs and fetch artwork/preview.
  - Example: `https://itunes.apple.com/search?term=kesariya&entity=song&limit=8&country=IN`

### Notes
- If you don't use Netlify, requests are still saved to `localStorage` as a safety net.
- Styling aims for pastel, playful, and calm. Tailwind makes palette updates trivial.

