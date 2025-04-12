const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/domain-search', async (req, res) => {
  const { keyword, tlds } = req.body;
  if (!keyword || !tlds) {
    return res.status(400).json({ error: 'Missing keyword or tlds' });
  }

  try {
    const response = await axios.post(
      'https://api.name.com/v4/domains:search',
      { keyword, tlds },
      {
        headers: {
          'Authorization': 'Basic aGFuZ2RvbmdnZ290c29uQGdtYWlsLmNvbTpjZWU3ODA4Mjk2YTIwMzM2ZmU1MDI3YzY0NmU0ZTU2MTU0YTU4YTg5',
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Domain check failed' });
  }
});

app.listen(10000, () => {
  console.log('Proxy server running on port 10000');
});
