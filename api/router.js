const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const common = require('./common')
const compression = require('compression')

app.use(compression({ filter: shouldCompress, level:9 }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('pwa'));
app.set('view engine', 'pug');

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

app.get('/', function(req, res) {
  res.render('index', {title: 'Qui prend quoi ?'});
});

app.get('/party/:id', function(req, res) {
  axios
    .get(`${process.env.API_URL}/party/${req.params.id}`)
    .then(({ data }) =>
      res.render('party', {
        party: data,
        title: data.name,
        url: `${process.env.PORT}/party/${data._id}`
      }),
    )
    .catch((err) => console.log(err));
});

app.post('/party', function(req, res) {
  axios
    .post(`${process.env.API_URL}/party`, req.body)
    .then(({data}) => res.redirect(`/party/${data._id}`))
    .catch((err) => res.send(err));
});

app.post('/item/:partyId', function(req, res) {
  common.addItem(req.params.partyId, req.body)
    .then(res.redirect(`/party/${req.params.partyId}`))
});

app.get('/item/:partyID/:id', function(req, res) {
  common.deleteItem(req.params.partyID, req.params.id)
    .then(() => res.redirect(`/party/${req.params.partyID}`))
});

exports.run = (port) => {
  app.listen(port, () => console.log(`Front app listening on port ${port}!`));
}
