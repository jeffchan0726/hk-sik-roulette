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
    { zh: "茶餐廳／冰室", orWhat: "茶餐廳", shops: ["翠華餐廳", "大快活", "美心MX", "檀島咖啡餅店", "新景園", "金鳳茶餐廳"], dish: "常餐、豬扒包、凍奶茶。" },
    { zh: "粵菜／燒味", orWhat: "粵菜", shops: ["太興", "稻香", "一點心", "富臨皇宮", "甘牌燒鵝", "蓮香樓"], dish: "點心蒸籠、燒味飯、蝦餃燒賣。" },
    { zh: "火鍋／燙烤", orWhat: "火鍋", shops: ["海底撎", "湊湊火鍋", "牛角", "一番地", "牛摩", "燙烤堂"], dish: "火鍋配肥牛，或者日式燒肉／韓燙。" },
    { zh: "日本菜／韓國菜", orWhat: "日本菜", shops: ["壽司郎", "一風堂", "吉野家", "兩餐", "讚岐製麵所", "元祖拉麵"], dish: "壽司、拉麵、丼飯或韓式石鍋拌飯。" },
    { zh: "泰國菜／越南菜", orWhat: "泰國菜", shops: ["金雞海南雞飯", "越式粉麵", "黃亞細肉骨茶", "泰屋", "Pho Le", "Mint & Basil"], dish: "青咖喱、河粉、海南雞或勦沙。" },
    { zh: "西式／意大利", orWhat: "西式", shops: ["意樂餐廳", "必勝客", "Pizza Hut", "Oliver's Super Sandwiches", "太平洋咖啡", "Oolaa"], dish: "漢堡、薄餅、意粉或全日早餐。" },
    { zh: "粉麵／小食", orWhat: "粉麵", shops: ["譚仔三哥米線", "譚仔雲南米線", "阿燦開飯", "華姐清湯腩", "麥妀雲吞麵", "車仔麵"], dish: "米線、雲吞麵、魚蛋牛筋或車仔麵。" },
    { zh: "糖水／甜品", orWhat: "糖水", shops: ["許留山", "滿記甜品", "聰嫂", "糖朝", "佳佳甜品", "玉堆山"], dish: "楊枝甘露、豆腐花、芝麻糊或雙皮奶。" }
  ];
  const COLORS = ["#ffc857","#ff6b6b","#3ef0ff","#c3f584","#ff9f43","#e056fd","#7bed9f","#feca57"];
  const HK = { minLat: 22.13, maxLat: 22.57, minLng: 113.82, maxLng: 114.44 };
  const AREA = {
    "central-western":["中環","上環","西營盤"], "wan-chai":["灣仔","銅鑼灣"], eastern:["北角","鰍魚涌","西灣河"], southern:["香港仔","鴨脷洲","赤柱"],
    "yau-tsim-mong":["旺角","尖沙咀","油麻地"], "sham-shui-po":["深水埙","長沙灣"], "kowloon-city":["九龍城","土瓜灣","紅磬"], "wong-tai-sin":["黃大仙","鑽石山"], "kwun-tong":["觀塘","牛頭角"],
    "kwai-tsing":["葵芳","青衣"], "tsuen-wan":["荃灣"], "tuen-mun":["屯門"], "yuen-long":["元朗","天水圍"], north:["上水","粉嶺"], "tai-po":["大埔"], "sha-tin":["沙田","大圍","馬鞍山"], "sai-kung":["西貢","將軍澳"], islands:["東涌","愉景灣","長洲"]
  };
  const I18N = {
    zh: { title:"香港搜食輪盤", tagline:"撿區之後交俶輪盤 · 用 OpenRice 搜香港舖", geo:"用我而家位置", pickHint:"或者喺下面撿你喺邊一區", hkOnly:"本站只服務香港地區。", locateFail:"定位唔到，請手動撿區。", now:"而家", cat:"嘢食大類", shop:"舖頭名", spinCat:"轉大類", spinShop:"轉舖頭", again:"再轉過", changeDistrict:"換區", maps:"Google Maps", openrice:"OpenRice", copy:"複製搜尋", copied:"已複製", empty:"呢區暫時未有呢類。", soundOn:"音效開", soundOff:"音效關", pickFirst:"請先撿區。", regionHK:"港島", regionKLN:"九龍", regionNT:"新界／離島", locked:"已鎖定", recommend:"食哪" },
    en: { title:"HK Eat Wheel", tagline:"Pick a district, then spin OpenRice", geo:"Use my location", pickHint:"Or pick your district", hkOnly:"Hong Kong only.", locateFail:"Pick a district.", now:"Now", cat:"Cuisine", shop:"Shop", spinCat:"Spin cuisine", spinShop:"Spin shop", again:"Again", changeDistrict:"Change district", maps:"Google Maps", openrice:"OpenRice", copy:"Copy", copied:"Copied", empty:"No match.", soundOn:"Sound on", soundOff:"Sound off", pickFirst:"Pick a district first.", regionHK:"HK Island", regionKLN:"Kowloon", regionNT:"NT", locked:"Locked", recommend:"Eat" }
  };
  const state = { lang:"zh", sound:true, district:null, restaurants:[], catIndex:null, shopIndex:null, shopPool:[], spinning:false, rot:{cat:0,shop:0} };
  const $ = function(id){ return document.getElementById(id); };
  const t = function(key){ return I18N[state.lang][key]; };
  function openriceUrl(shop){ return "https://www.openrice.com/zh/hongkong/restaurants?what=" + encodeURIComponent(shop.nameZh) + "&where=" + encodeURIComponent(shop.area); }
  function mapsUrl(shop){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(shop.mapsQuery); }
  function applyLang(){
    document.documentElement.lang = state.lang==="zh"?"zh-HK":"en";
    $("titleText").textContent=t("title"); $("tagline").textContent=t("tagline"); $("btnGeo").textContent=t("geo"); $("pickHint").textContent=t("pickHint");
    $("catTitle").textContent=t("cat"); $("shopTitle").textContent=t("shop"); $("btnSpinCat").textContent=t("spinCat"); $("btnSpinShop").textContent=t("spinShop");
    $("btnAgain").textContent=t("again"); $("btnChange").textContent=t("changeDistrict"); $("btnChange2").textContent=t("changeDistrict");
    $("btnMaps").textContent=t("maps"); $("btnOpenrice").textContent=t("openrice"); $("btnCopy").textContent=t("copy");
    $("btnSound").textContent=state.sound?t("soundOn"):t("soundOff");
    $("btnZh").classList.toggle("active", state.lang==="zh"); $("btnEn").classList.toggle("active", state.lang==="en");
    renderDistricts(); updateStatus();
    paintWheel("catWheel", CATEGORIES.map(function(c){ return c.zh; })); refreshShopWheel();
  }
  function toast(msg){ var el=$("toast"); el.textContent=msg; el.classList.add("show"); setTimeout(function(){ el.classList.remove("show"); },1800); }
  function beep(freq,dur){ if(!state.sound) return; try{ var ctx=new (window.AudioContext||window.webkitAudioContext)(); var o=ctx.createOscillator(); var g=ctx.createGain(); o.frequency.value=freq; g.gain.value=0.04; o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur);}catch(e){} }
  function inHongKong(lat,lng){ return lat>=HK.minLat && lat<=HK.maxLat && lng>=HK.minLng && lng<=HK.maxLng; }
  function nearestDistrict(lat,lng){ var best=DISTRICTS[0], bestD=1e9; DISTRICTS.forEach(function(d){ var x=(d.lat-lat)*(d.lat-lat)+(d.lng-lng)*(d.lng-lng); if(x<bestD){bestD=x;best=d;} }); return best; }
  function showView(name){ document.querySelectorAll(".view").forEach(function(v){ v.classList.remove("active"); }); $(name).classList.add("active"); }
  function renderDistricts(){
    var mount=$("districtMount"); var groups=[{key:"hk",title:t("regionHK")},{key:"kln",title:t("regionKLN")},{key:"nt",title:t("regionNT")}];
    mount.innerHTML="";
    groups.forEach(function(g){
      var wrap=document.createElement("div"); wrap.className="region"; wrap.innerHTML="<h3>"+g.title+"</h3>";
      var grid=document.createElement("div"); grid.className="district-grid";
      DISTRICTS.filter(function(d){return d.region===g.key;}).forEach(function(d){
        var btn=document.createElement("button");
        btn.className="district-btn"+(state.district&&state.district.id===d.id?" selected":"");
        btn.innerHTML=d.zh+"<small>"+d.en+"</small>"; btn.onclick=function(){ selectDistrict(d); }; grid.appendChild(btn);
      }); wrap.appendChild(grid); mount.appendChild(wrap);
    });
  }
  function selectDistrict(d){ state.district=d; state.catIndex=null; state.shopIndex=null; state.shopPool=[]; updateStatus(); $("btnSpinCat").disabled=false; $("btnSpinShop").disabled=true; $("catPick").textContent=""; $("shopPick").textContent=""; refreshShopWheel(); showView("viewWheels"); }
  function updateStatus(){ var el=$("statusPill"); if(!state.district){ el.textContent=t("pickFirst"); el.classList.remove("ready"); return; } el.textContent=t("now")+"："+state.district.zh+" · OpenRice"; el.classList.add("ready"); }
  function paintWheel(id,labels){ var wheel=$(id); if(!labels.length) labels=["—"]; var n=labels.length, step=360/n; wheel.style.background="conic-gradient(from -90deg,"+labels.map(function(_,i){return COLORS[i%COLORS.length]+" "+(i*step)+"deg "+((i+1)*step)+"deg";}).join(",")+")"; wheel.querySelectorAll(".wheel-label").forEach(function(node){ node.remove(); }); labels.forEach(function(label,i){ var span=document.createElement("div"); span.className="wheel-label"; span.style.transform="rotate("+(i*step+step/2-90)+"deg) translate(22px, -7px)"; span.textContent=label.length>8?label.slice(0,7)+"…":label; wheel.appendChild(span); }); }
  function shopsForCurrent(){ if(!state.district||state.catIndex==null) return []; var cat=CATEGORIES[state.catIndex]; return state.restaurants.filter(function(r){ return r.districtId===state.district.id && r.category===cat.zh; }); }
  function refreshShopWheel(){ state.shopPool=shopsForCurrent(); var labels=state.shopPool.map(function(s){return s.nameZh;}); if(!labels.length) labels=["先轉大類"]; paintWheel("shopWheel", labels); }
  function winnerFromRotation(rotation,count){ var deg=((rotation%360)+360)%360; return Math.floor(((360-deg)%360)/(360/count))%count; }
  function spin(kind){
    if(state.spinning||!state.district) return; if(kind==="shop"&&state.catIndex==null) return;
    var labels, el, out;
    if(kind==="cat"){ labels=CATEGORIES.map(function(c){return c.zh;}); el=$("catWheel"); out=$("catPick"); }
    else { state.shopPool=shopsForCurrent(); labels=state.shopPool.map(function(s){return s.nameZh;}); if(!labels.length) return toast(t("empty")); el=$("shopWheel"); out=$("shopPick"); paintWheel("shopWheel",labels); }
    state.rot[kind]=(state.rot[kind]||0)+1800+Math.floor(Math.random()*360); state.spinning=true; el.classList.add("spinning"); el.style.transform="rotate("+state.rot[kind]+"deg)";
    var tick=setInterval(function(){ beep(620,0.03); },90);
    el.addEventListener("transitionend", function(){
      clearInterval(tick); el.classList.remove("spinning"); var idx=winnerFromRotation(state.rot[kind], labels.length);
      if(kind==="cat"){ state.catIndex=idx; state.shopIndex=null; refreshShopWheel(); $("btnSpinShop").disabled=false; out.textContent=t("locked")+"："+labels[idx]; out.classList.add("locked"); state.spinning=false; beep(1180,0.12); }
      else { state.shopIndex=idx; out.textContent=t("locked")+"："+labels[idx]; out.classList.add("locked"); beep(1180,0.12); state.spinning=false; showResult(state.shopPool[idx]); }
    }, {once:true});
  }
  function showResult(shop){
    if(!shop){ $("resultBody").innerHTML="<div class=\"empty\">"+t("empty")+"</div>"; showView("viewResult"); return; }
    var q=encodeURIComponent(shop.mapsQuery);
    $("mapFrame").src="https://maps.google.com/maps?q="+q+"&hl=zh-HK&z=16&output=embed";
    $("btnMaps").href=mapsUrl(shop); $("btnOpenrice").href=openriceUrl(shop); $("btnCopy").dataset.addr=openriceUrl(shop);
    $("resultBody").innerHTML="<h2 class=\"result-name\">"+shop.nameZh+"</h2><p class=\"meta\">OpenRice · "+shop.area+" · "+shop.category+"</p><p class=\"dish\"><strong>"+t("recommend")+"：</strong>"+shop.recommendDish+"</p><p class=\"addr\">搜索："+shop.nameZh+" + "+shop.area+"</p>";
    showView("viewResult");
  }
  function locate(){ if(!navigator.geolocation) return toast(t("locateFail")); navigator.geolocation.getCurrentPosition(function(pos){ var lat=pos.coords.latitude, lng=pos.coords.longitude; if(!inHongKong(lat,lng)){ $("hkBanner").classList.add("show"); $("hkBanner").textContent=t("hkOnly"); return; } $("hkBanner").classList.remove("show"); selectDistrict(nearestDistrict(lat,lng)); }, function(){ toast(t("locateFail")); }, {enableHighAccuracy:true,timeout:8000}); }
  function buildDemoRestaurants(){
    var list=[], n=1;
    DISTRICTS.forEach(function(d){
      var areas=AREA[d.id]||[d.zh.replace("區","")];
      CATEGORIES.forEach(function(cat){
        cat.shops.forEach(function(shop,i){
          var area=areas[i%areas.length];
          list.push({ id:"hk-"+String(n++).padStart(3,"0"), nameZh:shop, district:d.zh, districtId:d.id, area:area, category:cat.zh, orWhat:cat.orWhat, recommendDish:cat.dish, mapsQuery:shop+" "+area+" 香港" });
        });
      });
    });
    return list;
  }
  async function loadData(){ try{ var res=await fetch("data/restaurants.json"); if(res.ok){ var json=await res.json(); if(json.restaurants&&json.restaurants.length){ state.restaurants=json.restaurants; return; } } }catch(e){} state.restaurants=buildDemoRestaurants(); }
  function bind(){
    $("btnZh").onclick=function(){ state.lang="zh"; applyLang(); }; $("btnEn").onclick=function(){ state.lang="en"; applyLang(); };
    $("btnSound").onclick=function(){ state.sound=!state.sound; $("btnSound").textContent=state.sound?t("soundOn"):t("soundOff"); };
    $("btnGeo").onclick=locate; $("btnSpinCat").onclick=function(){ spin("cat"); }; $("btnSpinShop").onclick=function(){ spin("shop"); };
    $("btnAgain").onclick=function(){ state.catIndex=null; state.shopIndex=null; $("catPick").textContent=""; $("shopPick").textContent=""; $("btnSpinShop").disabled=true; refreshShopWheel(); showView("viewWheels"); };
    var back=function(){ showView("viewDistrict"); }; $("btnChange").onclick=back; $("btnChange2").onclick=back;
    $("btnCopy").onclick=async function(){ var addr=$("btnCopy").dataset.addr||""; try{ await navigator.clipboard.writeText(addr); toast(t("copied")); }catch(e){ toast(addr); } };
  }
  document.addEventListener("DOMContentLoaded", async function(){ bind(); renderDistricts(); applyLang(); await loadData(); });
})();
