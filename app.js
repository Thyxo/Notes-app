/* =========================================================
   Noter — data + trick-logik
   ========================================================= */

const pools = {
  animals: {
    label: "dyr",
    title: "100 dyr",
    items: [
      "Abe", "Albatros", "Alligator", "Antilope", "Armadillo", "Axolotl", "Bavian", "Bison", "Blåfisk", "Blåvinget ara",
      "Blæksprutte", "Bongo", "Bonobo", "Brillebjørn", "Brun bjørn", "Bøffel", "Delfin", "Dromedar", "Due", "Egern",
      "Elg", "Elefant", "Emu", "Falk", "Fasan", "Flagermus", "Flodhest", "Flamingo", "Fritte", "Frø",
      "Gazelle", "Gepard", "Gibbon", "Giraf", "Gnu", "Gorilla", "Gravling", "Grashoppe", "Grib", "Gris",
      "Hamster", "Hare", "Havskildpadde", "Hest", "Hjort", "Hummer", "Hund", "Hval", "Hvalros", "Hyen",
      "Ibis", "Ilder", "Isbjørn", "Jaguar", "Kakadue", "Kamel", "Kamæleon", "Kanariefugl", "Kænguru", "Kapivar",
      "Kat", "Koala", "Kobra", "Kolibri", "Kondor", "Krabbe", "Krokodille", "Kuguar", "Kanin", "Leopard",
      "Løve", "Los", "Lama", "Lemur", "Maki", "Marsvin", "Meerkat", "Muldvarp", "Mus", "Næsehorn",
      "Narhval", "Odder", "Okapi", "Orangutang", "Ørn", "Panda", "Panter", "Papegøje", "Pelikan", "Pingvin",
      "Pindsvin", "Puma", "Ravn", "Ræv", "Rensdyr", "Salamander", "Sæl", "Schimpanse", "Skildpadde", "Skorpion",
      "Slange", "Snegl", "Sommerfugl", "Solsort", "Spurv", "Stenbuk", "Struds", "Surikat", "Svane", "Tiger",
      "Tukan", "Ugle", "Ulv", "Vaskebjørn", "Vortesvin", "Wallaby", "Zebra", "Ål", "Østers", "Pindsvinefisk",
    ],
  },
  celebrities: {
    label: "kendte personer",
    title: "100 kendte personer",
    items: [
      "Adele", "Albert Einstein", "Angelina Jolie", "Ariana Grande", "Barack Obama", "Beyonce", "Bill Gates", "Billie Eilish", "Brad Pitt", "Bruce Springsteen",
      "Bruno Mars", "Celine Dion", "Charlie Chaplin", "Chris Hemsworth", "Cristiano Ronaldo", "David Attenborough", "David Beckham", "Denzel Washington", "Dua Lipa", "Ed Sheeran",
      "Elon Musk", "Emma Stone", "Emma Watson", "Freddie Mercury", "George Clooney", "Greta Thunberg", "Harrison Ford", "Harry Styles", "Hugh Jackman", "Jennifer Aniston",
      "Jennifer Lawrence", "Johnny Depp", "Julia Roberts", "Justin Bieber", "Kate Winslet", "Keanu Reeves", "Kendrick Lamar", "Kim Kardashian", "Lady Gaga", "Leonardo DiCaprio",
      "Lionel Messi", "Madonna", "Malala Yousafzai", "Margot Robbie", "Mariah Carey", "Mark Zuckerberg", "Meryl Streep", "Michael Jackson", "Michelle Obama", "Morgan Freeman",
      "Natalie Portman", "Nicolas Cage", "Oprah Winfrey", "Paul McCartney", "Rihanna", "Robert De Niro", "Robert Downey Jr.", "Ryan Gosling", "Ryan Reynolds", "Samuel L. Jackson",
      "Scarlett Johansson", "Selena Gomez", "Serena Williams", "Shakira", "Stephen Curry", "Taylor Swift", "The Weeknd", "Tom Cruise", "Tom Hanks", "Usain Bolt",
      "Viola Davis", "Will Smith", "Zendaya", "Anne Hathaway", "Anthony Hopkins", "Benedict Cumberbatch", "Cate Blanchett", "Daniel Craig", "Daniel Radcliffe", "Drake",
      "Dwayne Johnson", "Ellen DeGeneres", "Gal Gadot", "Gordon Ramsay", "Idris Elba", "Jackie Chan", "Jay-Z", "Joaquin Phoenix", "John Legend", "Kanye West",
      "Katy Perry", "Kylian Mbappe", "LeBron James", "Lizzo", "Mads Mikkelsen", "Miley Cyrus", "Naomi Osaka", "Nicole Kidman", "Pedro Pascal", "Pharrell Williams",
      "Pink", "Queen Latifah", "Reese Witherspoon", "Sandra Bullock", "Shawn Mendes", "Snoop Dogg", "Sofia Vergara", "Steven Spielberg", "Timothee Chalamet", "Whoopi Goldberg",
    ],
  },
};

/* ---------------- tilstand ---------------- */

const storageKey = "liquidNotesPerformerState";

const fallbackState = {
  category: "animals",
  prediction: "Tiger",
  inputMethod: "longpress",
  spectatorNumber: 37,
  selectedNote: "prediction",
  images: {},
  swipeStyle: "standard",
};

