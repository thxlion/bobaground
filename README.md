# Web Editor (Figma 1:1)

A responsive React + TypeScript app built with Vite and Tailwind that mirrors the provided Figma design (top nav, dark canvas, bottom prompt bar).

## Run locally

```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:5173
```

Icon assets are loaded from the local Figma MCP asset server (e.g. `http://localhost:3845/assets/...`).

## Structure

- `src/web-editor/TopNav.tsx` — top navigation
- `src/web-editor/BottomBar.tsx` — bottom prompt bar
- `src/web-editor/App.tsx` — layout composer

## Notes

- Tailwind is used to reproduce spacing, colors, and radii.
- Sizes, paddings, and colors are derived from Figma layers.
