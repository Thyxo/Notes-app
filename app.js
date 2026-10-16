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
  kitchen: {
    label: "køkkenting",
    title: "100 køkkenting",
    items: [
      "Paletkniv", "Piskeris", "Grydeske", "Hulske", "Spatel", "Ostehøvl", "Kartoffelskræller", "Rivejern", "Dørslag", "Si",
      "Målebæger", "Måleske", "Køkkenvægt", "Skærebræt", "Kokkekniv", "Brødkniv", "Urtekniv", "Skrællekniv", "Udbenerkniv", "Knivsliber",
      "Kødhammer", "Kødtermometer", "Køkkenur", "Flaskeåbner", "Proptrækker", "Dåseåbner", "Nøddeknækker", "Hvidløgspresser", "Citronpresser", "Salatsleve",
      "Salatskål", "Røreskål", "Foodprocessor", "Blender", "Stavblender", "Håndmixer", "Køkkenmaskine", "Elkedel", "Brødrister", "Kaffemaskine",
      "Stempelkande", "Tekande", "Tesi", "Termokande", "Mikrobølgeovn", "Airfryer", "Vaffeljern", "Grillpande", "Stegepande", "Wokpande",
      "Kasserolle", "Gryde", "Trykkoger", "Sauterpande", "Ovnfast fad", "Bageplade", "Kageform", "Muffinform", "Brødform", "Springform",
      "Dejskraber", "Kagerulle", "Bagepapir", "Kageriste", "Piskeflødesprøjte", "Kagepensel", "Udstikker", "Sigte", "Pizzaskærer", "Pizzasten",
      "Middagstallerken", "Dyb tallerken", "Frokosttallerken", "Desserttallerken", "Suppeskål", "Morgenmadsskål", "Serveringsfad", "Sovsekande", "Smørfad", "Tallerkenskåner",
      "Vandglas", "Vinglas", "Ølglas", "Champagneglas", "Kaffekop", "Tekop", "Krus", "Espressokop", "Karaffel", "Snapseglas",
      "Gaffel", "Spiseske", "Teske", "Bordkniv", "Smørkniv", "Serveringsske", "Serveringsgaffel", "Salatbestik", "Grydelap", "Viskestykke",
    ],
  },
  cards: {
    label: "spillekort",
    title: "52 kort",
    items: [
      "Hjerter es", "Hjerter 2", "Hjerter 3", "Hjerter 4", "Hjerter 5", "Hjerter 6", "Hjerter 7", "Hjerter 8", "Hjerter 9", "Hjerter 10", "Hjerter knægt", "Hjerter dame", "Hjerter konge",
      "Ruder es", "Ruder 2", "Ruder 3", "Ruder 4", "Ruder 5", "Ruder 6", "Ruder 7", "Ruder 8", "Ruder 9", "Ruder 10", "Ruder knægt", "Ruder dame", "Ruder konge",
      "Klør es", "Klør 2", "Klør 3", "Klør 4", "Klør 5", "Klør 6", "Klør 7", "Klør 8", "Klør 9", "Klør 10", "Klør knægt", "Klør dame", "Klør konge",
      "Spar es", "Spar 2", "Spar 3", "Spar 4", "Spar 5", "Spar 6", "Spar 7", "Spar 8", "Spar 9", "Spar 10", "Spar knægt", "Spar dame", "Spar konge",
    ],
  },
};

/* ---------------- tilstand ---------------- */

const storageKey = "liquidNotesPerformerState";