let state = loadState();
let tapTimes = [];
let padValue = "";
let pressTimer = null;
let settingsOpenedAt = 0;

function loadState() {
  try {
    return { ...fallbackState, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
  } catch {
    return { ...fallbackState };
  }
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    /* fuld kvote — trickets kerne virker stadig i hukommelsen */
  }
}

function getCategory() {
  return pools[state.category] || pools.animals;
}

/* ---------------- forced list ---------------- */

function seedFrom(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function random(seed) {
  let value = seed || 1;
  return () => {
    value = Math.imul(value ^ (value >>> 15), 1 | value);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function makeForcedList() {
  const category = getCategory();
  const prediction = state.prediction || category.items[0];
  const number = Math.max(1, Math.min(100, Number(state.spectatorNumber) || 1));
  const rand = random(seedFrom(`${state.category}:${prediction}:${number}`));
  const rest = category.items.filter((item) => item !== prediction);

  /* Fisher-Yates med den seedede generator, så listen er 100% deterministisk */
  for (let i = rest.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  const list = rest.slice(0, 99);
  list.splice(number - 1, 0, prediction);
  return list.slice(0, 100);
}

/* ---------------- indhold ---------------- */

const folderGroups = [
  { rows: [["Alle iCloud", 24]] },
  {
    title: "iCloud",
    rows: [
      ["Noter", 12],
      ["Magi", 7],
      ["Rejser", 3],
      ["Opskrifter", 2],
      ["Nyligt slettet", 0],
    ],
  },
];

const groupOrder = [
  ["pinned", "Fastgjort", true],
  ["today", "I dag", false],
  ["yesterday", "I går", false],
  ["week", "Sidste 7 dage", false],
];

function getNotes() {
  const category = getCategory();
  return [
    {
      id: "prediction",
      title: "Forudsigelse",
      date: "19/7/2026",
      preview: `Jeg har skrevet et enkelt navn ned: ${state.prediction}.`,
      group: "pinned",
      stamp: "19. juli 2026 kl. 20.43",
      body: [
        "Jeg har besluttet mig for ét eneste navn, længe inden noget tal bliver valgt.",
        "",
        { lead: state.prediction },
      ],
    },
    {
      id: "hundred",
      title: category.title,
      date: "19/7/2026",
      preview: `En rolig liste med 100 ${category.label}, gemt i noter.`,
      group: "pinned",
      stamp: "19. juli 2026 kl. 20.46",
      list: true,
    },
    {
      id: "packing",
      title: "Huskeliste",
      date: "fredag",
      preview: "Yens ring størrelse 50-51",
      group: "pinned",
      stamp: "17. juli 2026 kl. 09.12",
      body: ["Yens ring størrelse 50-51", "Kaffe", "Oplader", "Kortmappe", "Sort tusch", "Ekstra elastikker"],
    },
    {
      id: "ideas",
      title: "Ideer til magi",
      date: "torsdag",
      preview: "Et virkelig sygt force inde i en bunke",
      group: "pinned",
      stamp: "16. juli 2026 kl. 23.05",
      body: [
        "Et virkelig sygt force inde i en bunke.",
        "",
        "Lav overgangen kortere — publikum skal se noten først, og så tallet.",
        "Hold hænderne i ro mens de vælger.",
      ],
    },
    {
      id: "harder",
      title: "How to Make Your Magic Hit Harder",
      date: "02.50",
      preview: "Start with the person, not the prop.",
      group: "today",
      stamp: "I dag kl. 02.50",
      body: [
        "Start with the person, not the prop.",
        "",
        "Let them do the choosing out loud.",
        "Slow down right before the reveal.",
        "Never repeat the same effect twice.",
      ],
    },
    {
      id: "webapp",
      title: "Byg en webapp der direkte kloner Apples Noter",
      date: "i går",
      preview: '"Liquid Glass"',
      group: "yesterday",
      stamp: "I går kl. 14.02",
      body: ['"Liquid Glass"', "", "Frostet blur bag topbar og bundlinje.", "Store titler der kollapser når man scroller."],
    },
    {
      id: "trip",
      title: "Hjørring tur",
      date: "i går",
      preview: "4 August",
      group: "yesterday",
      stamp: "I går kl. 11.20",
      body: ["4 August", "", "Tog 08.14", "Husk kortene", "Frokost med Yen"],
    },
    {
      id: "bike",
      title: "Cykel arbejdsdage",
      date: "lørdag",
      preview: "9 Torsdag aften",
      group: "week",
      stamp: "12. juli 2026 kl. 18.44",
      body: ["9 Torsdag aften", "11 Fredag aften", "7 Lørdag formiddag"],
    },
    {
      id: "relationship",
      title: "Min kæreste og jeg har et problem",
      date: "fredag",
      preview: "Hun har nogle ting som hun gentage...",
      group: "week",
      stamp: "11. juli 2026 kl. 22.30",
      body: ["Hun har nogle ting som hun gentager, og jeg bliver dårlig til at lytte.", "", "Spørg mere. Afbryd mindre."],
    },
  ];
}

/* ---------------- ikoner ---------------- */

const ICON = {
  chevronDown: '<path d="M5.6 9 12 15.4 18.4 9"/>',
  chevronRight: '<path d="M8.8 4.8 16 12l-7.2 7.2"/>',
  folder:
    '<path d="M3.4 7.4a2.1 2.1 0 0 1 2.1-2.1h3.2l2 2.2h8a2.1 2.1 0 0 1 2.1 2.1v8.9a2.1 2.1 0 0 1-2.1 2.1H5.5a2.1 2.1 0 0 1-2.1-2.1z" fill="currentColor" stroke="none"/>',
};

function svg(name, cls) {
  return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;
}

function esc(text) {
  return String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* ---------------- DOM ---------------- */

const app = document.querySelector("#app");
const folderGroupsEl = document.querySelector("#folderGroups");
const noteGroupsEl = document.querySelector("#noteGroups");
const notePage = document.querySelector("#notePage");
const noteSearch = document.querySelector("#noteSearch");
const navTitleEditor = document.querySelector("#navTitleEditor");
const settingsSheet = document.querySelector("#settingsSheet");
const scrim = document.querySelector("#scrim");
const categorySelect = document.querySelector("#categorySelect");
const predictionSelect = document.querySelector("#predictionSelect");
const currentNumber = document.querySelector("#currentNumber");
const numberPad = document.querySelector("#numberPad");
const padGrid = document.querySelector("#padGrid");
const padDisplay = document.querySelector("#padDisplay");
const imagePicker = document.querySelector("#imagePicker");

/* ---------------- render ---------------- */

function renderFolders() {
  folderGroupsEl.innerHTML = folderGroups
    .map(
      (group) => `
      <section class="sec">
        ${group.title ? `<h2 class="sec-head"><span>${esc(group.title)}</span></h2>` : ""}
        <div class="card">
          ${group.rows
            .map(
              ([name, count]) => `
              <button class="row folder" type="button" data-open-notes="${esc(name)}">
                ${svg("folder", "fi")}
                <span class="name">${esc(name)}</span>
                <span class="count">${count}</span>
                ${svg("chevronRight", "go")}
              </button>`,
            )
            .join("")}
        </div>
      </section>`,
    )
    .join("");
}

function renderNotes() {
  const notes = getNotes();
  noteGroupsEl.innerHTML = groupOrder
    .map(([id, label, collapsible]) => {
      const rows = notes.filter((note) => note.group === id);
      if (!rows.length) return "";
      return `
        <section class="sec" data-sec="${id}">
          <h2 class="sec-head">
            <span>${label}</span>
            ${collapsible ? `<button class="chev" type="button" data-collapse="${id}" aria-label="Skjul">${svg("chevronDown", "sm")}</button>` : ""}
          </h2>
          <div class="card">
            ${rows
              .map(
                (note) => `
                <button class="row ${note.id === state.selectedNote ? "selected" : ""}" type="button" data-note="${note.id}">
                  <h3>${esc(note.title)}</h3>
                  <div class="meta"><span>${esc(note.date)}</span><span class="prev">${esc(note.preview)}</span></div>
                </button>`,
              )
              .join("")}
          </div>
        </section>`;
    })
    .join("");
}

function renderNotePage() {
  const note = getNotes().find((item) => item.id === state.selectedNote) || getNotes()[0];
  navTitleEditor.textContent = note.title;

  let inner = "";
  if (note.list) {
    inner = `<ol class="note-ol">${makeForcedList().map((item, i) => `<li><span class="n">${i + 1}.</span>${esc(item)}</li>`).join("")}</ol>`;
  } else {
    inner = (note.body || [note.preview])
      .map((line) => {
        if (line === "") return '<p class="gap"></p>';
        if (typeof line === "object") return `<p class="lead">${esc(line.lead)}</p>`;
        return `<p>${esc(line)}</p>`;
      })
      .join("");
  }

  const image = state.images && state.images[note.id];
  const imageTag = image ? `<img class="note-img" src="${image}" alt="" />` : "";

  notePage.innerHTML = `
    <div class="note-body note-page-fade">
      <div class="stamp">${esc(note.stamp || "")}</div>
      <h1 class="note-title">${esc(note.title)}</h1>
      ${inner}
      ${imageTag}
    </div>`;

  /* Tidsstemplet skjules af CSS (det ligger over scroll-origo), så her skal
     kun selve rullepositionen nulstilles når man skifter note. */
  notePage.scrollTop = 0;
  syncScrolled(notePage);
}

function renderAll() {
  renderFolders();
  renderNotes();
  renderNotePage();
}

/* ---------------- navigation ---------------- */

function setView(view) {
  app.dataset.view = view;
}

/* ---------------- kollapsende store titler ---------------- */

function syncScrolled(scroller) {
  const screen = scroller.closest(".screen");
  if (!screen) return;
  screen.classList.toggle("scrolled", scroller.scrollTop > 34);
}

/* Kort, fast scroll-indikator som i iOS (den native er skjult i CSS) */
function attachScrollIndicator(scroller) {
  const bar = document.createElement("div");
  bar.className = "sbar";
  scroller.parentElement.appendChild(bar);
  let hideTimer = null;
  return () => {
    const range = scroller.scrollHeight - scroller.clientHeight;
    if (range <= 0) return;
    const top = scroller.offsetTop + 4;
    const track = scroller.clientHeight - 4 - 84; /* fri af den flydende bundlinje */
    const progress = Math.max(0, Math.min(1, scroller.scrollTop / range));
    bar.style.transform = `translate3d(0, ${top + progress * (track - bar.offsetHeight)}px, 0)`;
    bar.classList.add("on");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => bar.classList.remove("on"), 650);
  };
}

document.querySelectorAll("[data-scroll]").forEach((scroller) => {
  const indicate = attachScrollIndicator(scroller);
  scroller.addEventListener(
    "scroll",
    () => {
      syncScrolled(scroller);
      indicate();
    },
    { passive: true },
  );
});

/* ---------------- performer-ark ---------------- */

function openSettings() {
  categorySelect.innerHTML = Object.entries(pools)
    .map(([id, category]) => `<option value="${id}">${capitalize(category.label)}</option>`)
    .join("");
  categorySelect.value = state.category;
  syncPredictionSelect();
  document.querySelectorAll("input[name='inputMethod']").forEach((radio) => {
    radio.checked = radio.value === state.inputMethod;
  });
  const swipeSelect = document.querySelector("#swipeSelect");
  swipeSelect.innerHTML = Object.entries(SWIPE_STYLES)
    .map(([id, label]) => `<option value="${id}">${label}</option>`)
    .join("");
  swipeSelect.value = SWIPE_STYLES[state.swipeStyle] ? state.swipeStyle : "standard";
  currentNumber.textContent = state.spectatorNumber;
  fitViewport();
  document.querySelector("#viewportDiag").textContent =
    `Skærm ${viewportInfo.screen} · inner ${viewportInfo.inner} · vv ${viewportInfo.vv} · lvh ${viewportInfo.lvh} · bruger ${viewportInfo.used}`;
  settingsOpenedAt = Date.now();
  settingsSheet.classList.add("open");
  settingsSheet.setAttribute("aria-hidden", "false");
  scrim.classList.add("on");
}

function closeSettings() {
  settingsSheet.classList.remove("open");
  settingsSheet.setAttribute("aria-hidden", "true");
  scrim.classList.remove("on");
}

function syncPredictionSelect() {
  const category = pools[categorySelect.value] || getCategory();
  predictionSelect.innerHTML = category.items.map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("");
  predictionSelect.value = category.items.includes(state.prediction) ? state.prediction : category.items[0];
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* ---------------- hemmelig input ---------------- */

function handleSecretTap() {
  const now = Date.now();
  tapTimes = [...tapTimes.filter((time) => now - time < 4000), now];
  if (tapTimes.length >= 3) {
    tapTimes = [];
    openSettings();
  }
}

function openPad() {
  if (state.inputMethod !== "longpress") return;
  padValue = "";
  updatePadDisplay();
  numberPad.classList.add("open");
  numberPad.setAttribute("aria-hidden", "false");
}

function closePad(save) {
  if (save && padValue) {
    state.spectatorNumber = Math.max(1, Math.min(100, Number(padValue)));
    saveState();
    renderNotePage();
  }
  numberPad.classList.remove("open");
  numberPad.setAttribute("aria-hidden", "true");
}

function updatePadDisplay() {
  padDisplay.textContent = padValue || "--";
}

function buildPad() {
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Slet", "0", "OK"].forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = key;
    if (key.length > 1) button.classList.add("wide");
    button.addEventListener("click", () => {
      if (key === "Slet") padValue = padValue.slice(0, -1);
      else if (key === "OK") return closePad(true);
      else if (padValue.length < 3) padValue += key;
      if (Number(padValue) > 100) padValue = "100";
      if (padValue === "0") padValue = "";
      updatePadDisplay();
    });
    padGrid.appendChild(button);
  });
}

function secretSearchInput(event) {
  if (state.inputMethod !== "search") return;
  const digits = event.target.value.replace(/\D/g, "").slice(0, 3);
  event.target.value = digits;
  const number = Number(digits);
  if (number >= 1 && number <= 100) {
    state.spectatorNumber = number;
    saveState();
    renderNotePage();
    window.setTimeout(() => {
      event.target.value = "";
      event.target.blur();
    }, 200);
  }
}

/* ---------------- falsk hjemmeskærm (perform) ----------------
   Tilskuerens tal læses af, hvilket ikon fingeren står på, når et
   swipe starter: swipe 1 (side 1 → 2) giver første ciffer, swipe 2
   (side 2 → 3) giver andet ciffer. Noter åbnes fra side 3. */

const home = document.querySelector("#home");
const homeStage = document.querySelector("#homeStage");
const homeTrack = document.querySelector("#homeTrack");
const homePress = document.querySelector("#homePress");
const homeDots = [...document.querySelectorAll("#homeDots img")];

/* Mål i screenshot-pixels (1179 bred, ikon-laget starter ved y=140) */
const HOME_W = 1179;
const HOME_PAGES_TOP = 140;
const HOME_PAGES_H = 1900;
const HOME_DOCK_TOP = 2140;
const HOME_ICON = 225;
const ICON_COLS = [58, 337, 618, 897];
const ICON_ROWS = [245, 524, 803, 1082, 1361, 1640];
const OCCUPIED = [
  ["1111", "1111", "1111", "1111", "1111", "1111"],
  ["1111", "1111", "1111", "1111", "1111", "1111"],
  ["1111", "1100", "0000", "1110", "1111", "1111"],
];
/* [række, kolonne] → ciffer. De ni nederste i et 3×3 + 0 over midten. Ens på side 1 og 2. */
const DIGIT_CELLS = {
  "2,2": 0,
  "3,1": 1, "3,2": 2, "3,3": 3,
  "4,1": 4, "4,2": 5, "4,3": 6,
  "5,1": 7, "5,2": 8, "5,3": 9,
};
const NOTES_CELL = { page: 2, row: 3, col: 2 };

let homePage = 0;
let homeDigits = [null, null];
let homeDrag = null;

function isPerforming() {
  return home.classList.contains("on");
}

function homeScale() {
  return homeStage.getBoundingClientRect().width / HOME_W;
}

function homeCellAt(clientX, clientY) {
  const rect = homeStage.getBoundingClientRect();
  const k = rect.width / HOME_W;
  const x = (clientX - rect.left) / k;
  const y = (clientY - rect.top) / k;
  const half = (ICON_COLS[1] - ICON_COLS[0]) / 2;
  const col = ICON_COLS.findIndex((left) => Math.abs(x - (left + HOME_ICON / 2)) <= half);
  const row = ICON_ROWS.findIndex((top) => Math.abs(y - (top + HOME_ICON / 2)) <= half);
  if (col < 0 || row < 0) return null;
  return { row, col, y };
}

/* ---- swipe-motor: flere "følelser" man kan vælge i det hemmelige ark ---- */

const SWIPE_STYLES = {
  standard: "Standard (som før)",
  spring: "iOS-fjeder",
  bouncy: "Blød fjeder med lille bounce",
  glide: "Glid (følger fingerens fart)",
};

let homeOffset = 0;
let homeAnim = null;

function renderHomeOffset(px) {
  homeOffset = px;
  homeTrack.style.transform = `translate3d(${px}px, 0, 0)`;
}

function stopHomeAnim() {
  if (!homeAnim) return;
  homeAnim.stop();
  homeAnim = null;
}

/* Aktuel position, også midt i en CSS-transition (så man kan gribe siden) */
function currentHomeOffset() {
  if (homeAnim?.kind === "css") {
    const m = new DOMMatrixReadOnly(getComputedStyle(homeTrack).transform);
    return m.m41;
  }
  return homeOffset;
}

function setHomeOffset(px, animate, duration = 420) {
  stopHomeAnim();
  homeTrack.style.transition = animate ? `transform ${duration}ms cubic-bezier(0.22, 0.9, 0.3, 1)` : "none";
  renderHomeOffset(px);
}

function cssAnim(to, duration, easing) {
  homeTrack.style.transition = `transform ${duration}ms ${easing}`;
  renderHomeOffset(to);
  const timer = window.setTimeout(() => {
    homeTrack.style.transition = "none";
    if (homeAnim?.timer === timer) homeAnim = null;
  }, duration + 30);
  homeAnim = {
    kind: "css",
    timer,
    stop() {
      const now = currentHomeOffsetFromStyle();
      window.clearTimeout(timer);
      homeTrack.style.transition = "none";
      renderHomeOffset(now);
    },
  };
}

function currentHomeOffsetFromStyle() {
  const m = new DOMMatrixReadOnly(getComputedStyle(homeTrack).transform);
  return m.m41;
}

/* Dæmpet fjeder (som UIKit): response = periode i sek., damping = 1 er uden bounce */
function springAnim(from, to, velocity, response, damping) {
  homeTrack.style.transition = "none";
  const k = (2 * Math.PI / response) ** 2;
  const c = (4 * Math.PI * damping) / response;
  let x = from;
  let v = velocity * 1000; /* px/ms → px/s */
  let last = performance.now();
  let raf = 0;
  let alive = true;
  const step = (now) => {
    if (!alive) return;
    let dt = Math.min(0.064, (now - last) / 1000);
    last = now;
    while (dt > 0) {
      const h = Math.min(dt, 1 / 240);
      v += (-k * (x - to) - c * v) * h;
      x += v * h;
      dt -= h;
    }
    if (Math.abs(x - to) < 0.25 && Math.abs(v) < 8) {
      renderHomeOffset(to);
      alive = false;
      homeAnim = null;
      return;
    }
    renderHomeOffset(x);
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  /* Sikkerhedsnet: hvis siden ikke tegnes (rAF fyrer ikke), land på målet */
  const fallback = window.setTimeout(() => {
    if (alive) {
      alive = false;
      cancelAnimationFrame(raf);
      renderHomeOffset(to);
      homeAnim = null;
    }
  }, 1600);
  homeAnim = {
    kind: "spring",
    stop() {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    },
  };
}

function animateHomeTo(to, velocity) {
  stopHomeAnim();
  const from = homeOffset;
  const distance = to - from;
  const style = SWIPE_STYLES[state.swipeStyle] ? state.swipeStyle : "standard";

  if (style === "spring") return springAnim(from, to, velocity, 0.34, 1);
  if (style === "bouncy") return springAnim(from, to, velocity, 0.46, 0.8);

  if (style === "glide") {
    /* Kurvens start-hældning sættes, så den fortsætter med fingerens fart */
    const duration = 420;
    const slope = Math.abs(distance) > 1 ? (velocity * duration) / distance : 0;
    const x1 = 0.18;
    const y1 = Math.max(0, Math.min(1, slope * x1));
    return cssAnim(to, duration, `cubic-bezier(${x1}, ${y1.toFixed(3)}, 0.24, 1)`);
  }

  const duration = Math.round(Math.max(260, Math.min(480, 260 + Math.abs(distance) * 0.6)));
  return cssAnim(to, duration, "cubic-bezier(0.22, 0.9, 0.3, 1)");
}

function setHomeDot(index) {
  homeDots.forEach((dot, i) => dot.classList.toggle("on", i === index));
}

function enterPerform() {
  homePage = 0;
  homeDigits = [null, null];
  homeDrag = null;
  homeStage.style.transition = "none";
  homeStage.style.transform = "";
  homeStage.style.opacity = "";
  home.classList.add("on");
  home.setAttribute("aria-hidden", "false");
  setHomeOffset(0, false);
  setHomeDot(0);
  syncPerformButton();
}

function exitPerform() {
  home.classList.remove("on");
  home.setAttribute("aria-hidden", "true");
  homePress.classList.remove("on");
  syncPerformButton();
}

function syncPerformButton() {
  document.querySelector("#performButton").textContent = isPerforming() ? "Afslut perform" : "Perform";
}

function showPress(cell) {
  if (!cell || OCCUPIED[homePage][cell.row][cell.col] !== "1") return;
  homePress.style.left = `${(ICON_COLS[cell.col] / HOME_W) * 100}%`;
  homePress.style.top = `${((ICON_ROWS[cell.row] - HOME_PAGES_TOP) / HOME_PAGES_H) * 100}%`;
  homePress.classList.add("on");
}

function homePointerDown(event) {
  if (homeDrag || !event.isPrimary) return;
  const cell = homeCellAt(event.clientX, event.clientY);
  const width = homeStage.getBoundingClientRect().width;

  /* Grib siden hvor den er, også midt i en animation — intet hop */
  const grabbed = currentHomeOffset();
  stopHomeAnim();
  homeTrack.style.transition = "none";
  renderHomeOffset(grabbed);
  const startPage = Math.max(0, Math.min(2, Math.round(-grabbed / width)));

  homeDrag = {
    id: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startOffset: grabbed,
    startPage,
    samples: [{ x: event.clientX, t: event.timeStamp }],
    lock: null,
    width,
    cell,
    digit: cell ? DIGIT_CELLS[`${cell.row},${cell.col}`] : undefined,
  };
  try {
    homeStage.setPointerCapture(event.pointerId);
  } catch {
    /* ignoreres — swipet virker også uden capture */
  }
  homePage = startPage;
  showPress(cell);
}

function rubberBand(position, width) {
  const min = -2 * width;
  const band = (over) => (1 - 1 / ((over * 0.55) / width + 1)) * width;
  if (position > 0) return band(position);
  if (position < min) return min - band(min - position);
  return position;
}

function homeVelocity(drag, releaseTime) {
  const samples = drag.samples;
  const last = samples[samples.length - 1];
  /* Holdt fingeren stille før den slap: ingen fart (som iOS) */
  if (releaseTime - last.t > 150) return 0;
  let first = samples[0];
  for (const sample of samples) {
    if (last.t - sample.t <= 100) {
      first = sample;
      break;
    }
  }
  const dt = last.t - first.t;
  return dt > 0 ? (last.x - first.x) / dt : 0;
}

function homePointerMove(event) {
  const drag = homeDrag;
  if (!drag || event.pointerId !== drag.id) return;
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;

  if (!drag.lock && Math.hypot(dx, dy) > 8) {
    drag.lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    homePress.classList.remove("on");
  }
  if (drag.lock !== "x") return;

  drag.samples.push({ x: event.clientX, t: event.timeStamp });
  if (drag.samples.length > 12) drag.samples.shift();

  const position = rubberBand(drag.startOffset + dx, drag.width);
  renderHomeOffset(position);
  setHomeDot(Math.max(0, Math.min(2, Math.round(-position / drag.width))));
}

function homePointerUp(event) {
  const drag = homeDrag;
  if (!drag || event.pointerId !== drag.id) return;
  homeDrag = null;
  homePress.classList.remove("on");

  if (drag.lock === "x") {
    if (event.clientX !== drag.samples[drag.samples.length - 1].x) {
      drag.samples.push({ x: event.clientX, t: event.timeStamp });
    }
    const velocity = homeVelocity(drag, event.timeStamp);
    const position = homeOffset;
    const nearest = Math.round(-position / drag.width);

    let target = nearest;
    if (velocity < -0.3) target = Math.floor(-position / drag.width) + 1;
    else if (velocity > 0.3) target = Math.ceil(-position / drag.width) - 1;
    target = Math.max(0, Math.min(2, Math.max(drag.startPage - 1, Math.min(drag.startPage + 1, target))));

    /* Swipe fremad fra side 1 eller 2 registrerer cifret under fingeren */
    if (target === drag.startPage + 1 && drag.startPage < 2) {
      homeDigits[drag.startPage] = drag.digit ?? null;
    }

    homePage = target;
    setHomeDot(homePage);
    animateHomeTo(-homePage * drag.width, velocity);
    return;
  }

  /* Grebet midt i en animation og sluppet uden swipe: land på nærmeste side */
  if (Math.abs(homeOffset + drag.startPage * drag.width) > 0.5) {
    homePage = drag.startPage;
    setHomeDot(homePage);
    animateHomeTo(-homePage * drag.width, 0);
    return;
  }

  if (drag.lock === null && event.type === "pointerup") {
    const cell = homeCellAt(event.clientX, event.clientY);

    /* Tomme områder (over/under ikon-gridet, ikke docken) tæller med i de hemmelige 3 tryk */
    const stageTop = homeStage.getBoundingClientRect().top;
    if (!cell && event.clientY - stageTop < HOME_DOCK_TOP * homeScale()) handleSecretTap();

    if (
      cell &&
      homePage === NOTES_CELL.page &&
      cell.row === NOTES_CELL.row &&
      cell.col === NOTES_CELL.col
    ) {
      launchNotes();
    }
  }
}

function homePointerCancel(event) {
  if (!homeDrag || event.pointerId !== homeDrag.id) return;
  const width = homeDrag.width;
  homeDrag = null;
  homePress.classList.remove("on");
  setHomeDot(homePage);
  animateHomeTo(-homePage * width, 0);
}

function applyHomeDigits() {
  const [first, second] = homeDigits;
  let number = null;
  if (first !== null && second !== null) number = first * 10 + second;
  else if (first !== null) number = first;
  else if (second !== null) number = second;
  if (number === 0 && first !== null && second !== null) number = 100;
  if (number >= 1 && number <= 100) {
    state.spectatorNumber = number;
    saveState();
  }
}

function launchNotes() {
  applyHomeDigits();
  renderAll();

  const W = window.innerWidth;
  const H = app.offsetHeight;
  const k = homeScale();
  const stageRect = homeStage.getBoundingClientRect();
  const size = HOME_ICON * k;
  const iconLeft = stageRect.left + ICON_COLS[NOTES_CELL.col] * k;
  const iconTop = stageRect.top + ICON_ROWS[NOTES_CELL.row] * k;
  const s = size / W;
  /* Et kvadrat midt i appen skaleres ned, så det dækker ikonet præcist */
  const a = (H - W) / 2;
  const radius = (size * 0.23) / s;

  const icon = document.createElement("div");
  icon.className = "launch-icon";
  icon.style.top = `${a}px`;
  icon.style.width = `${W}px`;
  icon.style.height = `${W}px`;
  app.appendChild(icon);

  app.classList.add("launching");
  app.style.transition = "none";
  app.style.transformOrigin = "0 0";
  app.style.transform = `translate3d(${iconLeft}px, ${iconTop - a * s}px, 0) scale(${s})`;
  app.style.clipPath = `inset(${a}px 0 ${H - a - W}px 0 round ${radius}px)`;
  app.style.webkitClipPath = app.style.clipPath;
  app.getBoundingClientRect();

  const ease = "cubic-bezier(0.2, 0.85, 0.25, 1)";
  app.style.transition = `transform 520ms ${ease}, clip-path 520ms ${ease}, -webkit-clip-path 520ms ${ease}`;
  app.style.transform = "translate3d(0, 0, 0) scale(1)";
  app.style.clipPath = "inset(0 0 0 0 round 0px)";
  app.style.webkitClipPath = app.style.clipPath;

  icon.style.transition = "opacity 200ms ease-out";
  icon.getBoundingClientRect();
  icon.style.opacity = "0";

  homeStage.style.transition = `transform 520ms ${ease}, opacity 520ms ease`;
  homeStage.style.transform = "scale(1.12)";
  homeStage.style.opacity = "0.4";

  window.setTimeout(() => {
    icon.remove();
    app.classList.remove("launching");
    app.style.transition = "";
    app.style.transform = "";
    app.style.transformOrigin = "";
    app.style.clipPath = "";
    app.style.webkitClipPath = "";
    exitPerform();
  }, 560);
}

/* ---------------- billedvedhæftning ---------------- */

function attachImage(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1000 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      state.images = { ...state.images, [state.selectedNote]: canvas.toDataURL("image/jpeg", 0.72) };
      saveState();
      renderNotePage();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ---------------- events ---------------- */

function registerEvents() {
  document.querySelectorAll("[data-secret]").forEach((zone) => {
    zone.addEventListener("pointerup", handleSecretTap);
  });

  document.querySelector("#toFolders").addEventListener("click", () => setView("folders"));
  document.querySelector("#toNotes").addEventListener("click", () => setView("notes"));

  folderGroupsEl.addEventListener("click", (event) => {
    if (!event.target.closest("[data-open-notes]")) return;
    setView("notes");
  });

  noteGroupsEl.addEventListener("click", (event) => {
    const collapse = event.target.closest("[data-collapse]");
    if (collapse) {
      collapse.closest(".sec").classList.toggle("collapsed");
      return;
    }
    const row = event.target.closest("[data-note]");
    if (!row) return;
    state.selectedNote = row.dataset.note;
    saveState();
    renderNotes();
    renderNotePage();
    setView("editor");
  });

  document.querySelectorAll("#newNoteButton, [data-new-note]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedNote = "prediction";
      saveState();
      renderNotes();
      renderNotePage();
      setView("editor");
    });
  });

  document.querySelectorAll("[data-secret-search]").forEach((input) => {
    input.addEventListener("input", secretSearchInput);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") input.blur();
    });
  });

  categorySelect.addEventListener("change", syncPredictionSelect);
  scrim.addEventListener("click", () => {
    /* Det tryk, der åbnede arket, må ikke lukke det igen via sit eget click */
    if (Date.now() - settingsOpenedAt > 400) closeSettings();
  });
  const applySettings = () => {
    state.category = categorySelect.value;
    state.prediction = predictionSelect.value;
    state.inputMethod = document.querySelector("input[name='inputMethod']:checked")?.value || "longpress";
    state.swipeStyle = document.querySelector("#swipeSelect").value || "standard";
    saveState();
    closeSettings();
    renderAll();
  };
  document.querySelector("#saveSettings").addEventListener("click", applySettings);
  document.querySelector("#performButton").addEventListener("click", () => {
    const wasPerforming = isPerforming();
    applySettings();
    if (wasPerforming) exitPerform();
    else enterPerform();
  });

  homeStage.addEventListener("pointerdown", homePointerDown);
  homeStage.addEventListener("pointermove", homePointerMove);
  homeStage.addEventListener("pointerup", homePointerUp);
  homeStage.addEventListener("pointercancel", homePointerCancel);
  home.addEventListener("contextmenu", (event) => event.preventDefault());

  const hotspot = document.querySelector("#hotspot");
  hotspot.addEventListener("pointerdown", () => {
    pressTimer = window.setTimeout(openPad, 2000);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
    hotspot.addEventListener(type, () => window.clearTimeout(pressTimer));
  });
  document.addEventListener("pointerdown", (event) => {
    if (numberPad.classList.contains("open") && !numberPad.contains(event.target)) closePad(false);
  });

  document.querySelector("#attachButton").addEventListener("click", () => imagePicker.click());
  imagePicker.addEventListener("change", () => {
    if (imagePicker.files && imagePicker.files[0]) attachImage(imagePicker.files[0]);
    imagePicker.value = "";
  });

  /* Løft bundlinjen når tastaturet vises (falsk søgefelt) */
  if (window.visualViewport) {
    const vv = window.visualViewport;
    /* iOS-PWA'er kan rapportere en fast forskel mellem innerHeight og det
       synlige område (fx ~60pt) uden tastatur. Den måles som nulpunkt, og
       bundlinjen løftes kun, mens et tekstfelt har fokus. */
    let baseline = 0;
    const gap = () => Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    const typing = () => document.activeElement?.matches?.("input, textarea") ?? false;
    const sync = () => {
      if (!typing()) baseline = gap();
      /* Under 120pt er det ikke et tastatur, men iOS' faste forskel */
      const lift = typing() ? Math.max(0, gap() - baseline) : 0;
      const kb = lift > 120 ? lift : 0;
      document.documentElement.style.setProperty("--kb", `${kb}px`);
    };
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    document.addEventListener("focusin", () => window.setTimeout(sync, 0));
    document.addEventListener("focusout", () => window.setTimeout(sync, 0));
    sync();
  }
}

