const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useraccounts = require('./useraccounts');
const app = express();

const environment = nunjucks.configure('src/templates', {
  autoescape: true,
  express: app
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(['/user', '/dashboard'], (req, res, next) => {
  console.log(req.cookies.token);
  if(useraccounts.isValidToken(req.cookies.token)) {
    next();
  } else {
    res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
  }
});

app.use('/', (req, res, next) => {
  environment.addGlobal('loggedIn', useraccounts.isValidToken(req.cookies.token));
  next();
})

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

app.get('/team-requirements', (req, res) => {
  res.render('team-requirements.html');
});

app.get('/mock-kickoff', (req, res) => {
  res.render('mock-kickoff.html');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard.html');
})

app.get('/login', (req, res) => {
  res.render('login.html', { redirect: req.query.redirect, message: req.query.message });
});

app.post('/login-post', (req, res, next) => {
  if(!req.body.username || !req.body.password) {
    res.redirect(`/login?message=${encodeURIComponent('The username and/or password was blank')}`);
  } else {
    useraccounts.checkPassword(req.body.username, req.body.password, function(error, same) {
      if(error) {
        res.redirect(`/login?message=${encodeURIComponent('The username and/or password was incorrect')}`);
      } else {
        if(same) {
          res.cookie('token', useraccounts.genToken(req.body.username));
          if(!req.body.redirect) {
            res.redirect('/');
          } else {
            res.redirect(req.body.redirect);
          }
        } else {
          res.redirect('/login');
        }
      }
    });
  }
});

app.get('/signup', (req, res) => {
  res.render('signup.html', { message: req.query.message });
})

app.post('/signup-post', (req, res, next) => {
  if(!req.body.username || !req.body.password || !req.body["password-conf"]) {
    res.redirect(`/signup?message=${encodeURIComponent('One or more fields was left blank')}`);
  } else if (req.body.password === req.body["password-conf"]) {
    useraccounts.addUser(req.body.username, req.body.password, function(error, isTaken) {
      if(error) {
        res.redirect(`/signup?message=${encodeURIComponent('Something went wrong')}`);
      } else {
        if(isTaken) {
          res.redirect(`/signup?message=${encodeURIComponent('Username already taken')}`);
        } else {
          res.cookie('token', useraccounts.genToken(req.body.username));
          res.redirect('/');
        }
      }
    });
  } else {
    res.redirect(`/signup?message=${encodeURIComponent('Password and password confirmation didn\'t match')}`);
  }
});

app.get('/user/restricted', (req, res) => {
  res.send('BOOM');
});

app.get('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.redirect('/');
})

app.use(function(error, req, res, next) {
  res.status(500).send('Error: 500');
  console.error(error);
});

app.listen(8000, () => console.log(`App running on port 8000 in ${app.get('env')} mode`));