const fallbackState = {
  category: "animals",
  prediction: "Tiger",
  inputMethod: "longpress",
  homeMode: "default",
  spectatorNumber: 37,
  selectedNote: "prediction",
  images: {},
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
  const size = Math.min(100, category.items.length);
  const number = Math.max(1, Math.min(size, Number(state.spectatorNumber) || 1));
  const rand = random(seedFrom(`${state.category}:${prediction}:${number}`));
  const rest = category.items.filter((item) => item !== prediction);

  /* Fisher-Yates med den seedede generator, så listen er 100% deterministisk */
  for (let i = rest.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  /* listen er lige så lang som puljen (100 ord, 52 kort); et eget ord
     skubber ét puljeord ud */
  const list = rest.slice(0, size - 1);
  list.splice(number - 1, 0, prediction);
  return list;
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
      preview: `En rolig liste med ${Math.min(100, category.items.length)} ${category.label}, gemt i noter.`,
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
const predictionInput = document.querySelector("#predictionInput");
const homeModeSelect = document.querySelector("#homeModeSelect");
const predictionSuggest = document.querySelector("#predictionSuggest");
const predictionStatus = document.querySelector("#predictionStatus");
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
  predictionInput.value = state.prediction || "";
  syncPredictionSelect();
  document.querySelectorAll("input[name='inputMethod']").forEach((radio) => {
    radio.checked = radio.value === state.inputMethod;
  });
  currentNumber.textContent = state.spectatorNumber;
  homeModeSelect.querySelector("[value='custom']").disabled = !customHome;
  homeModeSelect.value = state.homeMode === "custom" && customHome ? "custom" : "default";
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

/* Forudsigelsen skrives frit. Findes ordet i puljen (uanset store/små bogstaver),
   bruges puljens stavemåde; ellers bruges det egne ord, og makeForcedList
   dropper automatisk ét puljeord, så listen beholder puljens længde. */
function sheetCategory() {
  return pools[categorySelect.value] || getCategory();
}

function resolvePrediction(text) {
  const typed = text.trim().replace(/\s+/g, " ");
  if (!typed) return sheetCategory().items[0];
  const match = sheetCategory().items.find((item) => item.toLocaleLowerCase("da") === typed.toLocaleLowerCase("da"));
  return match || typed;
}

function syncPredictionSelect() {
  const items = sheetCategory().items;
  if (!predictionInput.value.trim()) predictionInput.value = items.includes(state.prediction) ? state.prediction : items[0];
  updatePredictionSuggest(false);
}

function updatePredictionSuggest(show = true) {
  const items = sheetCategory().items;
  const query = predictionInput.value.trim().toLocaleLowerCase("da");
  const resolved = resolvePrediction(predictionInput.value);
  const own = !items.includes(resolved);
  predictionStatus.textContent = own ? "Eget ord – ét ord fra listen udskiftes" : "Findes på listen";
  predictionStatus.classList.toggle("own", own);

  const starts = items.filter((item) => item.toLocaleLowerCase("da").startsWith(query));
  const contains = items.filter((item) => !starts.includes(item) && item.toLocaleLowerCase("da").includes(query));
  const hits = (query ? [...starts, ...contains] : items).filter((item) => item !== resolved).slice(0, 6);
  predictionSuggest.innerHTML = show
    ? hits.map((item) => `<button type="button" data-word="${esc(item)}">${esc(item)}</button>`).join("")
    : "";
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

/* Geometri i screenshot-pixels. Standarden er målt på rigtige 1179×2556-
   screenshots på sort baggrund; en egen hjemmeskærm (se "egen hjemmeskærm"
   længere nede) har samme form, men er målt automatisk ud fra brugerens
   egne screenshots. rows/cols er ikonernes øverste/venstre kant. */
const DEFAULT_HOME = {
  W: 1179,
  H: 2556,
  bg: "#000000",
  pagesTop: 140,
  pagesH: 1900,
  dotsTop: 2050,
  dotsH: 80,
  dockTop: 2140,
  dockH: 416,
  icon: 225,
  cols: [58, 337, 618, 897],
  rows: [245, 524, 803, 1082, 1361, 1640],
  occupied: [
    ["1111", "1111", "1111", "1111", "1111", "1111"],
    ["1111", "1111", "1111", "1111", "1111", "1111"],
    ["1111", "1100", "0000", "1110", "1111", "1111"],
  ],
  notes: { page: 2, row: 3, col: 2 },
  src: {
    pages: ["home/page1.webp", "home/page2.webp", "home/page3.webp"],
    dots: ["home/dots1.png", "home/dots2.png", "home/dots3.png"],
    dock: "home/dock.webp",
    noter: "home/noter.png",
  },
};
let homeGeo = DEFAULT_HOME;

/* Ciffer for et felt: de ni nederste i højre 3×3-blok (1–9) og 0 over
   midten af den. Regnes fra bunden, så det virker uanset antal rækker. */
function digitAt(cell) {
  if (!cell) return undefined;
  const last = homeGeo.rows.length - 1;
  const fromTop = cell.row - (last - 2);
  if (fromTop >= 0 && fromTop <= 2 && cell.col >= 1 && cell.col <= 3) return fromTop * 3 + cell.col;
  if (cell.row === last - 3 && cell.col === 2) return 0;
  return undefined;
}

function isNotesCell(cell) {
  const notes = homeGeo.notes;
  return Boolean(cell && homePage === notes.page && cell.row === notes.row && cell.col === notes.col);
}

let homePage = 0;
let homeDigits = [null, null];
let homeDrag = null;

function isPerforming() {
  return home.classList.contains("on");
}

function homeScale() {
  return homeStage.getBoundingClientRect().width / homeGeo.W;
}

function homeCellAt(clientX, clientY) {
  const rect = homeStage.getBoundingClientRect();
  const { W, cols, rows, icon } = homeGeo;
  const k = rect.width / W;
  const x = (clientX - rect.left) / k;
  const y = (clientY - rect.top) / k;
  const colHalf = (cols[1] - cols[0]) / 2;
  const rowHalf = (rows[1] - rows[0]) / 2;
  const col = cols.findIndex((left) => Math.abs(x - (left + icon / 2)) <= colHalf);
  const row = rows.findIndex((top) => Math.abs(y - (top + icon / 2)) <= rowHalf);
  if (col < 0 || row < 0) return null;
  return { row, col, y };
}

/* ---- swipe-motor: iOS-fjeder ----
   Fjederen (UIKit-stil, uden bounce) regnes ud på forhånd og afspilles som en
   compositor-animation med linear()-easing, så den kører på GPU'en i fuld
   billedfrekvens i stedet for at blive tegnet frame for frame fra JS. */

const SPRING_RESPONSE = 0.28; /* sek. — lavere er hurtigere */
const SPRING_DAMPING = 1;
const supportsLinearEasing = window.CSS?.supports?.("animation-timing-function", "linear(0, 1)") ?? false;

let homeOffset = 0;
let homeAnim = null;

function renderHomeOffset(px) {
  homeOffset = px;
  homeTrack.style.transform = `translate3d(${px}px, 0, 0)`;
}

function readTrackOffset() {
  return new DOMMatrixReadOnly(getComputedStyle(homeTrack).transform).m41;
}

/* Aktuel position, også midt i en animation (så man kan gribe siden) */
function currentHomeOffset() {
  return homeAnim ? readTrackOffset() : homeOffset;
}

function stopHomeAnim() {
  if (!homeAnim) return;
  const now = readTrackOffset();
  homeAnim.stop();
  homeAnim = null;
  renderHomeOffset(now);
}

function setHomeOffset(px) {
  stopHomeAnim();
  homeTrack.style.transition = "none";
  renderHomeOffset(px);
}

/* Simulerer fjederen og returnerer positioner pr. ~8 ms til den falder til ro */
function springSamples(from, to, velocity) {
  const k = (2 * Math.PI / SPRING_RESPONSE) ** 2;
  const c = (4 * Math.PI * SPRING_DAMPING) / SPRING_RESPONSE;
  const h = 1 / 960;
  const every = 8; /* 960 Hz-trin → én prøve pr. 8,3 ms */
  let x = from;
  let v = velocity * 1000;
  const samples = [x];
  for (let i = 1; i < 960 * 1.5; i += 1) {
    v += (-k * (x - to) - c * v) * h;
    x += v * h;
    if (i % every === 0) {
      samples.push(x);
      if (Math.abs(x - to) < 0.2 && Math.abs(v) < 6) break;
    }
  }
  samples.push(to);
  return { samples, duration: ((samples.length - 1) * every * 1000) / 960 };
}

function animateHomeTo(to, velocity) {
  stopHomeAnim();
  homeTrack.style.transition = "none";
  const from = homeOffset;
  if (Math.abs(to - from) < 0.5) {
    renderHomeOffset(to);
    return;
  }
  const { samples, duration } = springSamples(from, to, velocity);

  if (supportsLinearEasing && homeTrack.animate) {
    const points = samples.map((x) => ((x - from) / (to - from)).toFixed(4)).join(", ");
    renderHomeOffset(to);
    const animation = homeTrack.animate(
      [{ transform: `translate3d(${from}px, 0, 0)` }, { transform: `translate3d(${to}px, 0, 0)` }],
      { duration, easing: `linear(${points})` },
    );
    const entry = { stop: () => animation.cancel() };
    homeAnim = entry;
    animation.onfinish = () => {
      if (homeAnim === entry) homeAnim = null;
    };
    return;
  }

  /* Reserve uden linear(): afspil prøverne med rAF, og land på målet hvis rAF ikke fyrer */
  const start = performance.now();
  let raf = 0;
  let alive = true;
  const step = (now) => {
    if (!alive) return;
    const i = Math.min(samples.length - 1, Math.floor(((now - start) / duration) * (samples.length - 1)));
    renderHomeOffset(samples[i]);
    if (i >= samples.length - 1) {
      alive = false;
      homeAnim = null;
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  const fallback = window.setTimeout(() => {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(raf);
    renderHomeOffset(to);
    homeAnim = null;
  }, duration + 300);
  homeAnim = {
    stop() {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    },
  };
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
  /* Området bag statuslinjen skal have hjemmeskærmens farve */
  document.documentElement.style.background = homeGeo.bg;
  document.body.style.background = homeGeo.bg;
  setHomeOffset(0);
  setHomeDot(0);
  syncPerformButton();
}

function exitPerform() {
  home.classList.remove("on");
  home.setAttribute("aria-hidden", "true");
  document.documentElement.style.background = "";
  document.body.style.background = "";
  homePress.classList.remove("on");
  syncPerformButton();
}

function syncPerformButton() {
  document.querySelector("#performButton").textContent = isPerforming() ? "Afslut perform" : "Perform";
}

function showPress(cell) {
  const g = homeGeo;
  if (!cell || g.occupied[homePage]?.[cell.row]?.[cell.col] !== "1") return;
  homePress.style.left = `${(g.cols[cell.col] / g.W) * 100}%`;
  homePress.style.top = `${((g.rows[cell.row] - g.pagesTop) / g.pagesH) * 100}%`;
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
    digit: digitAt(cell),
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
    if (!cell && event.clientY - stageTop < (homeGeo.dockTop ?? homeGeo.dotsTop) * homeScale()) handleSecretTap();

    if (isNotesCell(cell)) launchNotes();
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
  const size = homeGeo.icon * k;
  const iconLeft = stageRect.left + homeGeo.cols[homeGeo.notes.col] * k;
  const iconTop = stageRect.top + homeGeo.rows[homeGeo.notes.row] * k;
  const s = size / W;
  /* Et kvadrat midt i appen skaleres ned, så det dækker ikonet præcist */
  const a = (H - W) / 2;
  const radius = (size * 0.23) / s;

  const icon = document.createElement("div");
  icon.className = "launch-icon";
  icon.style.backgroundImage = `url("${homeGeo.src.noter}")`;
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

/* ---------------- egen hjemmeskærm ----------------
   Performeren uploader 3 screenshots af sin egen hjemmeskærm (side 1–3),
   taget med en helt ensfarvet baggrund. Fordi baggrunden er ensfarvet, kan
   ikon-laget glide som ét billede, ligesom på den rigtige iPhone, hvor kun
   ikonerne bevæger sig. Alt måles automatisk ud fra billederne:
   baggrundsfarve, statuslinje, ikongitter og prikker/dock. Det hele gemmes
   lokalt i IndexedDB (billederne er for store til localStorage). */

const BG_TOL = 22; /* max kanalafvigelse fra baggrunden (tåler JPEG-støj) */
const DIFF_TOL = 48; /* forskel mellem to sider, der tæller som "ændret" */

let customHome = null;
let homeObjectUrls = [];

function applyHomeGeo(geo) {
  homeGeo = geo;
  const pct = (value, of) => `${(value / of) * 100}%`;
  const style = home.style;
  style.setProperty("--home-ratio", String(geo.H / geo.W));
  style.setProperty("--home-bg", geo.bg);
  style.setProperty("--pages-top", pct(geo.pagesTop, geo.H));
  style.setProperty("--pages-h", pct(geo.pagesH, geo.H));
  style.setProperty("--dots-top", pct(geo.dotsTop, geo.H));
  style.setProperty("--dots-h", pct(geo.dotsH, geo.H));
  homeTrack.querySelectorAll("img").forEach((img, i) => {
    if (img.getAttribute("src") !== geo.src.pages[i]) img.src = geo.src.pages[i];
  });
  homeDots.forEach((img, i) => {
    if (img.getAttribute("src") !== geo.src.dots[i]) img.src = geo.src.dots[i];
  });
  const dock = document.querySelector(".home-dock");
  dock.hidden = !geo.src.dock;
  if (geo.src.dock) {
    if (dock.getAttribute("src") !== geo.src.dock) dock.src = geo.src.dock;
    style.setProperty("--dock-top", pct(geo.dockTop, geo.H));
    style.setProperty("--dock-h", pct(geo.dockH, geo.H));
  }
  homePress.style.width = pct(geo.icon, geo.W);
  homePress.style.height = pct(geo.icon, geo.pagesH);
}

function syncHomeGeo() {
  applyHomeGeo(state.homeMode === "custom" && customHome ? customHome : DEFAULT_HOME);
}

/* ---- lager (IndexedDB) ---- */

function homeDb(mode, action) {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB findes ikke"));
      return;
    }
    const open = indexedDB.open("noter-home", 1);
    open.onupgradeneeded = () => open.result.createObjectStore("kv");
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction("kv", mode);
      const request = action(tx.objectStore("kv"));
      tx.oncomplete = () => {
        db.close();
        resolve(request ? request.result : undefined);
      };
      tx.onerror = tx.onabort = () => {
        db.close();
        reject(tx.error);
      };
    };
  });
}

/* Billeder gemmes som ArrayBuffer — sikrere end Blob i ældre Safari */
function recordToGeo(record) {
  homeObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  homeObjectUrls = [];
  const url = (file) => {
    const objectUrl = URL.createObjectURL(new Blob([file.buf], { type: file.type }));
    homeObjectUrls.push(objectUrl);
    return objectUrl;
  };
  return {
    ...record.geo,
    src: {
      pages: record.files.pages.map(url),
      dots: record.files.bottoms.map(url),
      dock: null,
      noter: url(record.files.noter),
    },
  };
}

async function loadCustomHome() {
  try {
    const record = await homeDb("readonly", (store) => store.get("custom"));
    customHome = record ? recordToGeo(record) : null;
  } catch {
    customHome = null;
  }
  syncHomeGeo();
}

/* ---- analyse af screenshots ---- */

function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Billedet kunne ikke læses"));
    };
    img.src = url;
  });
}

