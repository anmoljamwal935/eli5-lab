# ELI5 Lab

Complete source for the latest ELI5 Lab design, including the layered scroll-parallax hero and floating glass header.

## Run locally

1. Run `python3 -m http.server 8000` (or `python -m http.server 8000` on Windows).
2. Open http://localhost:8000 in your browser.

No npm install, build step, API keys, or backend are required. Use a local HTTP server instead of opening index.html directly so browser storage and sandboxed content work consistently.

## Files

- index.html: page layout, reader, and authoring studio.
- app.js: ten built-in explainers, catalog search/filter/sort, reader, sharing, and local drafts.
- style.css: base layout and components.
- design.css: editorial redesign, responsive rules, themes, and glass header.
- hero.js: deterministic ambient stars/shooting stars, pause control, and reduced-motion support.
- motion.js: GSAP scroll-linked hero parallax, reveal effects, and takeaway carousel.
- assets/: local GSAP and ScrollTrigger scripts, Outfit font, the inline photo, and generated layered hero artwork.

## Customize

Edit the `base` array in app.js to change built-in explainers. Edit design.css for the current visual styling. The final rules in design.css control the layered hero and floating header.

All application assets are bundled locally. GSAP/ScrollTrigger and Outfit retain their respective upstream licensing; the GSAP distribution headers include license information. The photograph was retrieved from Picsum and is used in the inline editorial image.

## Storage and sharing

Custom explainers and the theme preference are stored in localStorage on the current browser and origin. Built-in explainer links work for other visitors. A custom draft link only opens where that draft already exists. Browser drafts from the hosted site are not part of this source download and do not automatically transfer to localhost or a different host.

## Deploy

Push `main` to deploy through Vercel: [eli5-seven-mu.vercel.app](https://eli5-seven-mu.vercel.app). The site can also run on any static host if the asset paths stay together.
