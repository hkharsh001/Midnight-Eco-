/* =========================
   GLOBAL STATE
========================= */
const API = "data.json";
let allData = [];
let saved = JSON.parse(localStorage.getItem("saved")) || [];

/* =========================
   HELPERS
========================= */
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }

function saveToStorage() {
  localStorage.setItem("saved", JSON.stringify(saved));
}

function toggleSave(id) {
  if (saved.includes(id)) {
    saved = saved.filter(x => x !== id);
  } else {
    saved.push(id);
  }
  saveToStorage();
  updateSaveButtons();
}

function updateSaveButtons() {
  qsa(".save-btn").forEach(btn => {
    const id = btn.dataset.id;
    if (saved.includes(id)) {
      btn.classList.add("active");
      btn.innerText = "💜";
    } else {
      btn.classList.remove("active");
      btn.innerText = "🤍";
    }
  });
}

/* =========================
   FETCH DATA
========================= */
async function loadData() {
  try {
    const res = await fetch(API);
    allData = await res.json();

    initPage(); // route logic

  } catch (err) {
    console.error("DATA ERROR:", err);
  }
}

/* =========================
   ROUTER (AUTO PAGE DETECT)
========================= */
function initPage() {
  if (qs("#grid")) initHome();
  if (qs("#mainImage")) initWallpaper();
  if (qs("#savedGrid")) initSaved();
}

/* =========================
   HOME PAGE
========================= */
function initHome() {
  renderGrid(allData);

  // CATEGORY FILTER
  qsa(".cat").forEach(cat => {
    cat.addEventListener("click", () => {
      qs(".cat.active")?.classList.remove("active");
      cat.classList.add("active");

      const value = cat.innerText.toLowerCase();

      if (value === "all") {
        renderGrid(allData);
      } else {
        const filtered = allData.filter(item =>
          item.tags && item.tags.toLowerCase().includes(value)
        );
        renderGrid(filtered);
      }
    });
  });

  // SEARCH
  const input = qs(".search-box input");
  input?.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allData.filter(item =>
      item.tags && item.tags.toLowerCase().includes(value)
    );

    renderGrid(filtered);
  });
}

/* =========================
   GRID RENDER
========================= */
function renderGrid(data) {
  const grid = qs("#grid");
  if (!grid) return;

  grid.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <a href="wallpaper.html?id=${item.id}">
        <img src="${item.image}" loading="lazy">
      </a>
      <button class="save-btn" data-id="${item.id}">🤍</button>
    `;

    grid.appendChild(div);
  });

  updateSaveButtons();
}

/* =========================
   WALLPAPER PAGE
========================= */
function initWallpaper() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const item = allData.find(w => w.id === id) || allData[0];

  // IMAGE
  qs("#mainImage").src = item.image;

  // DOWNLOAD
  qs("#mobileBtn").href = item.mobile || item.image;
  qs("#desktopBtn").href = item.desktop || item.image;

  // TAGS
  const tagBox = qs("#tags");
  tagBox.innerHTML = "";

  if (item.tags) {
    item.tags.split(",").forEach(tag => {
      const el = document.createElement("span");
      el.innerText = tag;
      tagBox.appendChild(el);
    });
  }

  // RELATED
  const relatedGrid = qs("#relatedGrid");
  relatedGrid.innerHTML = "";

  allData.forEach(w => {
    if (w.id !== item.id) {
      const div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <a href="wallpaper.html?id=${w.id}">
          <img src="${w.image}" loading="lazy">
        </a>
      `;

      relatedGrid.appendChild(div);
    }
  });
}

/* =========================
   SAVED PAGE
========================= */
function initSaved() {
  const grid = qs("#savedGrid");
  grid.innerHTML = "";

  const filtered = allData.filter(item => saved.includes(item.id));

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <a href="wallpaper.html?id=${item.id}">
        <img src="${item.image}">
      </a>
    `;

    grid.appendChild(div);
  });
}

/* =========================
   SAVE CLICK GLOBAL
========================= */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("save-btn")) {
    toggleSave(e.target.dataset.id);
  }
});

/* =========================
   NAV ACTIVE STATE
========================= */
qsa(".bottom-nav i").forEach(icon => {
  icon.addEventListener("click", () => {
    qs(".bottom-nav .active")?.classList.remove("active");
    icon.classList.add("active");
  });
});

/* =========================
   SEARCH TOGGLE
========================= */
const openSearch = qs("#openSearch");
const closeSearch = qs("#closeSearch");

const searchBox = qs("#searchBox");
const logo = qs("#logo");
const icons = qs("#icons");

openSearch?.addEventListener("click", () => {
  searchBox.classList.add("active");
  logo.classList.add("hide");
  icons.classList.add("hide");
});

closeSearch?.addEventListener("click", () => {
  searchBox.classList.remove("active");
  logo.classList.remove("hide");
  icons.classList.remove("hide");
});

/* ESC CLOSE */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchBox?.classList.remove("active");
    logo?.classList.remove("hide");
    icons?.classList.remove("hide");
  }
});

/* =========================
   INIT
========================= */
loadData();
