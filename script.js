// ===== LOAD WALLPAPERS =====
const grid = document.getElementById("grid");

const wallpapers = [
  "https://picsum.photos/400/600?1",
  "https://picsum.photos/400/500?2",
  "https://picsum.photos/400/700?3",
  "https://picsum.photos/400/550?4",
  "https://picsum.photos/400/650?5",
  "https://picsum.photos/400/520?6",
  "https://picsum.photos/400/620?7",
  "https://picsum.photos/400/580?8"
];

wallpapers.forEach((src, index) => {
  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <a href="wallpaper.html?id=${index + 1}">
      <img src="${src}">
    </a>
  `;

  grid.appendChild(div);
});


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

openSearch.addEventListener("click", () => {
  searchBox.classList.add("active");
  logo.classList.add("hide");
  icons.classList.add("hide");
});

closeSearch.addEventListener("click", () => {
  searchBox.classList.remove("active");
  logo.classList.remove("hide");
  icons.classList.remove("hide");
});


// ===== OPTIONAL: CLOSE SEARCH ON ESC =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchBox.classList.remove("active");
    logo.classList.remove("hide");
    icons.classList.remove("hide");
  }
});


// ===== RE-INIT ICONS (IMPORTANT) =====
lucide.createIcons();
