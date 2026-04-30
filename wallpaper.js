const API = "data.json";

// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadWallpaper() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const item = data.find(w => w.id === id) || data[0];

    // MAIN IMAGE
    document.getElementById("mainImage").src = item.image;

    // DOWNLOAD LINKS
    document.getElementById("mobileBtn").href = item.mobile || item.image;
    document.getElementById("desktopBtn").href = item.desktop || item.image;

    // TAGS
    const tagBox = document.getElementById("tags");
    tagBox.innerHTML = "";

    if (item.tags) {
      item.tags.split(",").forEach(tag => {
        const el = document.createElement("span");
        el.innerText = tag;
        tagBox.appendChild(el);
      });
    }

    // RELATED WALLPAPERS
    const relatedGrid = document.getElementById("relatedGrid");
    relatedGrid.innerHTML = "";

    data.forEach(w => {
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

    lucide.createIcons();

  } catch (err) {
    console.error("Error loading wallpaper:", err);
  }
}

loadWallpaper();
