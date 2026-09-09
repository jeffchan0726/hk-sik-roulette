/* HK Eat Wheel - Hong Kong 18 districts only */
(function () {
  const DISTRICTS = [
    { id: "central-western", zh: "中西區", en: "Central and Western", region: "hk", lat: 22.2816, lng: 114.1582 },
    { id: "wan-chai", zh: "灣仔區", en: "Wan Chai", region: "hk", lat: 22.277, lng: 114.1733 },
    { id: "eastern", zh: "東區", en: "Eastern", region: "hk", lat: 22.284, lng: 114.224 },
    { id: "southern", zh: "南區", en: "Southern", region: "hk", lat: 22.247, lng: 114.165 },
    { id: "yau-tsim-mong", zh: "油尖旺區", en: "Yau Tsim Mong", region: "kln", lat: 22.3193, lng: 114.1694 },
    { id: "sham-shui-po", zh: "深水埙區", en: "Sham Shui Po", region: "kln", lat: 22.3308, lng: 114.1625 },
    { id: "kowloon-city", zh: "九龍城區", en: "Kowloon City", region: "kln", lat: 22.3282, lng: 114.191 },
    { id: "wong-tai-sin", zh: "黃大仙區", en: "Wong Tai Sin", region: "kln", lat: 22.342, lng: 114.193 },
    { id: "kwun-tong", zh: "觀塘區", en: "Kwun Tong", region: "kln", lat: 22.313, lng: 114.225 },
    { id: "kwai-tsing", zh: "葵青區", en: "Kwai Tsing", region: "nt", lat: 22.357, lng: 114.1276 },
    { id: "tsuen-wan", zh: "荃灣區", en: "Tsuen Wan", region: "nt", lat: 22.3707, lng: 114.1146 },
    { id: "tuen-mun", zh: "屯門區", en: "Tuen Mun", region: "nt", lat: 22.391, lng: 113.976 },
    { id: "yuen-long", zh: "元朗區", en: "Yuen Long", region: "nt", lat: 22.4445, lng: 114.0222 },
    { id: "north", zh: "北區", en: "North", region: "nt", lat: 22.494, lng: 114.138 },
    { id: "tai-po", zh: "大埔區", en: "Tai Po", region: "nt", lat: 22.4508, lng: 114.1694 },
    { id: "sha-tin", zh: "沙田區", en: "Sha Tin", region: "nt", lat: 22.3825, lng: 114.188 },
    { id: "sai-kung", zh: "西貢區", en: "Sai Kung", region: "nt", lat: 22.3818, lng: 114.2715 },
    { id: "islands", zh: "離島區", en: "Islands", region: "nt", lat: 22.2895, lng: 113.9416 }
  ];
  const CATEGORIES = [
    { zh: "港式茶餐廳／冰室", en: "Cha Chaan Teng", subs: ["常餐", "早餐", "下午茶", "撈麵", "豬扒包", "凍奶茶"] },
    { zh: "中式／粵菜", en: "Chinese / Cantonese", subs: ["點心飲茶", "燒味", "粥粉麵", "潮州", "客家", "上海", "川菜"] },
    { zh: "火鍋／燙烤", en: "Hotpot / BBQ", subs: ["火鍋", "韓燙", "日式燒肉", "串燙"] },
    { zh: "日韓台", en: "JP / KR / TW", subs: ["壽司刺身", "拉麵", "丼", "韓式", "台式"] },
    { zh: "東南亞", en: "Southeast Asian", subs: ["越南粉", "泰國菜", "馬來", "新加坡"] },
    { zh: "西式／意粉薄餅", en: "Western", subs: ["漢堡", "扒房", "意大利", "咖啡簡餐"] },
    { zh: "街頭小食", en: "Street snacks", subs: ["魚蛋車仔麵", "鵝蛋仔", "碗仔鿃", "格仔餅", "腸粉"] },
    { zh: "甜品糖水飲品", en: "Dessert / drinks", subs: ["糖水", "豆腐花", "芋圓", "咖啡茶飲"] }
  ];
  const BUDGETS = ["$", "$$", "$$$", "唔限"];
  const COLORS = ["#ffc857", "#ff6b6b", "#3ef0ff", "#c3f584", "#ff9f43", "#e056fd", "#7bed9f", "#feca57"];
  const HK = { minLat: 22.13, maxLat: 22.57, minLng: 113.82, maxLng: 114.44 };
  const I18N = {
    zh: { title: "香港搜食輪盤", tagline: "專為香港 18 區而設 · 轉完即刻開飯", geo: "用我而家位置", pickHint: "或者喺下面撿你喺邊一區", hkOnly: "本站只服務香港地區。你都可以手動撿區繼續。", locateFail: "定位唔到，請手動撿區。", now: "而家", cat: "嘢食大類", sub: "細類", budget: "預算", spinCat: "轉大類", spinSub: "轉細類", spinBudget: "轉預算", go: "開飯！", again: "再轉過", changeDistrict: "換區", maps: "喺 Google Maps 打開", copy: "複製地址", copied: "已複製地址", empty: "呢區暫時未有呢類，試下第二類或再轉。", soundOn: "音效開", soundOff: "音效關", pickFirst: "請先撿區先可以轉輪盤。", regionHK: "港島", regionKLN: "九龍", regionNT: "新界／離島", locked: "已鎖定", recommend: "食哪好" },
    en: { title: "HK Eat Wheel", tagline: "Hong Kong 18 districts only", geo: "Use my location", pickHint: "Or pick your district below", hkOnly: "This site only serves Hong Kong. You can still pick a district.", locateFail: "Could not locate you. Please pick a district.", now: "Now", cat: "Cuisine", sub: "Subtype", budget: "Budget", spinCat: "Spin cuisine", spinSub: "Spin subtype", spinBudget: "Spin budget", go: "Let's eat!", again: "Spin again", changeDistrict: "Change district", maps: "Open in Google Maps", copy: "Copy address", copied: "Address copied", empty: "No match in this district. Try another spin.", soundOn: "Sound on", soundOff: "Sound off", pickFirst: "Pick a district first.", regionHK: "Hong Kong Island", regionKLN: "Kowloon", regionNT: "New Territories / Islands", locked: "Locked", recommend: "What to eat" }
  };
  const state = { lang: "zh", sound: true, district: null, restaurants: [], catIndex: null, subIndex: null, budgetIndex: null, spinning: false, rot: { cat: 0, sub: 0, budget: 0 } };
  const $ = (id) => document.getElementById(id);
  const t = (key) => I18N[state.lang][key];

  function applyLang() {
    document.documentElement.lang = state.lang === "zh" ? "zh-HK" : "en";
    ["titleText","tagline","btnGeo","pickHint","catTitle","subTitle","budgetTitle","btnSpinCat","btnSpinSub","btnSpinBudget","btnGo","btnAgain","btnMaps","btnCopy"].forEach((id) => {
      const map = { titleText: "title", tagline: "tagline", btnGeo: "geo", pickHint: "pickHint", catTitle: "cat", subTitle: "sub", budgetTitle: "budget", btnSpinCat: "spinCat", btnSpinSub: "spinSub", btnSpinBudget: "spinBudget", btnGo: "go", btnAgain: "again", btnMaps: "maps", btnCopy: "copy" };
      $(id).textContent = t(map[id]);
    });
    $("btnChange").textContent = t("changeDistrict");
    $("btnChange2").textContent = t("changeDistrict");
    $("btnSound").textContent = state.sound ? t("soundOn") : t("soundOff");
    $("btnZh").classList.toggle("active", state.lang === "zh");
    $("btnEn").classList.toggle("active", state.lang === "en");
    renderDistricts();
    updateStatus();
    paintWheel("catWheel", CATEGORIES.map((c) => state.lang === "zh" ? c.zh : c.en));
    refreshSubWheel();
    paintWheel("budgetWheel", BUDGETS);
  }

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1800);
  }

  function beep(freq, dur) {
    if (!state.sound) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq; g.gain.value = 0.04;
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (e) {}
  }

  function inHongKong(lat, lng) {
    return lat >= HK.minLat && lat <= HK.maxLat && lng >= HK.minLng && lng <= HK.maxLng;
  }

  function nearestDistrict(lat, lng) {
    let best = DISTRICTS[0], bestD = 1e9;
    DISTRICTS.forEach((d) => {
      const x = (d.lat - lat) * (d.lat - lat) + (d.lng - lng) * (d.lng - lng);
      if (x < bestD) { bestD = x; best = d; }
    });
    return best;
  }

  function showView(name) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    $(name).classList.add("active");
  }

  function renderDistricts() {
    const mount = $("districtMount");
    const groups = [{ key: "hk", title: t("regionHK") }, { key: "kln", title: t("regionKLN") }, { key: "nt", title: t("regionNT") }];
    mount.innerHTML = "";
    groups.forEach((g) => {
      const wrap = document.createElement("div");
      wrap.className = "region";
      wrap.innerHTML = "<h3>" + g.title + "</h3>";
      const grid = document.createElement("div");
      grid.className = "district-grid";
      DISTRICTS.filter((d) => d.region === g.key).forEach((d) => {
        const btn = document.createElement("button");
        btn.className = "district-btn" + (state.district && state.district.id === d.id ? " selected" : "");
        btn.innerHTML = d.zh + "<small>" + d.en + "</small>";
        btn.onclick = () => selectDistrict(d);
        grid.appendChild(btn);
      });
      wrap.appendChild(grid);
      mount.appendChild(wrap);
    });
  }

  function selectDistrict(d) {
    state.district = d;
    state.catIndex = state.subIndex = state.budgetIndex = null;
    updateStatus();
    $("btnSpinCat").disabled = false;
    $("btnSpinSub").disabled = true;
    $("btnSpinBudget").disabled = true;
    $("btnGo").disabled = true;
    $("catPick").textContent = $("subPick").textContent = $("budgetPick").textContent = "";
    showView("viewWheels");
  }

  function updateStatus() {
    const el = $("statusPill");
    if (!state.district) { el.textContent = t("pickFirst"); el.classList.remove("ready"); return; }
    const label = state.lang === "zh" ? state.district.zh + " · " + state.district.en : state.district.en + " · " + state.district.zh;
    el.textContent = t("now") + "：" + label;
    el.classList.add("ready");
  }

  function paintWheel(id, labels) {
    const wheel = $(id);
    const n = labels.length, step = 360 / n;
    wheel.style.background = "conic-gradient(from -90deg," + labels.map((_, i) => COLORS[i % COLORS.length] + " " + (i * step) + "deg " + ((i + 1) * step) + "deg").join(",") + ")";
    wheel.querySelectorAll(".wheel-label").forEach((node) => node.remove());
    labels.forEach((label, i) => {
      const span = document.createElement("div");
      span.className = "wheel-label";
      span.style.transform = "rotate(" + (i * step + step / 2 - 90) + "deg) translate(22px, -7px)";
      span.textContent = label.length > 8 ? label.slice(0, 7) + "…" : label;
      wheel.appendChild(span);
    });
  }

  function refreshSubWheel() {
    paintWheel("subWheel", CATEGORIES[state.catIndex == null ? 0 : state.catIndex].subs);
  }

  function winnerFromRotation(rotation, count) {
    const deg = ((rotation % 360) + 360) % 360;
    return Math.floor(((360 - deg) % 360) / (360 / count)) % count;
  }

  function spin(kind) {
    if (state.spinning || !state.district) return;
    const map = {
      cat: { el: $("catWheel"), labels: CATEGORIES.map((c) => state.lang === "zh" ? c.zh : c.en), out: $("catPick") },
      sub: { el: $("subWheel"), labels: CATEGORIES[state.catIndex == null ? 0 : state.catIndex].subs, out: $("subPick") },
      budget: { el: $("budgetWheel"), labels: BUDGETS, out: $("budgetPick") }
    };
    if (kind === "sub" && state.catIndex == null) return;
    const item = map[kind];
    state.rot[kind] = (state.rot[kind] || 0) + 1800 + Math.floor(Math.random() * 360);
    state.spinning = true;
    item.el.classList.add("spinning");
    item.el.style.transform = "rotate(" + state.rot[kind] + "deg)";
    const tick = setInterval(() => beep(620, 0.03), 90);
    item.el.addEventListener("transitionend", function () {
      clearInterval(tick);
      item.el.classList.remove("spinning");
      const idx = winnerFromRotation(state.rot[kind], item.labels.length);
      if (kind === "cat") {
        state.catIndex = idx; state.subIndex = null; refreshSubWheel();
        $("btnSpinSub").disabled = false; $("btnSpinBudget").disabled = false;
      } else if (kind === "sub") state.subIndex = idx;
      else state.budgetIndex = idx;
      item.out.textContent = t("locked") + "：" + item.labels[idx];
      item.out.classList.add("locked");
      beep(1180, 0.12);
      state.spinning = false;
      $("btnGo").disabled = state.catIndex == null;
    }, { once: true });
  }

  function pickRestaurant() {
    if (!state.district || state.catIndex == null) return;
    const cat = CATEGORIES[state.catIndex];
    const sub = cat.subs[state.subIndex == null ? 0 : state.subIndex];
    const budget = BUDGETS[state.budgetIndex == null ? 3 : state.budgetIndex];
    let list = state.restaurants.filter((r) => r.districtId === state.district.id && r.category === cat.zh);
    if (state.subIndex != null) {
      const finer = list.filter((r) => r.subcategory === sub);
      if (finer.length) list = finer;
    }
    if (budget !== "唔限") {
      const b = list.filter((r) => r.budget === budget);
      if (b.length) list = b;
    }
    const box = $("resultBody");
    if (!list.length) {
      box.innerHTML = "<div class=\"empty\">" + t("empty") + "</div>";
      $("mapFrame").src = ""; $("btnMaps").href = "#";
      showView("viewResult"); return;
    }
    const shop = list[Math.floor(Math.random() * list.length)];
    const name = state.lang === "zh" ? shop.nameZh : shop.nameEn;
    const q = encodeURIComponent(shop.mapsQuery);
    $("mapFrame").src = "https://maps.google.com/maps?q=" + q + "&hl=zh-HK&z=16&output=embed";
    $("btnMaps").href = "https://www.google.com/maps/search/?api=1&query=" + q;
    $("btnCopy").dataset.addr = shop.address;
    box.innerHTML = "<h2 class=\"result-name\">" + name + "</h2><p class=\"meta\">" + shop.district + " · " + shop.area + " · " + shop.category + "／" + shop.subcategory + " · " + shop.budget + "</p><p class=\"dish\"><strong>" + t("recommend") + "：</strong>" + shop.recommendDish + "</p><p class=\"addr\">" + shop.address + "</p>";
    showView("viewResult");
  }

  function locate() {
    if (!navigator.geolocation) return toast(t("locateFail"));
    navigator.geolocation.getCurrentPosition(function (pos) {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      if (!inHongKong(lat, lng)) {
        $("hkBanner").classList.add("show");
        $("hkBanner").textContent = t("hkOnly");
        return;
      }
      $("hkBanner").classList.remove("show");
      selectDistrict(nearestDistrict(lat, lng));
    }, function () { toast(t("locateFail")); }, { enableHighAccuracy: true, timeout: 8000 });
  }

  function buildDemoRestaurants() {
    const extras = {
      islands: ["東涌", "愉景灣", "長洲"],
      "yau-tsim-mong": ["旺角", "尖沙咀", "油麻地"],
      "central-western": ["中環", "上環", "西營盤"],
      "wan-chai": ["灣仔", "銅鑼灣"]
    };
    const list = [];
    let n = 1;
    DISTRICTS.forEach((d) => {
      CATEGORIES.forEach((cat, i) => {
        const areas = extras[d.id] || [d.zh.replace("區", "")];
        const area = areas[i % areas.length];
        const nameZh = area + cat.zh.split("／")[0];
        const address = d.zh + area + (8 + i) + "號地下";
        list.push({
          id: "hk-" + String(n++).padStart(3, "0"),
          nameZh: nameZh, nameEn: nameZh, district: d.zh, districtId: d.id, districtEn: d.en,
          area: area, category: cat.zh, subcategory: cat.subs[i % cat.subs.length],
          budget: ["$", "$$", "$$$"][i % 3],
          recommendDish: "問店員今日推介，配凍奶茶定檸檬茶都得。",
          address: address, lat: d.lat, lng: d.lng,
          mapsQuery: nameZh + " " + address + " 香港"
        });
      });
    });
    return list;
  }

  async function loadData() {
    try {
      const res = await fetch("data/restaurants.json");
      if (res.ok) {
        const json = await res.json();
        if (json.restaurants && json.restaurants.length) { state.restaurants = json.restaurants; return; }
      }
    } catch (e) {}
    state.restaurants = buildDemoRestaurants();
  }

  function bind() {
    $("btnZh").onclick = function () { state.lang = "zh"; applyLang(); };
    $("btnEn").onclick = function () { state.lang = "en"; applyLang(); };
    $("btnSound").onclick = function () { state.sound = !state.sound; $("btnSound").textContent = state.sound ? t("soundOn") : t("soundOff"); };
    $("btnGeo").onclick = locate;
    $("btnSpinCat").onclick = function () { spin("cat"); };
    $("btnSpinSub").onclick = function () { spin("sub"); };
    $("btnSpinBudget").onclick = function () { spin("budget"); };
    $("btnGo").onclick = pickRestaurant;
    $("btnAgain").onclick = function () {
      state.catIndex = state.subIndex = state.budgetIndex = null;
      $("catPick").textContent = $("subPick").textContent = $("budgetPick").textContent = "";
      $("btnSpinSub").disabled = true; $("btnGo").disabled = true;
      showView("viewWheels");
    };
    const back = function () { showView("viewDistrict"); };
    $("btnChange").onclick = back;
    $("btnChange2").onclick = back;
    $("btnCopy").onclick = async function () {
      const addr = $("btnCopy").dataset.addr || "";
      try { await navigator.clipboard.writeText(addr); toast(t("copied")); }
      catch (e) { toast(addr); }
    };
  }

  document.addEventListener("DOMContentLoaded", async function () {
    bind(); renderDistricts(); applyLang(); await loadData();
  });
})();