function drawToCanvas(img, width, height, sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  return canvas;
}

function toHex([r, g, b]) {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

/* Grupperer tal: værdier tættere end tol bliver én gruppe */
function clusterValues(values, tol) {
  const sorted = [...values].sort((a, b) => a - b);
  const groups = [];
  for (const value of sorted) {
    const last = groups[groups.length - 1];
    if (last && value - last.max <= tol) {
      last.sum += value;
      last.n += 1;
      last.max = value;
    } else groups.push({ sum: value, n: 1, max: value });
  }
  return groups.map((g) => ({ at: g.sum / g.n, n: g.n }));
}

/* Finder de sammenhængende ikoner (firkanter) i et område af en side */
function findIcons(mask, w, y0, y1, minSize, maxSize) {
  const seen = new Uint8Array(w * (y1 - y0));
  const stack = new Int32Array(w * (y1 - y0));
  const found = [];
  for (let y = y0; y < y1; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const local = (y - y0) * w + x;
      if (seen[local] || !mask[y * w + x]) continue;
      let top = 0;
      stack[top++] = local;
      seen[local] = 1;
      let minX = x, maxX = x, minY = y, maxY = y, count = 0;
      while (top) {
        const p = stack[--top];
        const px = p % w;
        const py = (p - px) / w + y0;
        count += 1;
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
        /* mask-indeks = lokalt indeks + forskydning, da området er hele rækker */
        const shift = y0 * w;
        if (px > 0 && !seen[p - 1] && mask[p - 1 + shift]) {
          seen[p - 1] = 1;
          stack[top++] = p - 1;
        }
        if (px < w - 1 && !seen[p + 1] && mask[p + 1 + shift]) {
          seen[p + 1] = 1;
          stack[top++] = p + 1;
        }
        if (py > y0 && !seen[p - w] && mask[p - w + shift]) {
          seen[p - w] = 1;
          stack[top++] = p - w;
        }
        if (py < y1 - 1 && !seen[p + w] && mask[p + w + shift]) {
          seen[p + w] = 1;
          stack[top++] = p + w;
        }
      }
      const bw = maxX - minX + 1;
      const bh = maxY - minY + 1;
      const ratio = bw / bh;
      if (bw >= minSize && bw <= maxSize && ratio > 0.8 && ratio < 1.25 && count > bw * bh * 0.1) {
        found.push({ x: (minX + maxX + 1) / 2, y: (minY + maxY + 1) / 2, size: (bw + bh) / 2 });
      }
    }
  }
  return found;
}

