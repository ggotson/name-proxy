const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// 프록시 경로
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
          'Authorization': 'Basic aGFuZ2RvbmdnZ290c29uQGdtYWlsLmNvbTpjZWU3ODA4Mjk2YTIwMzM2ZmU1MDI3YzY0NmU0ZTU2MTU0YTU4YTg5',
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error calling Name.com API:', error.response?.data || error.message);
    res.status(500).json({ error: 'API 호출 중 오류 발생', details: error.response?.data });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Name.com Proxy!');
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
