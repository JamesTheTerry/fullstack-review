const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Schema.ObjectId,
  name: String,
  url: String,
  stars: Number,
  username: String,
  userid: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // take the data
  var formatted = {
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count
    username: repo.owner.login,
    userid: repo.owner.id
  }

  Repo.create(formatted, function (err, responseMaybe) {
    if (err) return handleError(err);
    // saved!
  })
}

module.exports.save = save;
