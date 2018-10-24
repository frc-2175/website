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

app.get('/team-history', (req, res) => {
  res.render('team-history.html');
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

app.get('/team-organization/awards', (req, res) => {
  res.render('subteams/awards.html');
});

app.get('/team-organization/build', (req, res) => {
  res.render('subteams/build.html');
});

app.get('/team-organization/business', (req, res) => {
  res.render('subteams/business.html');
});

app.get('/team-organization/CAD', (req, res) => {
  res.render('subteams/CAD.html');
});

app.get('/team-organization/code', (req, res) => {
  res.render('subteams/code.html');
});

app.get('/team-organization/electronics', (req, res) => {
  res.render('subteams/electronics.html');
});

app.get('/team-organization/marketing-and-imagery', (req, res) => {
  res.render('subteams/marketing-and-imagery.html');
});

app.get('/team-organization/media-and-online-presence', (req, res) => {
  res.render('subteams/media-and-online-presence.html');
});

app.get('/team-organization/outreach', (req, res) => {
  res.render('subteams/outreach.html');
});

app.get('/team-organization/scouting-and-strategy', (req, res) => {
  res.render('subteams/scouting-and-strategy.html');
});

app.get('/past-robots', (req, res) => {
  res.render('past-robots.html');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard.html');
})

app.listen(8000, () => console.log(`App running on port 8000 in ${app.get('env')} mode`));
