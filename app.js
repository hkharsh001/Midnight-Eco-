const API="data.json";
let allData=[],saved=JSON.parse(localStorage.getItem("saved"))||[];

function qs(s){return document.querySelector(s)}
function qsa(s){return document.querySelectorAll(s)}

async function load(){
  const res=await fetch(API);
  allData=await res.json();
  route();
}
load();

/* router */
function route(){
  if(qs("#grid")) initHome();
  if(qs("#mainImage")) initWallpaper();
  if(qs("#savedGrid")) initSaved();
}

/* HOME */
let visible=0,limit=12,current=[];

function initHome(){
  startFeed(allData);

  qsa(".cat").forEach(c=>{
    c.onclick=()=>{
      qs(".cat.active")?.classList.remove("active");
      c.classList.add("active");
      const v=c.innerText.toLowerCase();
      const f=v==="all"?allData:allData.filter(x=>x.tags?.includes(v));
      startFeed(f);
    };
  });

  const input=qs(".search-box input");
  let t;
  input?.addEventListener("input",e=>{
    clearTimeout(t);
    t=setTimeout(()=>{
      const v=e.target.value.toLowerCase();
      startFeed(allData.filter(x=>x.tags?.includes(v)));
    },150);
  });
}

function startFeed(data){
  const g=qs("#grid"); if(!g)return;
  g.innerHTML=""; current=data; visible=0;
  next();
}

function next(){
  const g=qs("#grid"); if(!g)return;
  current.slice(visible,visible+limit).forEach(item=>{
    const d=document.createElement("div"); d.className="item";
    d.innerHTML=`
      <a href="wallpaper.html?id=${item.id}">
        <img src="${item.image}" loading="lazy">
      </a>
      <button class="save-btn" data-id="${item.id}">🤍</button>`;
    g.appendChild(d);
  });
  visible+=limit; updateSave();
}

window.onscroll=()=>{
  if(innerHeight+scrollY>=document.body.offsetHeight-200) next();
};

/* WALLPAPER */
function initWallpaper(){
  const id=new URLSearchParams(location.search).get("id");
  const item=allData.find(x=>x.id===id)||allData[0];

  qs("#mainImage").src=item.image;
  qs("#mobileBtn").href=item.mobile||item.image;
  qs("#desktopBtn").href=item.desktop||item.image;

  const tag=qs("#tags"); tag.innerHTML="";
  item.tags?.split(",").forEach(t=>{
    const s=document.createElement("span"); s.innerText=t; tag.appendChild(s);
  });

  const rel=allData.filter(w=>w.id!==item.id &&
    w.tags?.split(",").some(t=>item.tags?.includes(t)));
  const show=rel.length?rel:allData.slice(0,6);

  const grid=qs("#relatedGrid"); grid.innerHTML="";
  show.forEach(w=>{
    const d=document.createElement("div"); d.className="item";
    d.innerHTML=`<a href="wallpaper.html?id=${w.id}">
      <img src="${w.image}">
    </a>`;
    grid.appendChild(d);
  });
}

/* SAVED */
function initSaved(){
  const g=qs("#savedGrid"); g.innerHTML="";
  allData.filter(x=>saved.includes(x.id)).forEach(item=>{
    const d=document.createElement("div"); d.className="item";
    d.innerHTML=`<a href="wallpaper.html?id=${item.id}">
      <img src="${item.image}">
    </a>`;
    g.appendChild(d);
  });
}

/* SAVE */
document.addEventListener("click",e=>{
  if(e.target.classList.contains("save-btn")){
    const id=e.target.dataset.id;
    saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
    localStorage.setItem("saved",JSON.stringify(saved));
    updateSave();
  }
});

function updateSave(){
  qsa(".save-btn").forEach(b=>{
    b.classList.toggle("active",saved.includes(b.dataset.id));
  });
}

/* SEARCH TOGGLE */
qs("#openSearch")?.onclick=()=>{
  qs("#searchBox").classList.add("active");
  qs("#logo")?.classList.add("hide");
  qs("#icons")?.classList.add("hide");
};
qs("#closeSearch")?.onclick=()=>{
  qs("#searchBox").classList.remove("active");
  qs("#logo")?.classList.remove("hide");
  qs("#icons")?.classList.remove("hide");
};
