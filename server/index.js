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
    res.sendStatus(201);
  });

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  console.log('Get request received');

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

let port = 1128;

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${port}`);
});
