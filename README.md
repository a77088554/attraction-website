# 台灣光觀景點推薦網站: Frontend ( React + TypeScript + Vite ) + Backend ( Supabase + Vercel ) 

此為台灣景點推薦網站使用Typescript作為主要程式語言，而非使用Javascript是為了提升型別的嚴格性，以減少執行時會可能發生的錯誤。

而後端的部分為了減少網站的成本所以我使用了Supabase以及Vercel，二者都給予了使用者免費又強大的功能，Supabase提供了簡易但完整的資料庫系統，Vercel提供了Server端的運行環境。

如果是要將現在的網站部屬到Vercel上你可以先將repository內的檔案相clone到本地端，並在根目錄裡添加.env檔案已提供環境參數

.env Exmaple
```env
VITE_SUPABASE_URL=從supabase的資料庫連結點選connection可以找到使用手冊
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=從supabase的資料庫連結點選connection可以找到使用手冊
VITE_WEATHER_API_URL=前往台灣氣象局公開API查詢
VITE_GOOGLE_CLIENT_ID=前往Google Auth Paltform查詢
```

以上是對於環境參數的設置
Supabase環境參數取得
1. 先前往supabase網站註冊: [Supabase網站](https://supabase.com)
2. 到dashboard使用SQL語言去創建Table
3. 到網站的最頂端找到Connect按鈕並將URL、PUBLISHABLE_DEFAULT_KEY放到上面.env檔的參數`(注意: 這兩個內容千萬不可以洩漏)`

台灣氣象局API
1. 前往台灣氣象局公開API: [台灣氣象局公開API](https://opendata.cwa.gov.tw/index)，登入取得授權碼
2. 中央氣象署開放資料平臺之資料擷取API: [API](https://opendata.cwa.gov.tw/dist/opendata-swagger.html#/%E9%A0%90%E5%A0%B1/get_v1_rest_datastore_F_C0032_001)，找到`/v1/rest/datastore/F-C0032-001`取得API-URL

Google Client Auth
1. 前往Google Cloud Paltform登入: [Google Cloud Paltform](https://console.cloud.google.com/projectselector2/apis/dashboard?hl=zh-tw&pli=1&supportedpurview=project)
2. 點選畫面上的建立傳案(在右側)
3. 點選OAuth同意畫面
4. 點選中央的開始，並建立完成
5. 點選右側 建立 OAuth 用戶端，其中已授權的 JavaScript 來源記得將Vercel的所建立了網址給新增上去

如果要將此網頁部屬到Vercel上，`記得一定要將上面的.env內的全部環境參數提供給Vercel去運行`
