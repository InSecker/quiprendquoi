const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');

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
        url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
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
  axios
    .post(`${process.env.API_URL}/party/${req.params.partyId}/items`, req.body)
    .then(() => res.redirect(`/party/${req.params.partyId}`))
    .catch((err) => res.send(err));
});

app.get('/item/:partyID/:id', function(req, res) {
  axios
    .delete(`${process.env.API_URL}/party/${req.params.partyID}/items/${req.params.id}`)
    .then(() => res.redirect(`/party/${req.params.partyID}`))
    .catch((err) => res.send(err));
});

exports.run = (port) => {
  app.listen(port, () => console.log(`Front app listening on port ${port}!`));
}
