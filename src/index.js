const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/user/:name/', (req, res) => {
  res.send("Hello there, " + req.params.name);
});

app.listen(8000, () => console.log('App running on port 8000'));

