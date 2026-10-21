# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build, single-page web app that visually mimics Apple Notes (Danish UI: "Noter"). It's a mentalism/magic trick prop: the visible app is a decoy notes list, but it secretly drives a "forced list" prediction effect for a magician performing to an audience.

- `index.html` — markup for the notes shell (sidebar, note list, editor panel, settings sheet, number pad)
- `app.js` — all app logic and state (single file, no modules/bundler)
- `fakehome.js` — the fake home-screen input + own-home-screen setup, a reusable drop-in module also used by other apps ([FAKEHOME.md](FAKEHOME.md))
- `styles.css` — all styling (CSS custom properties for light/dark theme, glassmorphism)
- `sw.js` — service worker for offline caching (PWA), cache name `liquid-notes-v26` — **bump this version string whenever cached assets change**, otherwise installed clients won't see updates
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
   - **Secret tap zone**: 3 taps within 4s on any nav bar (`handleSecretTap`, wired to every `[data-secret]` element) opens the performer sheet.
   - **Long-press hotspot**: a 2s press on `#hotspot` — an invisible 62×96 box on the **left edge, vertically centered** — opens a fake numeric keypad (`openPad`), but only when `inputMethod === "longpress"`.
   - **Fake search field**: when `inputMethod === "search"`, typing digits into the visible search box (`secretSearchInput`) silently captures the spectator number instead of actually searching, then clears and blurs itself.
   - **Perform mode / fake home screen** lives in [fakehome.js](fakehome.js), a self-contained, dependency-free module (it injects its own DOM + CSS) shared with the performer's other apps — see [FAKEHOME.md](FAKEHOME.md) for its API. `app.js` only calls `FakeHome.init({...})` (with `onNumber` → `state.spectatorNumber`, `onSecret` → performer sheet, `launchTarget: app`) and `fakeHome.perform()/exit()/openSetup()`. Keep app-specific logic out of the module. The spectator swipes page 1→2→3; the icon under the finger when a swipe *starts* is a digit (first swipe = first digit, second = second, `00` = 100): bottom 3×3 block on the right = 1–9, the cell above its middle = 0, counted from the bottom row (`digitAt`). Tapping the app icon on page 3 calls `onNumber` and plays the open animation. 3 taps on an empty area call `onSecret`. The built-in home screen (`BUILTIN`, from real 1179×2556 screenshots in `home/`) has its geometry in screenshot pixels — re-measure if replaced. The stage is sized by width and anchored to the bottom because the iOS PWA viewport starts below the status bar. Swipes settle with a precomputed critically damped spring played as a Web Animation with `linear()` easing (rAF fallback); grabbing mid-animation continues from the current position. Perform mode is never persisted; the app always starts in Notes.
   - **Own home screen**: a 3-step setup wizard in the module (solid wallpaper → 3 screenshots → check & tap the app icon). The solid background is what makes it work: the icon layer slides as one image. `analyzeHomeScreens` measures everything (background colour, status bar, the icons/bottom split via the lowest band that differs between pages, the icon grid from square components fitted to a 4-column lattice) and rejects non-solid backgrounds. Crops + geometry are stored in IndexedDB (Notes uses `dbName: "noter-home"`, mode in localStorage `noter:mode`), and can be exported/imported as a JSON file to share between apps.
4. **Word pools** live in the `pools` object at the top of `app.js` (currently `animals`, `celebrities`, `kitchen` — kitchen tools, plates, glasses and cutlery — and `cards`, the 52 playing cards; all Danish). Add new pools by adding a new key with `label`, `title`, and an `items` array (normally 100) — the visible list is as long as the pool, capped at 100 (100 words, 52 cards), and `spectatorNumber` is clamped to the pool size. The prediction is a free-text field with suggestions from the current pool (`resolvePrediction`): a pool word (case-insensitive) uses the pool spelling; any other word is used as typed, and `makeForcedList` then simply drops one shuffled pool word so the list keeps its length.
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

The service worker is network-first (cache is only the offline fallback), so a normal reload picks up new assets when online. Still bump `CACHE_NAME` in [sw.js](sw.js) when assets change; to wipe it entirely, run from the console:

```bash
navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>x.unregister()));caches.keys().then(k=>k.forEach(c=>caches.delete(c)))
```

Deployed on Vercel at `https://notes-app-two-rust-55.vercel.app/` — pushing to `main` deploys.