/* Er et smalt bånd sidens prikker? Prikker er lige store, runde og står
   med samme afstand midt på skærmen — i modsætning til en ikon-tekst. */
function looksLikeDots(rowsMask, w, band) {
  const height = band.b - band.a;
  const center = (band.minX + band.maxX) / 2;
  if (Math.abs(center - w / 2) > 0.04 * w || band.maxX - band.minX > 0.3 * w) return false;
  const columns = new Uint8Array(w);
  for (let y = band.a; y < band.b; y += 1) {
    for (let x = band.minX; x <= band.maxX; x += 1) if (rowsMask[y * w + x]) columns[x] = 1;
  }
  const segments = [];
  for (let x = band.minX; x <= band.maxX + 1; x += 1) {
    if (columns[x] && (x === 0 || !columns[x - 1])) segments.push({ start: x });
    if (!columns[x] && x > 0 && columns[x - 1] && segments.length) segments[segments.length - 1].end = x;
  }
  if (segments.length < 2) return false;
  const widths = segments.map((s) => s.end - s.start);
  const median = [...widths].sort((a, b) => a - b)[widths.length >> 1];
  if (widths.some((v) => Math.abs(v - median) > Math.max(2, median * 0.4))) return false;
  if (median < height * 0.5 || median > height * 2) return false;
  const centers = segments.map((s) => (s.start + s.end) / 2);
  const gaps = centers.slice(1).map((c, i) => c - centers[i]);
  const gap = [...gaps].sort((a, b) => a - b)[gaps.length >> 1];
  return gaps.every((g) => Math.abs(g - gap) <= Math.max(2, gap * 0.2));
}

