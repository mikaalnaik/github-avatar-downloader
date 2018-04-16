var request = require('request');
var secret = require('./secrets.js')

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : "token " + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    console.log(res.statusCode);
    var contributorsArray = JSON.parse(body);
    var picURL = []

    cb(err, body);
      for(var i = 0; i < contributorsArray.length; i++){
        picURL.push(contributorsArray[i].avatar_url);
      }
      return picURL;
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:" ,picURL);
});
