const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();

const environment = nunjucks.configure('src/templates', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({ extended: true }));

// Any time a request is made, we log some things and add some global vars.
app.use('/', (req, res, next) => {
    console.log(req.originalUrl);
    next();
})

app.use('/static', express.static('static'));

// Big massive list of routes
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

app.get('/team-organization/safety', (req, res) => {
    res.render('subteams/safety.html');
});
app.get('/past-robots', (req, res) => {
    res.render('past-robots.html');
});

app.get('/team-requirements', (req, res) => {
    res.render('team-requirements.html');
});

app.get('/mock-kickoff', (req, res) => {
    res.render('mock-kickoff.html');
});

// Super basic (and bad) error handling
app.use(function(error, req, res, next) {
    res.status(500).send('Error: 500');
    console.error(error);
});

// Sets the port and logs the environment mode
app.listen(2175, () => console.log(`App running on port 2175 in ${app.get('env')} mode`));