/* Hovedanalysen. imgs = de tre screenshots (side 1, 2, 3).
   Returnerer geometri i screenshot-pixels + beskeder, eller kaster en fejl. */
function analyzeHomeScreens(imgs) {
  const W = imgs[0].naturalWidth;
  const H = imgs[0].naturalHeight;
  if (imgs.some((img) => img.naturalWidth !== W || img.naturalHeight !== H)) {
    throw new Error("De tre screenshots har ikke samme størrelse. Tag dem på samme telefon.");
  }
  if (W >= H) throw new Error("Tag screenshots med telefonen på højkant.");

  const scale = Math.min(1, 600 / W);
  const w = Math.round(W * scale);
  const h = Math.round(H * scale);
  const pages = imgs.map((img) => drawToCanvas(img, w, h).getContext("2d").getImageData(0, 0, w, h).data);
  const warnings = [];

  /* 1. Baggrundsfarven = den klart hyppigste farve */
  const counts = new Map();
  for (const data of pages) {
    for (let i = 0; i < data.length; i += 8) {
      const key = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  const topKey = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const sum = [0, 0, 0];
  let n = 0;
  for (const data of pages) {
    for (let i = 0; i < data.length; i += 8) {
      const key = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
      if (key !== topKey) continue;
      sum[0] += data[i];
      sum[1] += data[i + 1];
      sum[2] += data[i + 2];
      n += 1;
    }
  }
  const bg = sum.map((v) => v / n);

  /* 2. Masker: hvad er ikke baggrund, og hvad er forskelligt mellem siderne */
  const masks = pages.map((data) => {
    const mask = new Uint8Array(w * h);
    for (let p = 0, i = 0; p < mask.length; p += 1, i += 4) {
      mask[p] =
        Math.abs(data[i] - bg[0]) > BG_TOL || Math.abs(data[i + 1] - bg[1]) > BG_TOL || Math.abs(data[i + 2] - bg[2]) > BG_TOL
          ? 1
          : 0;
    }
    return mask;
  });
  const union = new Uint8Array(w * h);
  const rowContent = new Int32Array(h);
  const rowVary = new Int32Array(h);
  const rowMinX = new Int32Array(h).fill(w);
  const rowMaxX = new Int32Array(h).fill(-1);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const p = y * w + x;
      if (masks[0][p] || masks[1][p] || masks[2][p]) {
        union[p] = 1;
        rowContent[y] += 1;
        if (x < rowMinX[y]) rowMinX[y] = x;
        if (x > rowMaxX[y]) rowMaxX[y] = x;
      }
      const i = p * 4;
      for (let c = 0; c < 3; c += 1) {
        const v0 = pages[0][i + c];
        const v1 = pages[1][i + c];
        const v2 = pages[2][i + c];
        if (Math.max(v0, v1, v2) - Math.min(v0, v1, v2) > DIFF_TOL) {
          rowVary[y] += 1;
          break;
        }
      }
    }
  }

  /* Ensfarvet? Kanterne midt på skærmen må kun være baggrund */
  let edge = 0;
  let edgeHits = 0;
  for (let y = Math.round(h * 0.12); y < h * 0.78; y += 1) {
    for (const x of [1, 3, 5, w - 2, w - 4, w - 6]) {
      edge += 1;
      edgeHits += union[y * w + x];
    }
  }
  if (edgeHits / edge > 0.03) {
    throw new Error("Baggrunden ser ikke ensfarvet ud. Brug et helt ensfarvet baggrundsbillede (uden farveovergang) og tag screenshots igen.");
  }
  const luminance = (0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]) / 255;
  if (luminance > 0.45) {
    warnings.push("Farven er lys. Statuslinjen i appen har altid hvid tekst, så en mørk farve ser mest ægte ud.");
  }

  /* 3. Vandrette bånd med indhold */
  const bands = [];
  for (let y = 0; y < h; y += 1) {
    if (rowContent[y] < 2) continue;
    const last = bands[bands.length - 1];
    if (last && y - last.b <= 1) {
      last.b = y + 1;
    } else {
      bands.push({ a: y, b: y + 1, content: 0, vary: 0, minX: w, maxX: -1 });
    }
    const band = bands[bands.length - 1];
    band.content += rowContent[y];
    band.vary += rowVary[y];
    band.minX = Math.min(band.minX, rowMinX[y]);
    band.maxX = Math.max(band.maxX, rowMaxX[y]);
  }

  /* Statuslinjen: lave bånd helt i toppen, før første høje (ikon/widget) */
  let y0 = 0;
  for (const band of bands) {
    if (band.a > 0.08 * h || band.b - band.a >= 0.05 * h) break;
    y0 = band.b;
  }
  y0 = Math.min(h - 1, y0 + 1);

  /* Bunden: spring docken/søgefeltet over (ens på alle sider). Første bånd
     nedefra, der ændrer sig, er enten prikkerne eller nederste ikonrække. */
  let y1 = null;
  for (let i = bands.length - 1; i >= 0; i -= 1) {
    const band = bands[i];
    if (band.a < y0) break;
    if (band.vary <= band.content * 0.08) continue;
    if (band.b - band.a < 0.025 * h && looksLikeDots(union, w, band)) {
      const above = bands[i - 1];
      y1 = above && above.b > y0 ? Math.round((above.b + band.a) / 2) : band.a - 2;
    } else {
      const below = bands[i + 1];
      y1 = below ? Math.round((band.b + below.a) / 2) : Math.min(h, band.b + 2);
    }
    break;
  }
  if (y1 === null || y1 - y0 < h * 0.3) {
    throw new Error("Kunne ikke finde ikonerne. Er det tre forskellige sider af hjemmeskærmen?");
  }

  /* 4. Ikoner → gitter */
  const icons = masks.map((mask, page) =>
    findIcons(mask, w, y0, y1, w * 0.1, w * 0.3).map((icon) => ({ ...icon, page })),
  );
  const all = icons.flat();
  if (all.length < 4) throw new Error("Fandt for få app-ikoner. Har siderne apps (ikke kun widgets)?");
  const sizes = all.map((i) => i.size).sort((a, b) => a - b);
  const size = sizes[sizes.length >> 1];
  const good = all.filter((i) => Math.abs(i.size - size) <= size * 0.15);

  /* Kolonner: iPhone har altid 4, symmetrisk om midten */
  const colGroups = clusterValues(good.map((i) => i.x - w / 2), size / 3);
  let best = null;
  for (let d = size * 1.02; d <= size * 2; d += 0.25) {
    if (1.5 * d + size / 2 > w / 2) break;
    let err = 0;
    for (const g of colGroups) {
      const k = Math.max(0, Math.min(3, Math.round(g.at / d + 1.5)));
      err += g.n * (g.at - (k - 1.5) * d) ** 2;
    }
    if (!best || err < best.err - 1e-6) best = { err, d };
  }
  const colStep = best.d;

  /* Rækker: fast afstand; find afstand og forskydning der passer bedst */
  const rowGroups = clusterValues(good.map((i) => i.y), size / 3);
  let bestRow = null;
  for (let p = size * 1.02; p <= size * 2.2; p += 0.25) {
    const first = rowGroups[0].at;
    let err = 0;
    for (const g of rowGroups) {
      const k = Math.round((g.at - first) / p);
      err += g.n * (g.at - first - k * p) ** 2;
    }
    if (!bestRow || err < bestRow.err - 1e-6) bestRow = { err, p };
  }
  const rowStep = rowGroups.length > 1 ? bestRow.p : size * 1.24;
  /* Gennemsnitlig forskydning ud fra alle grupper */
  const firstGroup = rowGroups[0].at;
  let offset = 0;
  let weight = 0;
  for (const g of rowGroups) {
    const k = Math.round((g.at - firstGroup) / rowStep);
    offset += g.n * (g.at - k * rowStep);
    weight += g.n;
  }
  let firstCenter = offset / weight;
  while (firstCenter - rowStep - size / 2 >= y0) firstCenter -= rowStep;
  const rowCenters = [];
  for (let c = firstCenter; c + size / 2 <= y1 + 1; c += rowStep) rowCenters.push(c);
  if (rowCenters.length < 4) throw new Error("Fandt for få ikonrækker til cifrene.");
  const colCenters = [0, 1, 2, 3].map((k) => w / 2 + (k - 1.5) * colStep);

  /* Hvilke felter har et ikon (bruges til tryk-effekten) */
  const occupied = [0, 1, 2].map((page) =>
    rowCenters.map((cy) =>
      colCenters
        .map((cx) =>
          icons[page].some((i) => Math.abs(i.x - cx) < size * 0.3 && Math.abs(i.y - cy) < size * 0.3) ? "1" : "0",
        )
        .join(""),
    ),
  );

  if (Math.abs(H / W - window.screen.height / window.screen.width) > 0.03 && window.screen.width < window.screen.height) {
    warnings.push("Screenshots ser ud til at være fra en anden iPhone end denne. Tag dem på den telefon, du optræder med.");
  }

  const k = 1 / scale;
  return {
    geo: {
      W,
      H,
      bg: toHex(bg),
      pagesTop: Math.round(y0 * k),
      pagesH: Math.round((y1 - y0) * k),
      dotsTop: Math.round(y1 * k),
      dotsH: H - Math.round(y1 * k),
      icon: Math.round(size * k),
      cols: colCenters.map((c) => Math.round((c - size / 2) * k)),
      rows: rowCenters.map((c) => Math.round((c - size / 2) * k)),
      occupied,
      notes: null,
    },
    warnings,
  };
}

