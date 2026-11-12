# Xbox Launch 2026

Landing page interattiva per il lancio di Xbox Series X: sei step a schermo intero con modello 3D, testi animati e galleria. Esportata come sito completamente statico.

## Stack

- Next.js (App Router, `output: 'export'`), React, TypeScript
- Tailwind CSS
- three.js `WebGPURenderer` (WebGPU, fallback automatico su WebGL2) con post-processing TSL
- React Aria Components, GSAP, Zustand
- Biome per lint e formattazione

## Requisiti

- Node.js 24 (`nvm use`)
- pnpm

## Comandi

```bash
pnpm install
pnpm dev      # sviluppo su http://localhost:3000
pnpm lint     # biome check
pnpm format   # biome check --write
pnpm build    # export statico in out/
```

## Struttura

```
src/
  app/          layout, pagina, manifest
  components/   atoms, molecules, organisms, templates (Atomic Design)
  data/         contenuti degli step
  hooks/        audio ambientale, navigazione tra step
  lib/          gsap, scena three.js, preferenze di movimento
  store/        store Zustand dell'esperienza
```

## Pubblicazione su Aruba

1. `pnpm build`
2. Caricare via FTP **il contenuto** di `out/` nella root del sito (`www.tuodominio.it`), incluso il file nascosto `.htaccess`.
3. Il dominio deve essere autorizzato nel kit Adobe Fonts `xqn0xeo`.

L'`.htaccess` imposta la pagina 404, i MIME type di `.glb` e `.webmanifest`, la compressione e la cache (immutabile per `/_next/static`, `no-cache` per HTML e `sw.js`).

## Analytics

Il componente `src/components/atoms/Analytics.tsx` carica GA4 solo se è definita `NEXT_PUBLIC_GA_ID` in fase di build. Al momento non è montato.
