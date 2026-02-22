# 台灣光觀景點推薦網站: Frontend ( React + TypeScript + Vite + Tailwindcss ) + Backend ( Supabase + Vercel ) 

作品網址: [台灣光觀景點推薦網站](https://attraction-website.vercel.app)

此為台灣景點推薦網站使用Typescript作為主要程式語言，而非使用Javascript是為了提升型別的嚴格性，以減少執行時會可能發生的錯誤。

使用Tailwindcss提升每種裝置的使用者，Tailwindcss提供了對於各種裝置畫面大小的畫面設置編排。

而後端的部分為了減少網站的成本所以我使用了Supabase以及Vercel，二者都給予了使用者免費又強大的功能，Supabase提供了簡易但完整的資料庫系統，Vercel提供了Server端的運行環境。

如果是要將現在的網站部屬到Vercel上你可以先將repository內的檔案相clone到本地端，並在根目錄裡添加.env檔案已提供環境參數。

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

## 為何建立一個觀光推薦網站，網頁的技能選擇

有次與朋友計畫出門去其他縣市遊玩，那時大家花了許多的時間查詢了許多的景點，那如果我們可以將所有的景點做一個統整讓使用者有一個更加便利的方式找到了其他人推薦的景點。

因此我創建了這個網站，在網站中撰寫了前端的邏輯、API串接、Google OAuth以及畫面上的編排，其中對於後端相關的部分如果是要將網站上傳到網路上需要的有伺服器、雲端以及資料庫安全，這些部分對於我來說是十分的困難的，伺服器雲端都是需要花費資金去租，所以我是使用Vercel去解決後端相關，Vercel提供了部屬網站的功能、環境參數安全、提供免費的網域。

為了完成觀光地點的儲存，所以我需要一個資料庫，而Vercel提供的是網頁的靜態需求，所以不包含資料庫，因此我找了Supabase雖然他提供的是簡易的資料庫功能，但也已經是十分足夠，在Supabase中我創建了兩個Table去儲存資料，一個是attraction Table專門儲存顯示於網頁的觀光景點，另一個是Suggest Table用於儲存使用者想推薦的觀光景點，而在這項專案中我還加入了Google登入，我去NPM裡面找到了Google OAuth的Model，這個Model處裡了Google OAuth相關的問題，這樣我就可以暫時取的使用者的Email、使用者名稱，而這兩項我會用於登記Suggest Table裡面email、name這兩個column的資料。為了提升不同使用者設備的使用體感，所以選用了Tailwindcss，Tailwindcss提供對於手機、平板、筆電以及桌上型電腦，使得RWD的設計變得較容易。

最後做出的網站，功能上也都有執行到，但畫面的UI可能還有待調整，使用者體驗上也相較於以往需要Google搜索各式各樣的旅遊指南提升了不少，但目前資料庫的資料量還有點少，所以需要添加一些資料。成本的部分就需要依照使用者流量做決定，如果使用者流量夠多的時候Vercel就會需要使用付費方案，Supabase也是，到時就需要前往向AWS EC2、Google Cloud等，租用這些雲端功能建立後段伺服器，並且購買一個合適的Domain，這些花費可能就需要一個月3000~4000如果流量更多就需要再往上添加，但以目前網站demo的情況是不需要使用到付費專案。

## 總體網頁流程圖
<img width="429" height="568" alt="image" src="https://github.com/user-attachments/assets/20c34fb2-939e-49a6-9c9d-f6532dd2da27" />