/* ---- opsætningsskærm ---- */

const homeSetup = document.querySelector("#homeSetup");
const hsSlots = [...document.querySelectorAll(".hs-slot")];
const hsStatus = document.querySelector("#hsStatus");
const hsResult = document.querySelector("#hsResult");
const hsSave = document.querySelector("#hsSave");
const hsPreview1 = document.querySelector("#hsPreview1");
const hsPreview3 = document.querySelector("#hsPreview3");
const hsWall = document.querySelector("#hsWall");
const WALL_COLORS = ["#000000", "#1c1c1e", "#0b1a33", "#10261b", "#2a0c14", "#1f1033"];

let setupImages = [null, null, null];
let setupResult = null;
let wallColor = "#000000";

function openHomeSetup() {
  closeSettings();
  homeSetup.classList.add("open");
  homeSetup.setAttribute("aria-hidden", "false");
  document.querySelector("#hsDelete").hidden = !customHome;
  renderSetup();
}

function closeHomeSetup() {
  homeSetup.classList.remove("open");
  homeSetup.setAttribute("aria-hidden", "true");
  openSettings();
}

function renderSetup() {
  hsSlots.forEach((slot, i) => {
    const img = slot.querySelector("img");
    const has = Boolean(setupImages[i]);
    slot.classList.toggle("filled", has);
    if (has && img.src !== setupImages[i].src) img.src = setupImages[i].src;
  });
  hsResult.hidden = !setupResult;
  hsSave.disabled = !(setupResult && !setupResult.error && setupResult.geo.notes);
  if (!setupResult) return;
  if (setupResult.error) {
    hsStatus.className = "hs-text error";
    hsStatus.textContent = setupResult.error;
    hsPreview1.parentElement.parentElement.hidden = true;
    return;
  }
  hsPreview1.parentElement.parentElement.hidden = false;
  const { geo, warnings } = setupResult;
  const lines = [`Baggrund ${geo.bg.toUpperCase()} · ${geo.rows.length} rækker × 4 kolonner fundet.`, ...warnings];
  lines.push(geo.notes ? "Noter er valgt. Tryk på Gem." : "Tryk på Noter-ikonet på side 3.");
  hsStatus.className = warnings.length ? "hs-text warn" : "hs-text";
  hsStatus.textContent = lines.join(" ");
  drawSetupPreview(hsPreview1, 0);
  drawSetupPreview(hsPreview3, 2);
}

