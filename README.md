# 香港搜食輪盤 · HK Eat Wheel

專為**香港特別行政區**而設嘅食店輪盤網站。只覆蓋民政事務總署 18 區，介面預設繁體中文（香港用字）。

**證明呢個網站係香港用：**

- 地區鎖定香港 18 區，冇內地／台灣／海外選項
- 主語言繁體中文，港式分類（茶餐廳、燒味、車仔麵、糖水）
- 地址格式為香港街道＋舖號，地圖搜尋必加「香港」
- 定位若唔喺香港範圍，會提示「本站只服務香港地區」
- 頁尾寫明 ` 專為香港而設 · Hong Kong Only` 並列出 18 區

演示資料係虛構店名配該區真實街道，方便離線展示，唔係真實營業名單。

## 本機開啟

任何靜態伺服器都可以。因為要用 `fetch` 讀 `data/restaurants.json`，唔好直接雙擊打開檔案（會被瀏覽器 CORS 擋住）。

```bash
# Python
python3 -m http.server 8080

# 或 Node
npx serve .
```

然後開 <http://127.0.0.1:8080>

## 部署 GitHub Pages

1. Repo 用 `main` 做預設分支（本專案根目錄就係網站根目錄）
2. GitHub → Settings → Pages → Build and deployment
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
3. 幾分鐘後網站會喺：

`https://jeffchan0726.github.io/hk-sik-roulette/`

## 點用

1. 「用我而家位置」或手動撿 18 區
2. 轉大類 → 轉細類 →（可選）轉預算
3. 撲「開飯！」隨機抽出該區配對食店
4. 睇推薦、地址、Google 地圖；可複製地址或再開 Maps

抽獎邏輯：先 `district + category + subcategory`，細類冇店就 fallback 去大類；預算「唔限」或冇對應預算都同樣 fallback。

## 之後加真實食店數據

而家用 `data/restaurants.json`。可以改 `js/app.js` 的 `loadData()` 接：

- Google Places API（`region=hk`、`language=zh-HK`）
- 食環署持牌食肆開放數據 / [hkregister.com restaurants](https://hkregister.com/dataset/restaurants)

唔好把 API key 寫死喺前端；要用的話請放 GitHub Secrets 或自己的後端 proxy。

## 檔案

```
index.html
css/style.css
js/app.js
data/restaurants.json
scripts/gen_data.py
```

重新產生演示資料：

```bash
python3 scripts/gen_data.py
```
