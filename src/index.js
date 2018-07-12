const Express = require('express');
const App = Express();

App.get('/', (req, res) => {
  res.send('Fighting Calculators');
});

App.listen(8000, () => console.log('App running on port 8000'));