function drawSetupPreview(canvas, page) {
  const { geo } = setupResult;
  const img = setupImages[page];
  const cssWidth = canvas.clientWidth || 140;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round((cssWidth * geo.H * ratio) / geo.W);
  const ctx = canvas.getContext("2d");
  const k = canvas.width / geo.W;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.lineWidth = Math.max(1, 1.5 * ratio);
  geo.rows.forEach((top, row) =>
    geo.cols.forEach((left, col) => {
      const x = left * k;
      const y = top * k;
      const s = geo.icon * k;
      const isNotes = page === 2 && geo.notes && geo.notes.row === row && geo.notes.col === col;
      if (page === 0) {
        const digit = digitForGeo(geo, row, col);
        if (digit === undefined) return;
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(x, y, s, s);
        ctx.fillStyle = "#ffd60a";
        ctx.font = `700 ${Math.round(s * 0.6)}px -apple-system, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(digit), x + s / 2, y + s / 2);
      } else {
        ctx.strokeStyle = isNotes ? "#ffd60a" : "rgba(255,255,255,0.35)";
        ctx.lineWidth = (isNotes ? 3 : 1) * ratio;
        ctx.strokeRect(x, y, s, s);
      }
    }),
  );
  /* Grænsen mellem glidende ikoner og prikker/dock */
  ctx.strokeStyle = "rgba(255,214,10,0.7)";
  ctx.setLineDash([4 * ratio, 4 * ratio]);
  ctx.lineWidth = ratio;
  ctx.beginPath();
  ctx.moveTo(0, geo.dotsTop * k);
  ctx.lineTo(canvas.width, geo.dotsTop * k);
  ctx.stroke();
  ctx.setLineDash([]);
}

function digitForGeo(geo, row, col) {
  const saved = homeGeo;
  homeGeo = geo;
  const digit = digitAt({ row, col });
  homeGeo = saved;
  return digit;
}

async function pickSetupImage(index, file) {
  if (!file) return;
  try {
    setupImages[index] = await loadImageFile(file);
  } catch (error) {
    setupResult = { error: error.message };
    renderSetup();
    return;
  }
  setupResult = null;
  if (setupImages.every(Boolean)) {
    hsStatus.textContent = "Måler…";
    window.setTimeout(() => {
      try {
        setupResult = analyzeHomeScreens(setupImages);
      } catch (error) {
        setupResult = { error: error.message };
      }
      renderSetup();
    }, 30);
  }
  renderSetup();
}

function tapSetupPreview(event) {
  if (!setupResult || setupResult.error) return;
  const { geo } = setupResult;
  const rect = hsPreview3.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * geo.W;
  const y = ((event.clientY - rect.top) / rect.height) * geo.H;
  const col = geo.cols.findIndex((left) => x >= left - geo.icon * 0.15 && x <= left + geo.icon * 1.15);
  const row = geo.rows.findIndex((top) => y >= top - geo.icon * 0.15 && y <= top + geo.icon * 1.15);
  if (col < 0 || row < 0) return;
  geo.notes = { page: 2, row, col };
  renderSetup();
}

function canvasBlob(canvas) {
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Kunne ikke gemme billedet"))), "image/png"),
  );
}

async function blobFile(canvas) {
  const blob = await canvasBlob(canvas);
  return { type: blob.type, buf: await blob.arrayBuffer() };
}

async function saveCustomHome() {
  if (!setupResult?.geo?.notes) return;
  hsSave.disabled = true;
  hsSave.textContent = "Gemmer…";
  const { geo } = setupResult;
  try {
    const pages = [];
    const bottoms = [];
    for (const img of setupImages) {
      pages.push(await blobFile(drawToCanvas(img, geo.W, geo.pagesH, 0, geo.pagesTop, geo.W, geo.pagesH)));
      bottoms.push(await blobFile(drawToCanvas(img, geo.W, geo.dotsH, 0, geo.dotsTop, geo.W, geo.dotsH)));
    }
    const notesImg = setupImages[2];
    const noter = await blobFile(
      drawToCanvas(notesImg, geo.icon, geo.icon, geo.cols[geo.notes.col], geo.rows[geo.notes.row], geo.icon, geo.icon),
    );
    const record = { geo, files: { pages, bottoms, noter }, savedAt: Date.now() };
    await homeDb("readwrite", (store) => store.put(record, "custom"));
    customHome = recordToGeo(record);
    state.homeMode = "custom";
    saveState();
    syncHomeGeo();
    setupImages = [null, null, null];
    setupResult = null;
    hsSave.textContent = "Gem og brug";
    closeHomeSetup();
  } catch (error) {
    hsSave.textContent = "Gem og brug";
    setupResult = { error: `Kunne ikke gemme: ${error.message}` };
    renderSetup();
  }
}

async function deleteCustomHome() {
  try {
    await homeDb("readwrite", (store) => store.delete("custom"));
  } catch {
    /* intet at slette */
  }
  customHome = null;
  state.homeMode = "default";
  saveState();
  syncHomeGeo();
  closeHomeSetup();
}

/* ---- ensfarvet baggrundsbillede til telefonen ---- */

function renderWallSwatches() {
  const holder = document.querySelector("#hsSwatches");
  holder.innerHTML = WALL_COLORS.map(
    (color) =>
      `<button type="button" class="hs-swatch${color === wallColor ? " on" : ""}" data-color="${color}" style="background:${color}" aria-label="${color}"></button>`,
  ).join("");
  const input = document.querySelector("#hsColor");
  input.value = wallColor;
  input.parentElement.classList.toggle("on", !WALL_COLORS.includes(wallColor));
}

function wallpaperCanvas() {
  const ratio = window.devicePixelRatio || 1;
  let width = Math.round(window.screen.width * ratio);
  let height = Math.round(window.screen.height * ratio);
  if (width > height) [width, height] = [height, width];
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = wallColor;
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

function showWallpaper() {
  const canvas = wallpaperCanvas();
  document.querySelector("#hsWallImg").src = canvas.toDataURL("image/png");
  hsWall.classList.add("open");
}

async function shareWallpaper() {
  const blob = await canvasBlob(wallpaperCanvas());
  const file = new File([blob], "baggrund.png", { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
    } catch {
      /* annulleret */
    }
    return;
  }
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "baggrund.png";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 4000);
}

function registerHomeSetupEvents() {
  document.querySelector("#openHomeSetup").addEventListener("click", openHomeSetup);
  document.querySelector("#hsClose").addEventListener("click", closeHomeSetup);
  hsSlots.forEach((slot, i) => {
    slot.querySelector("input").addEventListener("change", (event) => {
      pickSetupImage(i, event.target.files[0]);
      event.target.value = "";
    });
  });
  hsPreview3.addEventListener("click", tapSetupPreview);
  hsSave.addEventListener("click", saveCustomHome);
  document.querySelector("#hsDelete").addEventListener("click", deleteCustomHome);
  document.querySelector("#hsSwatches").addEventListener("click", (event) => {
    const button = event.target.closest("[data-color]");
    if (!button) return;
    wallColor = button.dataset.color;
    renderWallSwatches();
  });
  document.querySelector("#hsColor").addEventListener("input", (event) => {
    wallColor = event.target.value;
    renderWallSwatches();
  });
  document.querySelector("#hsMakeWallpaper").addEventListener("click", showWallpaper);
  document.querySelector("#hsWallShare").addEventListener("click", shareWallpaper);
  document.querySelector("#hsWallDone").addEventListener("click", () => hsWall.classList.remove("open"));
  renderWallSwatches();
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

  categorySelect.addEventListener("change", () => {
    /* Et ord fra en anden pulje nulstilles; et helt eget ord bevares */
    const typed = predictionInput.value.trim().toLocaleLowerCase("da");
    const fromPool = Object.values(pools).some((pool) =>
      pool.items.some((item) => item.toLocaleLowerCase("da") === typed),
    );
    if (fromPool) predictionInput.value = "";
    syncPredictionSelect();
  });
  predictionInput.addEventListener("input", () => updatePredictionSuggest());
  predictionInput.addEventListener("focus", () => {
    predictionInput.select();
    updatePredictionSuggest();
  });
  predictionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") predictionInput.blur();
  });
  predictionInput.addEventListener("blur", () => {
    /* vent, så et tryk på et forslag når at blive registreret */
    setTimeout(() => updatePredictionSuggest(false), 150);
  });
  predictionSuggest.addEventListener("pointerdown", (event) => event.preventDefault());
  predictionSuggest.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-word]");
    if (!button) return;
    predictionInput.value = button.dataset.word;
    predictionInput.blur();
    updatePredictionSuggest(false);
  });
  scrim.addEventListener("click", () => {
    /* Det tryk, der åbnede arket, må ikke lukke det igen via sit eget click */
    if (Date.now() - settingsOpenedAt > 400) closeSettings();
  });
  const applySettings = () => {
    state.category = categorySelect.value;
    state.prediction = resolvePrediction(predictionInput.value);
    state.inputMethod = document.querySelector("input[name='inputMethod']:checked")?.value || "longpress";
    state.homeMode = homeModeSelect.value === "custom" && customHome ? "custom" : "default";
    syncHomeGeo();
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
registerHomeSetupEvents();
syncHomeGeo();
loadCustomHome();
renderAll();
window.setTimeout(() => app.classList.remove("no-anim"), 60);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
