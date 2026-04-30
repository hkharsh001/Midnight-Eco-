const API = "https://docs.google.com/spreadsheets/d/1tEHA0c0PehL8hdgkoF01VJ3mqNuL6E6nux8ETjdEtKI/edit?usp=drivesdk";

let allData = [];
let visible = 0;
const LIMIT = 20;

async function fetchData() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    console.log("DATA:", data);

    allData = data;
    render();
  } catch (err) {
    console.error(err);
    document.getElementById("loader").innerText = "Failed to load data";
  }
}

function render() {
  const grid = document.getElementById("grid");

  const slice = allData.slice(visible, visible + LIMIT);

  slice.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <a href="wallpaper.html?id=${item.id}">
        <img src="${item.image}" loading="lazy">
      </a>
    `;

    grid.appendChild(div);
  });

  visible += LIMIT;

  if (visible >= allData.length) {
    document.getElementById("loader").innerText = "No more wallpapers";
  }
}

/* INFINITE SCROLL */
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    render();
  }
});

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = allData.filter(item =>
    (item.tags && item.tags.toLowerCase().includes(value)) ||
    (item.title && item.title.toLowerCase().includes(value))
  );

  document.getElementById("grid").innerHTML = "";
  visible = 0;
  allData = filtered;

  render();
});

fetchData();
