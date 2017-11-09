const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  console.log('Github Username: ', username);

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  var callback = (err, res, body) => {
    if (!err && res.statusCode === 200) {
      var repos = JSON.parse(body);
      // console.log('GITHUB GET RESPONSE\n', data);
      console.log(`Length ${repos.length}\n`);
      repos.forEach((repo) => {
        console.log(`Name: ${repo.name}`);
        console.log(`URL: ${repo.html_url}`);
        console.log(`Username: ${repo.owner.login}`);
        console.log(`Userid: ${repo.owner.id}`);
        console.log(`Stars: ${repo.stargazers_count}\n`);
      });
    }
  }

  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;
