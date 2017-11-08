const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Schema.ObjectId,
  name: String,
  url: String,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // take the data
  var formatted = {
    name: data.name,
    url: data.html_url,
    stars: data.stargazers_count
    username: data.owner.login,
    userid: data.owner.id
  }

  Repo.create(formatted, function (err, responseMaybe) {
    if (err) return handleError(err);
    // saved!
  })
}

module.exports.save = save;
