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
};

let state = loadState();
let tapTimes = [];
let padValue = "";
let pressTimer = null;

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
    inner = `<ol class="note-ol">${makeForcedList().map((item) => `<li>${esc(item)}</li>`).join("")}</ol>`;
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

document.querySelectorAll("[data-scroll]").forEach((scroller) => {
  scroller.addEventListener("scroll", () => syncScrolled(scroller), { passive: true });
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
  currentNumber.textContent = state.spectatorNumber;
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
  if (tapTimes.length >= 5) {
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
  scrim.addEventListener("click", closeSettings);
  document.querySelector("#saveSettings").addEventListener("click", () => {
    state.category = categorySelect.value;
    state.prediction = predictionSelect.value;
    state.inputMethod = document.querySelector("input[name='inputMethod']:checked")?.value || "longpress";
    saveState();
    closeSettings();
    renderAll();
  });

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
    const sync = () => {
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--kb", `${kb}px`);
    };
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    sync();
  }
}

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
