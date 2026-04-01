const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

// 關鍵字回覆設定
const keywordReplies = {
  '估車': {
    type: '估車諮詢',
    reply: '歡迎估車！請提供：\n1. 車款（品牌+型號）\n2. 年份\n3. 里程數\n4. 顏色\n我幫您評估！'
  },
  '看車': {
    type: '看車預約',
    reply: '歡迎來看車！\n請問您想看什麼車款？\n我們有多種車型可供選擇！'
  },
  '價格': {
    type: '價格詢問',
    reply: '請稍等，我幫您查詢最新價格！'
  },
  '地址': {
    type: '地址諮詢',
    reply: '我們的地址在：\n【台中市】\n請問您從哪邊過來呢？我可以幫您指引路线！'
  },
  '營業': {
    type: '營業時間',
    reply: '營業時間：\n平日 9:00 - 18:00\n假日 10:00 - 17:00\n歡迎來訪！'
  },
  '電話': {
    type: '聯絡方式',
    reply: '電話：請洽詢 LINE 客服\nLINE ID：@plus2_car\n歡迎加好友！'
  }
};

// 預設回覆
const defaultReply = '感謝您的訊息！\n我們是 富胖達汽車 / 賢哥企業社\n請告訴我您想要的服務：\n1. 估車\n2. 看車\n3. 買車\n4. 賣車\n我會儘快為您服務！';

// 統一回覆函數
function getReply(text) {
  const lowerText = text.toLowerCase();
  
  for (const [keyword, data] of Object.entries(keywordReplies)) {
    if (lowerText.includes(keyword)) {
      return {
        type: data.type,
        reply: data.reply
      };
    }
  }
  
  return {
    type: '一般詢問',
    reply: defaultReply
  };
}

// 處理訊息
async function handleMessage(event) {
  const userMessage = event.message.text;
  const { type, reply } = getReply(userMessage);
  
  console.log(`[${type}] 使用者: ${userMessage}`);
  
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: reply
  });
}

// Lambda handler
exports.handler = async (event, context) => {
  // CORS 預檢請求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      },
      body: ''
    };
  }
  
  try {
    const body = JSON.parse(event.body);
    const events = body.events;
    
    console.log('Received events:', JSON.stringify(events));
    
    if (events && events.length > 0) {
      await Promise.all(events.map(handleMessage));
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
