# LINE Bot - 寶輩汽車

## 安裝步驟

### 1. GitHub - 建立 Repository
1. 前往 https://github.com/new
2. Repository name: `line-bot-babyinternational`
3. 不要勾選 Initialize repository
4. 點擊 Create repository

### 2. 上傳代碼到 GitHub
```bash
cd ~/Desktop/line-bot-babyinternational
git init
git add .
git commit -m "Initial LINE Bot code"
git branch -M main
git remote add origin https://github.com/julianne920910/line-bot-babyinternational.git
git push -u origin main
```

### 3. Vercel 部署
1. 前往 https://vercel.com
2. 點擊 "Import Project"
3. 選擇 `line-bot-babyinternational` repository
4. Framework: Other
5. 點擊 Deploy

### 4. 設定環境變數
在 Vercel Project Settings → Environment Variables 設定：
- `LINE_ACCESS_TOKEN` = 你的 LINE Channel Access Token
- `LINE_CHANNEL_SECRET` = 你的 LINE Channel Secret

### 5. 複製 Webhook URL
1. Vercel 部署完成後，複製 URL
2. 例如: `https://line-bot-babyinternational.vercel.app`

### 6. LINE Developer Console
1. 前往 https://developers.line.biz/console/
2. 選擇你的 Provider
3. 選擇 Messaging API channel
4. Webhook settings:
   - Webhook URL: `https://line-bot-babyinternational.vercel.app/webhook`
   - 啟用 Webhook
5. 關閉 Auto-reply messages（用我們的代碼）

---

## 功能

### 關鍵字回覆
| 關鍵字 | 回覆內容 |
|--------|---------|
| 估車 | 引導提供車輛資料 |
| 看車 | 預約看車 |
| 價格 | 查詢價格 |
| 地址 | 提供地址 |
| 營業 | 營業時間 |
| 電話 | 聯絡方式 |

### 自訂回覆
編輯 `index.js` 中的 `keywordReplies` 物件即可修改回覆內容。
