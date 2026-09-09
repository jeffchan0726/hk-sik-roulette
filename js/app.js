(function () {
  const DISTRICTS = [
    { id:"central-western", zh:"中西區", en:"Central and Western", region:"hk", lat:22.2816, lng:114.1582 },
    { id:"wan-chai", zh:"灣仔區", en:"Wan Chai", region:"hk", lat:22.277, lng:114.1733 },
    { id:"eastern", zh:"東區", en:"Eastern", region:"hk", lat:22.284, lng:114.224 },
    { id:"southern", zh:"南區", en:"Southern", region:"hk", lat:22.247, lng:114.165 },
    { id:"yau-tsim-mong", zh:"油尖旺區", en:"Yau Tsim Mong", region:"kln", lat:22.3193, lng:114.1694 },
    { id:"sham-shui-po", zh:"深水埙區", en:"Sham Shui Po", region:"kln", lat:22.3308, lng:114.1625 },
    { id:"kowloon-city", zh:"九龍城區", en:"Kowloon City", region:"kln", lat:22.3282, lng:114.191 },
    { id:"wong-tai-sin", zh:"黃大仙區", en:"Wong Tai Sin", region:"kln", lat:22.342, lng:114.193 },
    { id:"kwun-tong", zh:"觀塘區", en:"Kwun Tong", region:"kln", lat:22.313, lng:114.225 },
    { id:"kwai-tsing", zh:"葵青區", en:"Kwai Tsing", region:"nt", lat:22.357, lng:114.1276 },
    { id:"tsuen-wan", zh:"荃灣區", en:"Tsuen Wan", region:"nt", lat:22.3707, lng:114.1146 },
    { id:"tuen-mun", zh:"屯門區", en:"Tuen Mun", region:"nt", lat:22.391, lng:113.976 },
    { id:"yuen-long", zh:"元朗區", en:"Yuen Long", region:"nt", lat:22.4445, lng:114.0222 },
    { id:"north", zh:"北區", en:"North", region:"nt", lat:22.494, lng:114.138 },
    { id:"tai-po", zh:"大埔區", en:"Tai Po", region:"nt", lat:22.4508, lng:114.1694 },
    { id:"sha-tin", zh:"沙田區", en:"Sha Tin", region:"nt", lat:22.3825, lng:114.188 },
    { id:"sai-kung", zh:"西貢區", en:"Sai Kung", region:"nt", lat:22.3818, lng:114.2715 },
    { id:"islands", zh:"離島區", en:"Islands", region:"nt", lat:22.2895, lng:113.9416 }
  ];
  const CATEGORIES = [
    { zh:"茶餐廳／冰室", shops:["翠華餐廳","大快活","美心MX","檀島咖啡餅店","新景園","金鳳茶餐廳"], dish:"常餐、豬扒包、凍奶茶。" },
    { zh:"粵菜／燒味", shops:["太興","稻香","一點心","富臨皇宮","甘牌燒鵝","蓮香樓"], dish:"點心、燒味飯、蝦餃燒賣。" },
    { zh:"火鍋／燙烤", shops:["海底撎","湊湊火鍋","牛角","一番地","牛摩","燙烤堂"], dish:"火鍋配肥牛，或日式燒肉。" },
    { zh:"日本菜／韓國菜", shops:["壽司郎","一風堂","吉野家","兩餐","讚岐製麵所","元祖拉麵"], dish:"壽司、拉麵、丼飯。" },
    { zh:"泰國菜／越南菜", shops:["金雞海南雞飯","Pho Le","Mint & Basil","黃亞細肉骨茶","泰屋"], dish:"青咖喱、河粉、海南雞。" },
    { zh:"西式／意大利", shops:["意樂餐廳","Pizza Hut","Oliver's Super Sandwiches","Oolaa","太平洋咖啡"], dish:"漢堡、薄餅、意粉。" },
    { zh:"粉麵／小食", shops:["譚仔三哥米線","譚仔雲南米線","阿燦開飯","華姐清湯腩","麥妀雲吞麵"], dish:"米線、雲吞麵、車仔麵。" },
    { zh:"糖水／甜品", shops:["許留山","滿記甜品","聰嫂","糖朝","佳佳甜品"], dish:"楊枝甘露、豆腐花、雙皮奶。" }
  ];
  const COLORS=["#ffc857","#ff6b6b","#3ef0ff","#c3f584","#ff9f43","#e056fd","#7bed9f","#feca57"];
  const HK={minLat:22.13,maxLat:22.57,minLng:113.82,maxLng:114.44};
  const CATS=window.HK_CATS||["地區","商場","地標","酒店","地鐵沿線"];
  const REGIONS=window.HK_REGIONS||["香港島","九龍","新界","離島"];
  const PLACES=window.HK_PLACES||[];
  const I18N={ zh:{title:"香港搜食輪盤",tagline:"撿地點之後交俶輪盤",geo:"用我而家位置",pickHint:"搜地區、商場、地鐵站或酒店",hkOnly:"本站只服務香港。",locateFail:"定位唔到，請手動撿。",now:"而家",cat:"嘢食大類",shop:"舖頭名",spinCat:"轉大類",spinShop:"轉舖頭",again:"再轉過",changeDistrict:"換地點",maps:"Google Maps",openrice:"OpenRice",copy:"複製",copied:"已複製",empty:"呢度暫時未有呢類。",soundOn:"音效開",soundOff:"音效關",pickFirst:"請先撿地點。",locked:"已鎖定",recommend:"食哪"}, en:{title:"HK Eat Wheel",tagline:"Pick a place, then spin",geo:"Use my location",pickHint:"Search area, mall, MTR or hotel",hkOnly:"Hong Kong only.",locateFail:"Pick a place.",now:"Now",cat:"Cuisine",shop:"Shop",spinCat:"Spin cuisine",spinShop:"Spin shop",again:"Again",changeDistrict:"Change place",maps:"Google Maps",openrice:"OpenRice",copy:"Copy",copied:"Copied",empty:"No match.",soundOn:"Sound on",soundOff:"Sound off",pickFirst:"Pick a place first.",locked:"Locked",recommend:"Eat"} };
  const state={lang:"zh",sound:true,district:null,place:null,restaurants:[],catIndex:null,shopIndex:null,shopPool:[],spinning:false,rot:{cat:0,shop:0},pickerCat:"地區",pickerRegion:"香港島",pickerQuery:""};
  const $=function(id){return document.getElementById(id)};
  const t=function(key){return I18N[state.lang][key]};
  function whereOf(shop){ return (state.place&&state.place.where)||(shop&&shop.area)||""; }
  function openriceUrl(shop){ return "https://www.openrice.com/zh/hongkong/restaurants?what="+encodeURIComponent(shop.nameZh)+"&where="+encodeURIComponent(whereOf(shop)); }
  function mapsUrl(shop){ return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent((shop.mapsQuery||shop.nameZh)+" 香港"); }
  function applyLang(){
    document.documentElement.lang=state.lang==="zh"?"zh-HK":"en";
    ["titleText","tagline","btnGeo","pickHint","catTitle","shopTitle","btnSpinCat","btnSpinShop","btnAgain","btnMaps","btnOpenrice","btnCopy"].forEach(function(id){
      var map={titleText:"title",tagline:"tagline",btnGeo:"geo",pickHint:"pickHint",catTitle:"cat",shopTitle:"shop",btnSpinCat:"spinCat",btnSpinShop:"spinShop",btnAgain:"again",btnMaps:"maps",btnOpenrice:"openrice",btnCopy:"copy"};
      if($(id)) $(id).textContent=t(map[id]);
    });
    if($("btnChange")) $("btnChange").textContent=t("changeDistrict");
    if($("btnChange2")) $("btnChange2").textContent=t("changeDistrict");
    $("btnSound").textContent=state.sound?t("soundOn"):t("soundOff");
    $("btnZh").classList.toggle("active",state.lang==="zh"); $("btnEn").classList.toggle("active",state.lang==="en");
    renderDistricts(); updateStatus();
    paintWheel("catWheel", CATEGORIES.map(function(c){return c.zh;})); refreshShopWheel();
  }
  function toast(msg){ var el=$("toast"); if(!el) return; el.textContent=msg; el.classList.add("show"); setTimeout(function(){el.classList.remove("show")},1800); }
  function beep(freq,dur){ if(!state.sound) return; try{ var ctx=new (window.AudioContext||window.webkitAudioContext)(); var o=ctx.createOscillator(); var g=ctx.createGain(); o.frequency.value=freq; g.gain.value=0.04; o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur);}catch(e){} }
  function inHongKong(lat,lng){ return lat>=HK.minLat&&lat<=HK.maxLat&&lng>=HK.minLng&&lng<=HK.maxLng; }
  function nearestDistrict(lat,lng){ var best=DISTRICTS[0],bestD=1e9; DISTRICTS.forEach(function(d){ var x=(d.lat-lat)*(d.lat-lat)+(d.lng-lng)*(d.lng-lng); if(x<bestD){bestD=x;best=d;} }); return best; }
  function showView(name){ document.querySelectorAll(".view").forEach(function(v){v.classList.remove("active")}); $(name).classList.add("active"); }
  function districtById(id){ return DISTRICTS.filter(function(d){return d.id===id})[0]||DISTRICTS[0]; }
  function filteredPlaces(){
    var q=(state.pickerQuery||"").trim().toLowerCase();
    return PLACES.filter(function(p){
      if(q) return String(p.name).toLowerCase().indexOf(q)!==-1;
      if(p.cat!==state.pickerCat) return false;
      if(state.pickerCat==="地區" && p.region!==state.pickerRegion) return false;
      return true;
    });
  }
  function renderDistricts(){
    var filters=$("placeFilters"), mount=$("placeMount");
    if(!filters||!mount) return;
    filters.innerHTML="";
    CATS.forEach(function(c){ var b=document.createElement("button"); b.type="button"; b.textContent=c; b.className=state.pickerCat===c?"on":""; b.onclick=function(){ state.pickerCat=c; state.pickerQuery=""; if($("placeSearch")) $("placeSearch").value=""; renderDistricts(); }; filters.appendChild(b); });
    if(state.pickerCat==="地區" && !state.pickerQuery){ REGIONS.forEach(function(r){ var b=document.createElement("button"); b.type="button"; b.textContent=r; b.className=state.pickerRegion===r?"on":""; b.onclick=function(){ state.pickerRegion=r; renderDistricts(); }; filters.appendChild(b); }); }
    var grid=document.createElement("div"); grid.className="place-grid";
    filteredPlaces().forEach(function(p){
      var b=document.createElement("button"); b.type="button";
      b.className="place-btn"+(state.place&&state.place.where===p.where?" on":"");
      b.innerHTML=p.name+"<small>"+p.cat+"</small>";
      b.onclick=function(){ state.place=p; selectDistrict(districtById(p.districtId)); };
      grid.appendChild(b);
    });
    mount.innerHTML=""; mount.appendChild(grid);
  }
  function selectDistrict(d){ state.district=d; if(!state.place) state.place={name:d.zh,where:d.zh,districtId:d.id}; state.catIndex=null; state.shopIndex=null; state.shopPool=[]; updateStatus(); $("btnSpinCat").disabled=false; $("btnSpinShop").disabled=true; $("catPick").textContent=""; $("shopPick").textContent=""; refreshShopWheel(); showView("viewWheels"); }
  function updateStatus(){ var el=$("statusPill"); if(!state.district){ el.textContent=t("pickFirst"); el.classList.remove("ready"); return; } el.textContent=t("now")+"："+((state.place&&state.place.where)||state.district.zh); el.classList.add("ready"); }
  function paintWheel(id,labels){ var wheel=$(id); if(!wheel) return; if(!labels.length) labels=["—"]; var n=labels.length,step=360/n; wheel.style.background="conic-gradient(from -90deg,"+labels.map(function(_,i){return COLORS[i%COLORS.length]+" "+(i*step)+"deg "+((i+1)*step)+"deg"}).join(",")+")"; wheel.querySelectorAll(".wheel-label").forEach(function(node){node.remove()}); labels.forEach(function(label,i){ var span=document.createElement("div"); span.className="wheel-label"; span.style.transform="rotate("+(i*step+step/2-90)+"deg) translate(22px,-7px)"; span.textContent=label.length>10?label.slice(0,9)+"…":label; wheel.appendChild(span); }); }
  function shopsForCurrent(){ if(!state.district||state.catIndex==null) return []; var cat=CATEGORIES[state.catIndex]; return state.restaurants.filter(function(r){return r.districtId===state.district.id && r.category===cat.zh}); }
  function refreshShopWheel(){ state.shopPool=shopsForCurrent(); var labels=state.shopPool.map(function(s){return s.nameZh}); if(!labels.length) labels=["先轉大類"]; paintWheel("shopWheel",labels); }
  function winnerFromRotation(rotation,count){ var deg=((rotation%360)+360)%360; return Math.floor(((360-deg)%360)/(360/count))%count; }
  function spin(kind){
    if(state.spinning||!state.district) return; if(kind==="shop"&&state.catIndex==null) return;
    var labels,el,out;
    if(kind==="cat"){ labels=CATEGORIES.map(function(c){return c.zh}); el=$("catWheel"); out=$("catPick"); }
    else { state.shopPool=shopsForCurrent(); labels=state.shopPool.map(function(s){return s.nameZh}); if(!labels.length) return toast(t("empty")); el=$("shopWheel"); out=$("shopPick"); paintWheel("shopWheel",labels); }
    state.rot[kind]=(state.rot[kind]||0)+1800+Math.floor(Math.random()*360); state.spinning=true; el.classList.add("spinning"); el.style.transform="rotate("+state.rot[kind]+"deg)";
    var tick=setInterval(function(){beep(620,0.03)},90);
    el.addEventListener("transitionend", function(){
      clearInterval(tick); el.classList.remove("spinning"); var idx=winnerFromRotation(state.rot[kind],labels.length);
      if(kind==="cat"){ state.catIndex=idx; state.shopIndex=null; refreshShopWheel(); $("btnSpinShop").disabled=false; out.textContent=t("locked")+"："+labels[idx]; out.classList.add("locked"); state.spinning=false; beep(1180,0.12); }
      else { state.shopIndex=idx; out.textContent=t("locked")+"："+labels[idx]; out.classList.add("locked"); beep(1180,0.12); state.spinning=false; showResult(state.shopPool[idx]); }
    }, {once:true});
  }
  function showResult(shop){
    if(!shop){ $("resultBody").innerHTML="<div class=\"empty\">"+t("empty")+"</div>"; showView("viewResult"); return; }
    var q=encodeURIComponent(shop.nameZh+" "+whereOf(shop)+" 香港");
    $("mapFrame").src="https://maps.google.com/maps?q="+q+"&hl=zh-HK&z=16&output=embed";
    $("btnMaps").href=mapsUrl(shop); $("btnOpenrice").href=openriceUrl(shop); $("btnCopy").dataset.addr=openriceUrl(shop);
    $("resultBody").innerHTML="<h2 class=\"result-name\">"+shop.nameZh+"</h2><p class=\"meta\">"+whereOf(shop)+" · "+shop.category+"</p><p class=\"dish\"><strong>"+t("recommend")+"：</strong>"+shop.recommendDish+"</p>";
    showView("viewResult");
  }
  function locate(){ if(!navigator.geolocation) return toast(t("locateFail")); navigator.geolocation.getCurrentPosition(function(pos){ var lat=pos.coords.latitude,lng=pos.coords.longitude; if(!inHongKong(lat,lng)){ $("hkBanner").classList.add("show"); $("hkBanner").textContent=t("hkOnly"); return; } $("hkBanner").classList.remove("show"); var d=nearestDistrict(lat,lng); state.place={name:d.zh,where:d.zh,districtId:d.id}; selectDistrict(d); }, function(){ toast(t("locateFail")); }, {enableHighAccuracy:true,timeout:8000}); }
  function buildDemoRestaurants(){ var list=[],n=1; DISTRICTS.forEach(function(d){ CATEGORIES.forEach(function(cat){ cat.shops.forEach(function(shop){ list.push({id:"hk-"+String(n++).padStart(3,"0"),nameZh:shop,district:d.zh,districtId:d.id,area:d.zh.replace("區",""),category:cat.zh,recommendDish:cat.dish,mapsQuery:shop+" "+d.zh+" 香港"}); }); }); }); return list; }
  async function loadData(){ try{ var res=await fetch("data/restaurants.json"); if(res.ok){ var json=await res.json(); if(json.restaurants&&json.restaurants.length){ state.restaurants=json.restaurants; return; } } }catch(e){} state.restaurants=buildDemoRestaurants(); }
  function bind(){
    $("btnZh").onclick=function(){ state.lang="zh"; applyLang(); };
    $("btnEn").onclick=function(){ state.lang="en"; applyLang(); };
    $("btnSound").onclick=function(){ state.sound=!state.sound; $("btnSound").textContent=state.sound?t("soundOn"):t("soundOff"); };
    $("btnGeo").onclick=locate;
    if($("placeSearch")) $("placeSearch").oninput=function(){ state.pickerQuery=$("placeSearch").value; renderDistricts(); };
    $("btnSpinCat").onclick=function(){ spin("cat"); };
    $("btnSpinShop").onclick=function(){ spin("shop"); };
    $("btnAgain").onclick=function(){ state.catIndex=null; state.shopIndex=null; $("catPick").textContent=""; $("shopPick").textContent=""; $("btnSpinShop").disabled=true; refreshShopWheel(); showView("viewWheels"); };
    var back=function(){ showView("viewDistrict"); }; $("btnChange").onclick=back; $("btnChange2").onclick=back;
    $("btnCopy").onclick=async function(){ var addr=$("btnCopy").dataset.addr||""; try{ await navigator.clipboard.writeText(addr); toast(t("copied")); }catch(e){ toast(addr); } };
  }
  document.addEventListener("DOMContentLoaded", async function(){ bind(); renderDistricts(); applyLang(); await loadData(); });
})();
