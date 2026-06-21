# AETHER — Landing Page Handoff Notes

A futuristic single-page landing site built with vanilla HTML, CSS, and JavaScript. No build step required — open `index.html` in any modern browser, or serve the folder with any static host (Netlify, Vercel, GitHub Pages, S3, nginx).

---

## File structure

```
aether-export/
├── index.html          Main markup (semantic HTML5)
├── css/
│   └── styles.css      All styling, tokens, animations
├── js/
│   └── main.js         Starfield, scroll reveals, cursor glow
├── assets/
│   └── favicon.svg     Site favicon (inline-styled SVG)
└── HANDOFF.md          This file
```

---

## Fonts

Loaded via Google Fonts CDN in `index.html` `<head>`:

- **Space Grotesk** — display / headings (weights: 400, 500, 600, 700)
- **Inter** — body copy (weights: 400, 500, 600)

CDN URL:
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap
```

To self-host, download the WOFF2 files from <https://fonts.google.com> and replace the `<link>` tag with an `@font-face` block in `css/styles.css`.

---

## Color palette (CSS variables — see `:root` in `styles.css`)

| Token              | Value                          | Usage                          |
| ------------------ | ------------------------------ | ------------------------------ |
| `--background`     | `#050816`                      | Deep-space page background     |
| `--foreground`     | `#e8edf7`                      | Primary text                   |
| `--muted-foreground` | `rgba(184,196,224,0.7)`      | Secondary text                 |
| `--primary`        | `#4fd1ff`                      | Cyan brand / CTAs / focus ring |
| `--accent-cyan`    | `#7af8ff`                      | Light cyan highlight           |
| `--accent-violet`  | `#7c5cff`                      | Violet accent / gradients      |
| `--surface`        | `rgba(17,26,58,0.55)`          | Glass surface base             |
| `--surface-2`      | `rgba(27,37,84,0.45)`          | Elevated glass                 |
| `--border`         | `rgba(232,237,247,0.08)`       | Hairline borders               |
| `--input`          | `rgba(232,237,247,0.06)`       | Form field background          |
| `--ring`           | `rgba(79,209,255,0.5)`         | Focus ring                     |

### Gradients

- **Aurora backdrop** (`--gradient-aurora`): three layered radial gradients in violet / cyan / mint over the deep-space base
- **Text gradient** (`--gradient-text`): `linear-gradient(180deg, #ffffff, #b8c4e0)` — used on hero / vision / contact headlines
- **CTA gradient**: `linear-gradient(180deg, #7af8ff, #4fd1ff)` on `.btn-primary`
- **Horizon line**: `linear-gradient(90deg, transparent, #7af8ff, #4fd1ff, #7c5cff, transparent)` glowing center line of the perspective floor

---

## Animations & effects

All implemented in pure CSS + a small vanilla JS file. No animation libraries required.

- **Scroll reveals** — IntersectionObserver in `main.js` adds `.in` to `.reveal` elements as they enter the viewport (900ms cubic-bezier)
- **Cursor glow** — `requestAnimationFrame` lerp follows the pointer; auto-disabled on coarse (touch) pointers
- **Starfield** — 70 absolutely-positioned `<span>`s injected at runtime, each twinkling on a randomized 4s delay
- **Orbital system** — pure SVG with rotating `<g>` groups (60s / 40s rev / 25s), `<animateMotion>` satellite along an elliptical path, dashed energy arcs (`@keyframes dash`), radial-gradient core with `feGaussianBlur` glow filter
- **Perspective grid floor** — CSS `transform: perspective(800px) rotateX(62deg)` + mask fade
- **Glassmorphism** — `backdrop-filter: blur(18px) saturate(140%)` on `.glass` panels

---

## Libraries / plugins

**None.** Zero JavaScript dependencies. Zero CSS frameworks. The only external resource is the Google Fonts stylesheet (optional — can be self-hosted).

Browser APIs used:
- `IntersectionObserver` (scroll reveals)
- `requestAnimationFrame` (cursor glow lerp)
- `matchMedia('(pointer: coarse)')` (disable cursor on touch)
- CSS `backdrop-filter` (glassmorphism; Safari uses `-webkit-` prefix already included)

---

## Browser support

- Chrome / Edge / Firefox / Safari (last 2 versions)
- Safari needs `-webkit-backdrop-filter` (included)
- `backdrop-filter` gracefully degrades to a flat tinted background on older browsers
- Mobile: cursor glow is auto-hidden; layout reflows at 768px and 640px breakpoints

---

## Customization quick reference

- **Brand name** — replace `AETHER` in `index.html` (nav + footer) and the `<title>` tag
- **Colors** — edit the `:root` block at the top of `css/styles.css`
- **CTA destinations** — anchor links (`#technology`, `#contact`) can be swapped for real URLs
- **Form submission** — `.contact-form` currently calls `event.preventDefault()`. Wire to your backend (Formspree, Netlify Forms, custom endpoint) by removing the inline handler and adding `action` + `method` attributes
- **Capabilities content** — three `<article class="card">` blocks in the `#technology` section; duplicate or remove to change the count and adjust `.cards` grid in CSS

---

## Performance notes

- Single CSS file, single JS file, no images beyond a 0.6 KB SVG favicon
- Fonts use `display=swap` so text renders immediately with a system fallback
- All animations are GPU-friendly (transform / opacity only)
- Total payload (excl. fonts): ~25 KB uncompressed

---

Built with care. — Aether design system, v1.0
