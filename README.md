# One Minute From Earth 🌍

A colorful, immersive travel-discovery app that takes you somewhere new every 60 seconds.

## What it does

- Rotates to a new destination every 60 seconds
- Includes a **Surprise Me** button for instant jumps
- Tracks visited places in a digital passport
- Saves favorites and travel history locally
- Includes search and destination categories
- Unlocks simple achievements as you explore
- Works across desktop and mobile layouts
- Uses a vivid globe-first visual style inspired by the final concept direction

## Current destinations

Santorini, Socotra, Shirakawa-go, Sossusvlei, Banff, Lençóis Maranhenses, Cappadocia, and Lofoten.

## Tech stack

- React
- Vite
- Lucide React
- CSS
- localStorage persistence
- GitHub Actions CI

## Run locally

```bash
git clone https://github.com/22koki/One_Min_From_Earth.git
cd One_Min_From_Earth
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  App.jsx
  data.js
  main.jsx
  styles.css
```

## MVP notes

Weather and local-time values in this first version are illustrative destination snapshots rather than live API data. The app is structured so live weather, maps, imagery, authentication, and a backend can be added next without replacing the core experience.

## Goal

Make travel discovery feel fast, visual, playful, and memorable — one minute at a time.
