const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Fighting Calculators');
});

app.get('/user/:name/', (req, res) => {
  res.send("Hello there, " + req.params.name);
});

app.listen(8000, () => console.log('App running on port 8000'));

