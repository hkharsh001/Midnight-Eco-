// ===== CATEGORY ACTIVE SWITCH =====
const categories = document.querySelectorAll(".cat");

categories.forEach(cat => {
  cat.addEventListener("click", () => {
    document.querySelector(".cat.active")?.classList.remove("active");
    cat.classList.add("active");
  });
});


// ===== BOTTOM NAV ACTIVE =====
const navItems = document.querySelectorAll(".bottom-nav button");

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".bottom-nav .active")?.classList.remove("active");
    btn.classList.add("active");
  });
});


// ===== SCROLL TO TOP BUTTON (if added later) =====
const scrollBtn = document.querySelector(".fab");

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// ===== SIMPLE SEARCH FILTER (STATIC VERSION) =====
const searchInput = document.querySelector(".search input");
const items = document.querySelectorAll(".item");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    items.forEach(item => {
      const alt = item.innerText.toLowerCase();

      if (alt.includes(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}


// ===== ITEM CLICK (PREP FOR NEXT PAGE) =====
const wallpaperItems = document.querySelectorAll(".item");

wallpaperItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    console.log("Clicked wallpaper:", index);

    // future:
    // window.location.href = `wallpaper.html?id=${index}`;
  });
});
