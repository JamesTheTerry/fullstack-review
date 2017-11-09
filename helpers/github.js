const request = require('request');
const config = require('../config.js');
const Promise = require("bluebird");

let getReposByUsername = (username, outsideCallback) => {
  return new Promise(function(resolve, reject) {
    console.log('Github Username: ', username);

    let options = {
      url: `https://api.github.com/users/${username}/repos`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    };

    var callback = (err, res, body) => {
      if (err) { reject(err); }
      if (!err && res.statusCode === 200) {
        var repos = JSON.parse(body);
        repos.forEach((repo) => {
          console.log(`Repo Id: ${repo.id}`);
          console.log(`Name: ${repo.name}`);
          console.log(`URL: ${repo.html_url}`);
          console.log(`Username: ${repo.owner.login}`);
          console.log(`Userid: ${repo.owner.id}`);
          console.log(`Stars: ${repo.stargazers_count}\n`);
        });
        resolve(repos);
      }
    }

    request(options, callback);
  });
}

module.exports.getReposByUsername = getReposByUsername;
