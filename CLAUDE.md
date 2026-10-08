# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build, single-page web app that visually mimics Apple Notes (Danish UI: "Noter"). It's a mentalism/magic trick prop: the visible app is a decoy notes list, but it secretly drives a "forced list" prediction effect for a magician performing to an audience.

- `index.html` — markup for the notes shell (sidebar, note list, editor panel, settings sheet, number pad)
- `app.js` — all app logic and state (single file, no modules/bundler)
- `styles.css` — all styling (CSS custom properties for light/dark theme, glassmorphism)
- `sw.js` — service worker for offline caching (PWA), cache name `liquid-notes-v11` — **bump this version string whenever cached assets change**, otherwise installed clients won't see updates
- `manifest.webmanifest` — PWA manifest

There is no `package.json`, build step, bundler, linter, or test suite. Open `index.html` directly in a browser (or serve the folder statically) to run it.

## Running / testing changes

No build tooling exists. To test:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000/`. Service worker caching means hard-refresh (or bump `CACHE_NAME` in [sw.js](sw.js)) when iterating on assets.

## Architecture: the "trick" mechanic

The core deception lives entirely in `app.js` and is important to preserve when editing:

1. **Performer state** (`state` in [app.js](app.js)) is persisted to `localStorage` under `liquidNotesPerformerState` and holds: `category` (word pool), `prediction` (the forced word), `inputMethod` (`longpress` or `search`), `spectatorNumber` (1–100, the position to force), `selectedNote`.
2. **Forced list generation** (`makeForcedList`): deterministically shuffles a 99-word pool using a seeded PRNG (`seedFrom` + `random`, a simple string-hash-seeded xorshift), then inserts the `prediction` word at index `spectatorNumber - 1`. Same seed always reproduces the same shuffle, so the "Note" the spectator sees always places the predicted word at their chosen number.
3. **Hidden settings access** — ways to drive the trick without it looking intentional:
   - **Secret tap zone**: 5 taps within 4s on any nav bar (`handleSecretTap`, wired to every `[data-secret]` element) opens the performer sheet.
   - **Long-press hotspot**: a 2s press on `#hotspot` — an invisible 62×96 box on the **left edge, vertically centered** — opens a fake numeric keypad (`openPad`), but only when `inputMethod === "longpress"`.
   - **Fake search field**: when `inputMethod === "search"`, typing digits into the visible search box (`secretSearchInput`) silently captures the spectator number instead of actually searching, then clears and blurs itself.
   - **Perform mode / fake home screen**: the "Perform" button in the performer sheet shows `#home`, a fake iPhone home screen built from real 1179×2556 screenshots on a pure-black wallpaper (`home/page1-3.webp` icon layers that slide, stationary `home/dock.webp`, per-page `home/dotsN.png`). The icon under the finger when a swipe *starts* is the digit: swipe page 1→2 = first digit, page 2→3 = second digit. Digits sit on the bottom 3×3 block (1–9) plus the cell above its middle (0), same on pages 1 and 2 (`DIGIT_CELLS`). Tapping Noter on page 3 (`NOTES_CELL`) sets `spectatorNumber` (`00` = 100) and plays the open animation (`launchNotes`). All geometry constants are in screenshot pixels — re-measure them if the screenshots are replaced. 5 taps on the status-bar zone opens the sheet. Perform mode is never persisted; the app always starts in Notes.
4. **Word pools** live in the `pools` object at the top of `app.js` (currently `animals`, `celebrities`, both Danish). Add new pools by adding a new key with `label`, `title`, and a 100-item `items` array — keep pools at 100 items since `spectatorNumber` is clamped to 1–100.
5. **Decoy notes** (`getNotes()`) are static filler content designed to look like a normal person's actual notes app, unrelated to the trick, so nothing looks suspicious if someone else opens the app.

When modifying UI text, keep it in Danish to match the existing app, unless told otherwise. When modifying the forced-list algorithm, preserve determinism (same category+prediction+number must always yield the same visible ordering) since the performer needs to be able to reload/reopen the note without breaking the trick.

## UI: this is a deliberate pixel-clone of iPhone Notes

The visual layer is tuned against real iOS screenshots — treat the numbers in [styles.css](styles.css) as measured, not arbitrary. Key ones: cards inset `16px` with `20px` radius and `#1C1C1E` fill in dark mode; row text inset `26px` inside the card with separators inset `26px`/`12px`; rows ~61px tall; large title 34px; section headers 22px; the floating bottom bar inset `26px` with a 40px search pill, 12px gap, and 46px compose circle.

Structural things that are easy to break:

- **Three stacked screens** (`.s-folders` / `.s-notes` / `.s-editor`) are absolutely positioned and pushed with `translate3d`, driven by `app.dataset.view` via `setView()`. On `min-width: 900px` a media query converts them to a 3-column grid and neutralizes the transforms.
- **The note timestamp is hidden by CSS, not by scrolling.** `.stamp` is `position: absolute; top: -26px` inside `.note-body`, so it sits above scroll origin and is only revealed by iOS rubber-band overscroll — same as the real app. An earlier version scrolled it out of view, which failed for short notes and depended on `requestAnimationFrame`.
- **Avoid `requestAnimationFrame` for layout-critical work.** It never fires when the page isn't compositing (backgrounded tab, hidden preview pane), which silently broke initialization. Use direct assignment or `setTimeout`.
- **Do not put `touch-action: none` on `html`/`body`.** Touch-action intersects up the ancestor chain, so it kills scrolling in every descendant scroller. Scroll containers are `.scroll` with `overflow-y: auto` + `overscroll-behavior: contain`.
- The bottom bar shifts up with the iOS keyboard via a `--kb` custom property set from a `visualViewport` listener, so the fake search field stays reachable.

## Testing locally

The service worker aggressively caches `styles.css` / `app.js`, so plain reloads serve stale assets while iterating. Either bump `CACHE_NAME` in [sw.js](sw.js), or clear it from the console:

```bash
navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>x.unregister()));caches.keys().then(k=>k.forEach(c=>caches.delete(c)))
```

Deployed on Vercel at `https://notes-app-two-rust-55.vercel.app/` — pushing to `main` deploys.
