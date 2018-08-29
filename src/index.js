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

app.get('/sponsors', (req, res) => {
  res.render('sponsors.html');
});

app.get('/register', (req, res) => {
  res.render('register.html');
});

app.get('/team-organization', (req, res) => {
  res.render('team-organization.html');
});

app.get('/team-organization/build', (req, res) => {
  res.render('subteams/build.html');
})

app.get('/team-organization/CAD', (req, res) => {
  res.render('subteams/CAD.html');
})

app.get('/team-organization/scouting-and-strategy', (req, res) => {
  res.render('subteams/scouting-and-strategy.html');
})

app.listen(8000, () => console.log('App running on port 8000'));
