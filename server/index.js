const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

app.options('/*', function(req, res) {
  res.set(defaultCorsHeaders);
  res.status(200).end();
});

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  res.set(defaultCorsHeaders);
  console.log(req.body); // {username: 'JamesTheTerry' }
  github.getReposByUsername(req.body.username)
  .then(repos => {
    repos.forEach(repo => {
      db.save(repo);
    })
    res.sendStatus(201);
  });

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  console.log('Get request received');
  res.set(defaultCorsHeaders);
  db.getCount()
  .then(data => {
    console.log('DB COUNT', data);
  });

  db.read()
  .then(repos => {
    console.log('Data in the Repo get', repos);

    db.getCount()
    .then(count => {
      console.log('Number of repos in db', count);

      var data = {}
      data.repos = repos;
      data.count = count;

      res.send(200, JSON.stringify(data));
    });
  });

});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
