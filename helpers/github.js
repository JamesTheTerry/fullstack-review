const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  // I dont want to use options, cause I want to use the $.get shorthand this would be great if I did a jquery ajax request
  // let options = {
  //   url: `https://api.github.com/users/${username}/repos`,
  //   headers: {
  //     'User-Agent': 'request',
  //     'Authorization': `token ${config.TOKEN}`
  //   }
  // };

  console.log('Github Username: ', username);

  let headers = {
    'User-Agent': 'request',
    'Authorization': `token ${config.TOKEN}`
  }

  $.get(`https://api.github.com/users/${username}/repos`, headers, function(data) {
    console.log(data);
  }, 'json');

}

module.exports.getReposByUsername = getReposByUsername;
