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

function loadWallpapers() {
  wallpapers.forEach((src, index) => {
    const div = document.createElement("div");
    div.className = "item";

    // 🔥 IMPORTANT CHANGE (LINK ADDED)
    div.innerHTML = `
      <a href="wallpaper.html?id=${index + 1}">
        <img src="${src}">
      </a>
    `;

    grid.appendChild(div);
  });
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