/* ---------------- vindueshøjde (iOS 26-PWA) ----------------
   I hjemmeskærm-apps kan iOS 26 give et layout-vindue, der slutter ~60pt
   før skærmens bund, selv om webvisningen går helt ned. Vi tager den
   største højde, browseren selv kender, og i standalone-tilstand den
   fulde skærm minus statuslinjen, når hullet ligner netop den fejl. */

const lvhProbe = document.createElement("div");
lvhProbe.style.cssText = "position:fixed;top:0;left:0;width:1px;height:100lvh;visibility:hidden;pointer-events:none";
document.body.appendChild(lvhProbe);
let viewportInfo = {};

function statusBarHeight(screenH) {
  if (screenH === 874 || screenH === 956) return 62;
  if (screenH === 852 || screenH === 932) return 59;
  return 47;
}

function fitViewport() {
  const vv = window.visualViewport;
  const candidates = {
    inner: window.innerHeight,
    client: document.documentElement.clientHeight,
    vv: vv ? Math.round(vv.height + vv.offsetTop) : 0,
    lvh: lvhProbe.offsetHeight,
  };
  let height = Math.max(...Object.values(candidates));
  const standalone = window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  const portrait = window.screen.height > window.screen.width;
  let full = 0;
  if (standalone && portrait) {
    full = window.screen.height - statusBarHeight(window.screen.height);
    const missing = full - height;
    if (missing > 20 && missing < 90) height = full;
  }
  document.documentElement.style.setProperty("--app-h", `${height}px`);
  viewportInfo = { ...candidates, screen: window.screen.height, full, used: height, standalone };
}

fitViewport();
["resize", "orientationchange", "pageshow", "focusout"].forEach((type) =>
  window.addEventListener(type, () => window.setTimeout(fitViewport, type === "focusout" ? 350 : 0)),
);
window.visualViewport?.addEventListener("resize", fitViewport);
document.addEventListener("visibilitychange", () => window.setTimeout(fitViewport, 100));

/* ---------------- start ---------------- */

buildPad();
registerEvents();
renderAll();
window.setTimeout(() => app.classList.remove("no-anim"), 60);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
