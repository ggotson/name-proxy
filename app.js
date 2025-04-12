const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

app.post('/check-domain', async (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(400).json({ error: '도메인이 필요합니다.' });
  }

  try {
    const response = await axios.post(
      'https://api.name.com/v4/domains:check',
      {
        domainNames: [domain]
      },
      {
        headers: {
          Authorization: 'Basic 여기에_토큰을_넣으세요', // 🔐 base64 인코딩된 username:token 입력
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('에러 발생:', error.response?.data || error.message);
    res.status(500).json({ error: '도메인 체크 중 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
