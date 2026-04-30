const grid = document.getElementById("grid");

const API = "data.json";

async function loadWallpapers() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    grid.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <a href="wallpaper.html?id=${item.id}">
          <img src="${item.image}" loading="lazy">
        </a>
      `;

      grid.appendChild(div);
    });

    lucide.createIcons();

  } catch (err) {
    console.error("Error loading data:", err);
  }
}

loadWallpapers();


// ===== CATEGORY ACTIVE =====
document.querySelectorAll(".cat").forEach(cat => {
  cat.addEventListener("click", () => {
    document.querySelector(".cat.active")?.classList.remove("active");
    cat.classList.add("active");
  });
});


// ===== BOTTOM NAV ACTIVE =====
document.querySelectorAll(".bottom-nav i").forEach(icon => {
  icon.addEventListener("click", () => {
    document.querySelector(".bottom-nav .active")?.classList.remove("active");
    icon.classList.add("active");
  });
});


// ===== SEARCH TOGGLE =====
const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");

const searchBox = document.getElementById("searchBox");
const logo = document.getElementById("logo");
const icons = document.getElementById("icons");

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


// ===== ESC CLOSE SEARCH =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchBox.classList.remove("active");
    logo.classList.remove("hide");
    icons.classList.remove("hide");
  }
});
