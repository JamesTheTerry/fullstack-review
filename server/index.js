const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  console.log(req.body); // {username: 'JamesTheTerry' }
  github.getReposByUsername(req.body.username)
  .then(repos => {
    repos.forEach(repo => {
      db.save(repo);
    })
    res.send(201);
  });

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  db.read()
  .then(data => {
    console.log(data);
    res.send(200);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
