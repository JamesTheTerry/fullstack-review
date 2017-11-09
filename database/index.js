const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // id: Schema.ObjectId,
  id: {type: Number, unique: true}, // might also want to put in index: true to have this be the index (can i have nonsequential indexs?)
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
    id: id,
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count
    username: repo.owner.login,
    userid: repo.owner.id
  }

  Repo.create(formatted, function (err, responseMaybe) {
    if (err) return handleError(err);
    console.log('Item in db created');
    // saved!
  })
}

module.exports.save = save;
