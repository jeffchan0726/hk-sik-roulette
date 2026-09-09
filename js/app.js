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
    { zh: "港式茶餐廳／冰室", en: "Cha Chaan Teng", shops: ["金龍冰室", "好運茶餐廳", "明星冰室", "順記茶檔", "鄰里咖啡室", "夜香冰室"], dish: "常餐加凍奶茶，或者豬扒包配凍檸茶。" },
    { zh: "中式／粵菜", en: "Chinese / Cantonese", shops: ["金華燒臘", "蓮香小館", "潮興飯店", "福臨門小廚", "蜀香居", "粥麵軒"], dish: "叉燒拼油雞配白飯，或者蝦餃燒賣蒸籠。" },
    { zh: "火鍋／燙烤", en: "Hotpot / BBQ", shops: ["一品火鍋", "夜狼韓燙", "炭火燒肉舖", "良友串燙", "麻辣鍋記", "牛匠燒肉"], dish: "番茄或者麻辣湯底配肥牛；韓燙先烤五花腩。" },
    { zh: "日韓台", en: "JP / KR / TW", shops: ["山本拉麵", "海膽壽司舖", "台北滷肉飯", "首爾食堂", "牛丼一番", "石鍋拌飯店"], dish: "叉燒拉麵加溈心蛋，或者滷肉飯配貢丸湯。" },
    { zh: "東南亞", en: "Southeast Asian", shops: ["西貢粉店", "清邁小屋", "椰漿飯檔", "勦沙小館", "越式河粉", "泰式小廚"], dish: "牛肉河粉加九層塔，或者青咖喱配茉莉香米。" },
    { zh: "西式／意粉薄餅", en: "Western", shops: ["維港漢堡", "石板扒房", "拿坡里薄餅", "燈塔咖啡", "蒜香意粉屋", "全日早餐店"], dish: "牛肉漢堡加薯條，或者海鮮意大利麵。" },
    { zh: "街頭小食", en: "Street snacks", shops: ["旺記魚蛋", "夜香鵝蛋仔", "街坊碗仔鿃", "孫寶腸粉", "格仔餅檔", "車仔麵檔"], dish: "魚蛋加牛筋，或者原味鵝蛋仔趁熱食。" },
    { zh: "甜品糖水飲品", en: "Dessert / drinks", shops: ["四季糖水", "淳豆腐花", "芋圓小店", "夜半茶檔", "紅豆沙舖", "雙皮奶奶"], dish: "芝麻糊定紅豆沙，豆腐花加糖薑水。" }
  ];
  const COLORS = ["#ffc857","#ff6b6b","#3ef0ff","#c3f584","#ff9f43","#e056fd","#7bed9f","#feca57"];
  const HK = { minLat: 22.13, maxLat: 22.57, minLng: 113.82, maxLng: 114.44 };
  const AREA = { islands:["東涌","愉景灣","長洲"], "yau-tsim-mong":["旺角","尖沙咀","油麻地"], "central-western":["中環","上環","西營盤"], "wan-chai":["灣仔","銅鑼灣"] };
  const I18N = {
    zh: { title:"香港搜食輪盤", tagline:"專為香港 18 區而設 · 轉完即刻開飯", geo:"用我而家位置", pickHint:"或者喺下面撿你喺邊一區", hkOnly:"本站只服務香港地區。你都可以手動撿區繼續。", locateFail:"定位唔到，請手動撿區。", now:"而家", cat:"嘢食大類", shop:"舖頭名", spinCat:"轉大類", spinShop:"轉舖頭", again:"再轉過", changeDistrict:"換區", maps:"Google Maps", openrice:"OpenRice", copy:"複製地址", copied:"已複製地址", empty:"呢區暫時未有呢類，試下第二類或再轉。", soundOn:"音效開", soundOff:"音效關", pickFirst:"請先撿區先可以轉輪盤。", regionHK:"港島", regionKLN:"九龍", regionNT:"新界／離島", locked:"已鎖定", recommend:"食哪" },
    en: { title:"HK Eat Wheel", tagline:"Hong Kong 18 districts only", geo:"Use my location", pickHint:"Or pick your district below", hkOnly:"This site only serves Hong Kong.", locateFail:"Please pick a district.", now:"Now", cat:"Cuisine", shop:"Shop name", spinCat:"Spin cuisine", spinShop:"Spin shop", again:"Spin again", changeDistrict:"Change district", maps:"Google Maps", openrice:"OpenRice", copy:"Copy address", copied:"Copied", empty:"No match.", soundOn:"Sound on", soundOff:"Sound off", pickFirst:"Pick a district first.", regionHK:"Hong Kong Island", regionKLN:"Kowloon", regionNT:"New Territories", locked:"Locked", recommend:"What to eat" }
  };
  const state = { lang:"zh", sound:true, district:null, restaurants:[], catIndex:null, shopIndex:null, shopPool:[], spinning:false, rot:{cat:0,shop:0} };
  const $ = function(id){ return document.getElementById(id); };
  const t = function(key){ return I18N[state.lang][key]; };
  function openriceUrl(shop){ return "https://www.openrice.com/zh/hongkong/restaurants?whatwhere=" + encodeURIComponent(shop.nameZh + " " + shop.district + " 香港"); }
  function mapsUrl(shop){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(shop.mapsQuery); }
  function applyLang(){
    document.documentElement.lang = state.lang === "zh" ? "zh-HK" : "en";
    $("titleText").textContent=t("title"); $("tagline").textContent=t("tagline"); $("btnGeo").textContent=t("geo"); $("pickHint").textContent=t("pickHint");
    $("catTitle").textContent=t("cat"); $("shopTitle").textContent=t("shop"); $("btnSpinCat").textContent=t("spinCat"); $("btnSpinShop").textContent=t("spinShop");
    $("btnAgain").textContent=t("again"); $("btnChange").textContent=t("changeDistrict"); $("btnChange2").textContent=t("changeDistrict");
    $("btnMaps").textContent=t("maps"); $("btnOpenrice").textContent=t("openrice"); $("btnCopy").textContent=t("copy");
    $("btnSound").textContent=state.sound?t("soundOn"):t("soundOff");
    $("btnZh").classList.toggle("active", state.lang==="zh"); $("btnEn").classList.toggle("active", state.lang==="en");
    renderDistricts(); updateStatus();
    paintWheel("catWheel", CATEGORIES.map(function(c){ return state.lang==="zh"?c.zh:c.en; }));
    refreshShopWheel();
  }
  function toast(msg){ var el=$("toast"); el.textContent=msg; el.classList.add("show"); setTimeout(function(){ el.classList.remove("show"); },1800); }
  function beep(freq,dur){ if(!state.sound) return; try{ var ctx=new (window.AudioContext||window.webkitAudioContext)(); var o=ctx.createOscillator(); var g=ctx.createGain(); o.frequency.value=freq; g.gain.value=0.04; o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur);}catch(e){} }
  function inHongKong(lat,lng){ return lat>=HK.minLat && lat<=HK.maxLat && lng>=HK.minLng && lng<=HK.maxLng; }
  function nearestDistrict(lat,lng){ var best=DISTRICTS[0], bestD=1e9; DISTRICTS.forEach(function(d){ var x=(d.lat-lat)*(d.lat-lat)+(d.lng-lng)*(d.lng-lng); if(x<bestD){bestD=x;best=d;} }); return best; }
  function showView(name){ document.querySelectorAll(".view").forEach(function(v){ v.classList.remove("active"); }); $(name).classList.add("active"); }
  function renderDistricts(){
    var mount=$("districtMount");
    var groups=[{key:"hk",title:t("regionHK")},{key:"kln",title:t("regionKLN")},{key:"nt",title:t("regionNT")}];
    mount.innerHTML="";
    groups.forEach(function(g){
      var wrap=document.createElement("div"); wrap.className="region"; wrap.innerHTML="<h3>"+g.title+"</h3>";
      var grid=document.createElement("div"); grid.className="district-grid";
      DISTRICTS.filter(function(d){return d.region===g.key;}).forEach(function(d){
        var btn=document.createElement("button");
        btn.className="district-btn"+(state.district&&state.district.id===d.id?" selected":"");
        btn.innerHTML=d.zh+"<small>"+d.en+"</small>";
        btn.onclick=function(){ selectDistrict(d); };
        grid.appendChild(btn);
      });
      wrap.appendChild(grid); mount.appendChild(wrap);
    });
  }
  function selectDistrict(d){
    state.district=d; state.catIndex=null; state.shopIndex=null; state.shopPool=[];
    updateStatus(); $("btnSpinCat").disabled=false; $("btnSpinShop").disabled=true;
    $("catPick").textContent=""; $("shopPick").textContent=""; refreshShopWheel(); showView("viewWheels");
  }
  function updateStatus(){
    var el=$("statusPill");
    if(!state.district){ el.textContent=t("pickFirst"); el.classList.remove("ready"); return; }
    var label=state.lang==="zh"?state.district.zh+" · "+state.district.en:state.district.en+" · "+state.district.zh;
    el.textContent=t("now")+"："+label; el.classList.add("ready");
  }
  function paintWheel(id,labels){
    var wheel=$(id); if(!labels.length) labels=["—"];
    var n=labels.length, step=360/n;
    wheel.style.background="conic-gradient(from -90deg,"+labels.map(function(_,i){return COLORS[i%COLORS.length]+" "+(i*step)+"deg "+((i+1)*step)+"deg";}).join(",")+")";
    wheel.querySelectorAll(".wheel-label").forEach(function(node){ node.remove(); });
    labels.forEach(function(label,i){
      var span=document.createElement("div"); span.className="wheel-label";
      span.style.transform="rotate("+(i*step+step/2-90)+"deg) translate(22px, -7px)";
      span.textContent=label.length>8?label.slice(0,7)+"…":label; wheel.appendChild(span);
    });
  }
  function shopsForCurrent(){
    if(!state.district||state.catIndex==null) return [];
    var cat=CATEGORIES[state.catIndex];
    return state.restaurants.filter(function(r){ return r.districtId===state.district.id && r.category===cat.zh; });
  }
  function refreshShopWheel(){
    state.shopPool=shopsForCurrent();
    var labels=state.shopPool.map(function(s){return s.nameZh;});
    if(!labels.length) labels=["先轉大類"];
    paintWheel("shopWheel", labels);
  }
  function winnerFromRotation(rotation,count){ var deg=((rotation%360)+360)%360; return Math.floor(((360-deg)%360)/(360/count))%count; }
  function spin(kind){
    if(state.spinning||!state.district) return;
    if(kind==="shop"&&state.catIndex==null) return;
    var labels, el, out;
    if(kind==="cat"){ labels=CATEGORIES.map(function(c){return state.lang==="zh"?c.zh:c.en;}); el=$("catWheel"); out=$("catPick"); }
    else { state.shopPool=shopsForCurrent(); labels=state.shopPool.map(function(s){return s.nameZh;}); if(!labels.length) return toast(t("empty")); el=$("shopWheel"); out=$("shopPick"); paintWheel("shopWheel",labels); }
    state.rot[kind]=(state.rot[kind]||0)+1800+Math.floor(Math.random()*360);
    state.spinning=true; el.classList.add("spinning"); el.style.transform="rotate("+state.rot[kind]+"deg)";
    var tick=setInterval(function(){ beep(620,0.03); },90);
    el.addEventListener("transitionend", function(){
      clearInterval(tick); el.classList.remove("spinning");
      var idx=winnerFromRotation(state.rot[kind], labels.length);
      if(kind==="cat"){ state.catIndex=idx; state.shopIndex=null; refreshShopWheel(); $("btnSpinShop").disabled=false; out.textContent=t("locked")+"："+labels[idx]; out.classList.add("locked"); state.spinning=false; beep(1180,0.12); }
      else { state.shopIndex=idx; out.textContent=t("locked")+"："+labels[idx]; out.classList.add("locked"); beep(1180,0.12); state.spinning=false; showResult(state.shopPool[idx]); }
    }, {once:true});
  }
  function showResult(shop){
    if(!shop){ $("resultBody").innerHTML="<div class=\"empty\">"+t("empty")+"</div>"; $("mapFrame").src=""; $("btnMaps").href="#"; $("btnOpenrice").href="#"; showView("viewResult"); return; }
    var q=encodeURIComponent(shop.mapsQuery);
    $("mapFrame").src="https://maps.google.com/maps?q="+q+"&hl=zh-HK&z=16&output=embed";
    $("btnMaps").href=mapsUrl(shop); $("btnOpenrice").href=openriceUrl(shop); $("btnCopy").dataset.addr=shop.address;
    $("resultBody").innerHTML="<h2 class=\"result-name\">"+shop.nameZh+"</h2><p class=\"meta\">"+shop.district+" · "+shop.area+" · "+shop.category+"</p><p class=\"dish\"><strong>"+t("recommend")+"：</strong>"+shop.recommendDish+"</p><p class=\"addr\">"+shop.address+"</p>";
    showView("viewResult");
  }
  function locate(){
    if(!navigator.geolocation) return toast(t("locateFail"));
    navigator.geolocation.getCurrentPosition(function(pos){
      var lat=pos.coords.latitude, lng=pos.coords.longitude;
      if(!inHongKong(lat,lng)){ $("hkBanner").classList.add("show"); $("hkBanner").textContent=t("hkOnly"); return; }
      $("hkBanner").classList.remove("show"); selectDistrict(nearestDistrict(lat,lng));
    }, function(){ toast(t("locateFail")); }, {enableHighAccuracy:true,timeout:8000});
  }
  function buildDemoRestaurants(){
    var list=[], n=1;
    DISTRICTS.forEach(function(d){
      var areas=AREA[d.id]||[d.zh.replace("區","")];
      CATEGORIES.forEach(function(cat){
        cat.shops.forEach(function(shop,i){
          var area=areas[i%areas.length];
          var nameZh=area+shop;
          var address=d.zh+area+(8+i)+"號地下";
          list.push({ id:"hk-"+String(n++).padStart(3,"0"), nameZh:nameZh, nameEn:nameZh, district:d.zh, districtId:d.id, districtEn:d.en, area:area, category:cat.zh, recommendDish:cat.dish, address:address, lat:d.lat, lng:d.lng, mapsQuery:nameZh+" "+address+" 香港" });
        });
      });
    });
    return list;
  }
  async function loadData(){
    try{ var res=await fetch("data/restaurants.json"); if(res.ok){ var json=await res.json(); if(json.restaurants&&json.restaurants.length){ state.restaurants=json.restaurants; return; } } }catch(e){}
    state.restaurants=buildDemoRestaurants();
  }
  function bind(){
    $("btnZh").onclick=function(){ state.lang="zh"; applyLang(); };
    $("btnEn").onclick=function(){ state.lang="en"; applyLang(); };
    $("btnSound").onclick=function(){ state.sound=!state.sound; $("btnSound").textContent=state.sound?t("soundOn"):t("soundOff"); };
    $("btnGeo").onclick=locate;
    $("btnSpinCat").onclick=function(){ spin("cat"); };
    $("btnSpinShop").onclick=function(){ spin("shop"); };
    $("btnAgain").onclick=function(){ state.catIndex=null; state.shopIndex=null; $("catPick").textContent=""; $("shopPick").textContent=""; $("btnSpinShop").disabled=true; refreshShopWheel(); showView("viewWheels"); };
    var back=function(){ showView("viewDistrict"); }; $("btnChange").onclick=back; $("btnChange2").onclick=back;
    $("btnCopy").onclick=async function(){ var addr=$("btnCopy").dataset.addr||""; try{ await navigator.clipboard.writeText(addr); toast(t("copied")); }catch(e){ toast(addr); } };
  }
  document.addEventListener("DOMContentLoaded", async function(){ bind(); renderDistricts(); applyLang(); await loadData(); });
})();
