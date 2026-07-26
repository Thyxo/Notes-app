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

const fallbackState = {
  category: "animals",
  prediction: "Tiger",
  inputMethod: "longpress",
  spectatorNumber: 37,
  selectedNote: "prediction",
};

const storageKey = "liquidNotesPerformerState";
let state = loadState();
let tapTimes = [];
let lastSecretTap = 0;
let padValue = "";
let pressTimer = null;

const app = document.querySelector("#app");
const folderList = document.querySelector("#folderList");
const noteList = document.querySelector("#noteList");
const notePage = document.querySelector("#notePage");
const noteSearch = document.querySelector("#noteSearch");
const settingsSheet = document.querySelector("#settingsSheet");
const categorySelect = document.querySelector("#categorySelect");
const predictionSelect = document.querySelector("#predictionSelect");
const numberPad = document.querySelector("#numberPad");
const padGrid = document.querySelector("#padGrid");
const padDisplay = document.querySelector("#padDisplay");

const folders = [
  ["all", "Alle noter", 6],
  ["shared", "Delt", 1],
  ["recent", "Senest slettet", 0],
  ["icloud", "iCloud", 6],
];

function loadState() {
  try {
    return { ...fallbackState, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return { ...fallbackState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getCategory() {
  return pools[state.category] || pools.animals;
}

function editedStamp(kind = "old") {
  return kind === "list" ? "Redigeret 19. juli 2026 kl. 20.46" : "Redigeret 19. juli 2026 kl. 20.43";
}

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
  const candidates = category.items.filter((item) => item !== prediction);
  const rand = random(seedFrom(`${state.category}:${prediction}:${number}`));
  const shuffled = [...candidates].sort(() => rand() - 0.5).slice(0, 99);
  shuffled.splice(number - 1, 0, prediction);
  return shuffled.slice(0, 100);
}

function getNotes() {
  const category = getCategory();
  return [
    {
      id: "prediction",
      title: "Forudsigelse",
      date: "19/7/2026",
      preview: `Jeg har skrevet et enkelt navn ned: ${state.prediction}.`,
      group: "pinned",
    },
    {
      id: "hundred",
      title: category.title,
      date: "19/7/2026",
      preview: `En rolig liste med 100 ${category.label}, gemt i noter.`,
      group: "pinned",
    },
    {
      id: "packing",
      title: "Huskeliste",
      date: "18/7/2026",
      preview: "Kaffe, oplader, kortmappe, sort tusch og ekstra elastikker.",
      group: "pinned",
    },
    {
      id: "ideas",
      title: "Ideer til magi",
      date: "16/7/2026",
      preview: "Lav overgangen kortere. Publikum skal se noten foerst.",
      group: "pinned",
    },
    {
      id: "timing",
      title: "App ide",
      date: "00.32",
      preview: "Magi app",
      group: "today",
    },
    {
      id: "quotes",
      title: "Cykel arbejdsdage",
      date: "lørdag",
      preview: "9 Torsdag aften",
      group: "week",
    },
    {
      id: "relationship",
      title: "Min kæreste og jeg har et problem",
      date: "fredag",
      preview: "Hun har nogle ting som hun gentage...",
      group: "week",
    },
  ];
}

function renderFolders() {
  folderList.innerHTML = folders
    .map(([id, label, count]) => `
      <button class="folder-row ${id === "all" ? "active" : ""}" type="button">
        <span class="folder-glyph" aria-hidden="true"></span>
        <span>${label}</span>
        <span class="folder-count">${count}</span>
      </button>
    `)
    .join("");
}

function renderNotes() {
  const groups = [
    ["pinned", "Fastgjort"],
    ["today", "I dag"],
    ["week", "Sidste 7 dage"],
  ];
  const notes = getNotes();
  noteList.innerHTML = groups
    .map(([id, label]) => {
      const groupNotes = notes.filter((note) => note.group === id);
      if (!groupNotes.length) return "";
      return `
        <section class="note-section" data-section="${id}">
          <h2>${label}</h2>
          <div class="note-group-card">
            ${groupNotes
              .map((note) => `
                <button class="note-row ${note.id === state.selectedNote ? "active" : ""}" type="button" data-note="${note.id}">
                  <h3>${note.title}</h3>
                  <div class="note-row-meta"><span>${note.date}</span><span>${note.preview}</span></div>
                </button>
              `)
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderNotePage() {
  const noteId = state.selectedNote;
  notePage.classList.add("swap");
  window.setTimeout(() => {
    if (noteId === "prediction") {
      notePage.innerHTML = `
        <div class="edited">${editedStamp()}</div>
        <h2>Forudsigelse</h2>
        <p>Jeg har besluttet mig for et eneste navn, inden noget tal bliver valgt.</p>
        <span class="prediction-word">${state.prediction}</span>
      `;
    } else if (noteId === "hundred") {
      const list = makeForcedList();
      notePage.innerHTML = `
        <div class="edited">${editedStamp("list")}</div>
        <h2>${getCategory().title}</h2>
        <ol class="numbered-list">
          ${list.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      `;
    } else {
      const note = getNotes().find((item) => item.id === noteId);
      notePage.innerHTML = `
        <div class="edited">Redigeret 18. juli 2026 kl. 17.12</div>
        <h2>${note.title}</h2>
        <p>${note.preview}</p>
      `;
    }
    notePage.classList.remove("swap");
    hideEditedTimestamp();
  }, 120);
}

function hideEditedTimestamp() {
  const edited = notePage.querySelector(".edited");
  if (!edited) return;
  requestAnimationFrame(() => {
    notePage.scrollTop = edited.offsetHeight + 24;
  });
}

function renderSettingsOptions() {
  categorySelect.innerHTML = Object.entries(pools)
    .map(([id, category]) => `<option value="${id}">${capitalize(category.label)}</option>`)
    .join("");
  categorySelect.value = state.category;
  syncPredictionSelect();
  document.querySelectorAll("input[name='inputMethod']").forEach((radio) => {
    radio.checked = radio.value === state.inputMethod;
  });
}

function syncPredictionSelect() {
  const category = pools[categorySelect.value] || getCategory();
  predictionSelect.innerHTML = category.items.map((item) => `<option value="${item}">${item}</option>`).join("");
  predictionSelect.value = category.items.includes(state.prediction) ? state.prediction : category.items[0];
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function openSettings() {
  renderSettingsOptions();
  settingsSheet.classList.add("open");
  settingsSheet.setAttribute("aria-hidden", "false");
}

function closeSettings() {
  settingsSheet.classList.remove("open");
  settingsSheet.setAttribute("aria-hidden", "true");
}

function openPad() {
  if (state.inputMethod !== "longpress") return;
  padValue = "";
  updatePadDisplay();
  numberPad.classList.add("open");
  numberPad.setAttribute("aria-hidden", "false");
}

function closePad(save = false) {
  if (save && padValue) {
    const number = Math.max(1, Math.min(100, Number(padValue)));
    state.spectatorNumber = number;
    saveState();
    renderNotes();
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
    button.addEventListener("click", () => {
      if (key === "Slet") padValue = padValue.slice(0, -1);
      else if (key === "OK") closePad(true);
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
    window.setTimeout(() => {
      noteSearch.value = "";
    }, 180);
  }
}

function handleSecretTap() {
  const now = Date.now();
  if (now - lastSecretTap < 120) return;
  lastSecretTap = now;
  tapTimes = [...tapTimes.filter((time) => now - time < 4000), now];
  if (tapTimes.length >= 5) {
    tapTimes = [];
    openSettings();
  }
}

function registerEvents() {
  document.querySelectorAll("#secretTapZone, .topbar, .editor-toolbar").forEach((zone) => {
    zone.addEventListener("pointerup", handleSecretTap);
    zone.addEventListener("click", handleSecretTap);
  });

  categorySelect.addEventListener("change", syncPredictionSelect);
  document.querySelector("#closeSettings").addEventListener("click", closeSettings);
  document.querySelector("#saveSettings").addEventListener("click", () => {
    state.category = categorySelect.value;
    state.prediction = predictionSelect.value;
    state.inputMethod = document.querySelector("input[name='inputMethod']:checked")?.value || "longpress";
    saveState();
    closeSettings();
    renderAll();
  });

  noteList.addEventListener("click", (event) => {
    const row = event.target.closest("[data-note]");
    if (!row) return;
    state.selectedNote = row.dataset.note;
    saveState();
    renderNotes();
    renderNotePage();
    app.classList.add("show-editor");
    app.classList.remove("show-folders");
  });

  document.querySelector("#backToNotes").addEventListener("click", () => {
    app.classList.remove("show-editor");
  });
  document.querySelector("#backToFolders").addEventListener("click", () => {
    app.classList.toggle("show-folders");
  });
  document.querySelector("#newNoteButton").addEventListener("click", () => {
    state.selectedNote = "prediction";
    saveState();
    renderAll();
  });

  noteSearch.addEventListener("input", secretSearchInput);
  noteSearch.addEventListener("keydown", (event) => {
    if (state.inputMethod === "search" && event.key === "Enter") noteSearch.blur();
  });

  const hotspot = document.querySelector("#hotspot");
  hotspot.addEventListener("pointerdown", () => {
    pressTimer = window.setTimeout(openPad, 2000);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
    hotspot.addEventListener(type, () => window.clearTimeout(pressTimer));
  });
  document.querySelector("#padDone").addEventListener("click", () => closePad(true));
}

function renderAll() {
  renderFolders();
  renderNotes();
  renderNotePage();
}

buildPad();
registerEvents();
renderAll();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
