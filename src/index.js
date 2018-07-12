const Express = require('express');
const App = Express();

App.get('/', (req, res) => {
  res.send('<html><head><title>LOL A WEBSITE</title></head><body><h1>LOL</h1></body></html>');
});

App.listen(8000, () => console.log('App running on port 8000'));

