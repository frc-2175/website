const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app
});

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/sponsors.html', (req, res) => {
  res.render('sponsors.html');
});

app.listen(8000, () => console.log('App running on port 8000'));
