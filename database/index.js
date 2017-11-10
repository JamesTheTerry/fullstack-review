const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher'); // dev
mongoose.connect(process.env.MONGODB_URI); // production
const Promise = require("bluebird");

// might also want to put in index: true to have this be the index (can i have nonsequential indexs?)
let repoSchema = mongoose.Schema({
  id: {type: Number, index: true, unique: true},
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
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    username: repo.owner.login,
    userid: repo.owner.id
  }
  // console.log('saving it');
  Repo.create(formatted, function (err, responseMaybe) {
    if (err) {
      if (err['code'] === 11000) {
        console.log('Duplicate Detected');
      } else {
        console.log('Mongo error: ', err);
      }
    }
    else {
      console.log('Item in db created');
    };
    // saved!
  });
}

let read = () => {
  return new Promise(function(resolve, reject) {
    Repo.find({}).sort({ stars: -1 }).limit(25).exec(function(err, data) {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(data);
        // the data is what you want, it's an array of objects
        // console.log(data);
      }
    });
  });
}

let getCount = () => {
  return new Promise(function(resolve, reject) {
    Repo.count().exec(function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports.save = save;
module.exports.read = read;
module.exports.getCount = getCount;
