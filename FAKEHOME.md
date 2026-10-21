# FakeHome — falsk hjemmeskærm som hemmelig tal-input

`fakehome.js` er en selvstændig fil uden afhængigheder. Den laver selv sin HTML og CSS og indeholder:

- **Perform-input:** en falsk iPhone-hjemmeskærm. Tilskueren swiper side 1 → 2 → 3 og trykker på app-ikonet på side 3. Ikonet under fingeren, når hvert swipe **starter**, er et ciffer. Swipe 1 giver første ciffer, swipe 2 giver andet ciffer, og `00` betyder 100.
- **Cifrenes placering:** De ni nederste ikoner i den højre 3×3-blok er 1–9, og ikonet lige over midten af blokken er 0. Det er det samme på side 1 og side 2.
- **Egen hjemmeskærm:** en guide i 3 trin (baggrund → screenshots → tjek). Alt måles automatisk ud fra brugerens egne screenshots.
- **Deling mellem apps:** Opsætningen kan eksporteres som en fil og importeres i en anden app. Så skal man kun tage screenshots én gang.

## Kom i gang i en ny app

1. Kopiér `fakehome.js` ind i appen. Kopiér også mappen `home/`, hvis den indbyggede hjemmeskærm skal kunne bruges uden egen opsætning.
2. Indlæs filen før appens egen kode:

```html
<script src="fakehome.js"></script>
<script src="app.js"></script>
```

3. Start den i `app.js`:

```js
const fakeHome = FakeHome.init({
  appName: "Fotos",                  // app-ikonet på side 3, der "åbner" appen
  assets: "home/",                   // indbyggede screenshots — eller false
  launchTarget: "#app",              // elementet der vokser ud af ikonet
  accent: "#0a84ff",                 // farve i opsætningen
  storageKey: "minapp",              // unikt navn pr. app
  onNumber(number, digits) {
    // number = 1–100 (eller null, hvis der ikke blev swipet fra et ciffer)
    visResultat(number);
  },
  onSecret() {
    // 3 tryk på et tomt område af hjemmeskærmen
    åbnHemmeligMenu();
  },
});

// Fx fra en knap i den hemmelige menu:
fakeHome.perform();      // vis hjemmeskærmen
fakeHome.openSetup();    // opsætning af egen hjemmeskærm
```

## Alle valgmuligheder

| Valg | Standard | Betydning |
| --- | --- | --- |
| `appName` | `"Noter"` | Navnet på app-ikonet på side 3. Bruges i guidens tekster. |
| `assets` | `"home/"` | Mappe med de indbyggede screenshots. Med `false` kræves en egen hjemmeskærm, og `perform()` åbner opsætningen, hvis der ikke er nogen. |
| `launchTarget` | `null` | Element eller CSS-selector (eller en funktion, der returnerer et element), som animeres ud af ikonet. Det skal fylde skærmen og være `position: fixed/absolute/relative`. Uden et element toner hjemmeskærmen bare ud. |
| `onNumber(number, digits)` | — | Kaldes, når der trykkes på app-ikonet, **før** animationen. Opdatér appens indhold her. |
| `onSecret()` | — | Kaldes efter `secretTaps` tryk inden for 4 sekunder på et tomt område. |
| `onPerformChange(on)` | — | Kaldes, når hjemmeskærmen vises (`true`) eller skjules (`false`). |
| `secretTaps` | `3` | Antal tryk til den hemmelige menu. |
| `accent`, `accentText` | `#0a84ff`, `#fff` | Farver på knapper i opsætningen. |
| `zIndex` | `30` | z-index for hjemmeskærmen. Appen bliver løftet til `zIndex + 1` under åbne-animationen. Din hemmelige menu skal ligge over den. |
| `setupZIndex` | `1000` | z-index for opsætningsskærmen. |
| `storageKey` | `"fakehome"` | Prefix til lagring (`<key>:mode` i localStorage og `<key>-home` i IndexedDB). |
| `dbName` | `<storageKey>-home` | Navn på IndexedDB-databasen, hvis det skal være et andet. |

## Metoder

| Metode | |
| --- | --- |
| `perform()` | Viser hjemmeskærmen (altid side 1, cifrene nulstilles). |
| `exit()` | Skjuler den igen. |
| `isPerforming()` | Om hjemmeskærmen vises lige nu. |
| `openSetup({ onClose })` | Åbner guiden. `onClose` kaldes, når den lukkes. |
| `mode` / `setMode("default" \| "custom")` | Hvilken hjemmeskærm der bruges. Valget huskes. |
| `hasCustom()` | Om der er gemt en egen hjemmeskærm. |
| `ready` | Promise, der er færdig, når en gemt egen hjemmeskærm er indlæst. |
| `exportSetup()` / `importSetup(data)` | Opsætningen som et objekt. `importSetup` gemmer direkte med ikonet fra filen. Guiden har sine egne knapper til at dele og importere som fil – dér skal ikonet vælges. |

## Del opsætningen mellem apps

Hver app (hvert domæne) har sit eget lager. Sådan flytter du opsætningen:

1. I appen, hvor den er sat op: åbn **Egen hjemmeskærm → Del til andre apps** og gem filen (fx i Filer).
2. I den anden app: åbn **Egen hjemmeskærm → Importér fra en anden app** og vælg filen.
3. Tryk på det ikon på side 3, der skal åbne **denne** app, og tryk **Gem**. Ikonet skal altid vælges ved import, for hver app har sit eget ikon.

## Redigér uden at starte forfra

Åbn **Egen hjemmeskærm → Redigér (ikon og screenshots)**:

- **Skift app-ikon:** tryk på et andet ikon på side 3.
- **Udskift et screenshot:** fx når et notifikationstal har ændret sig. Det nye screenshot skal have samme størrelse som de gamle (samme telefon). Målingen genbruges, så de andre sider røres ikke.
- Tryk **Gem**, eller **Annullér** for at lade alt være.

## Gode råd

- **Baggrunden skal være helt ensfarvet.** Det er det, der gør, at ikonerne kan glide som ét billede. Guiden kan lave baggrundsbilledet. Farveovergange bliver afvist.
- **Brug en mørk farve.** Statuslinjen i en hjemmeskærms-app har altid hvid tekst.
- **Tag screenshots på den telefon, du optræder med.** Guiden advarer, hvis billedformatet ikke passer til skærmen.
- **Opdatér `fakehome.js` i alle apps.** Når filen ændres, kopierer du den samme fil ind i hver app og bumper service-workerens cache.
