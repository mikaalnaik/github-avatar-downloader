var request = require('request');
var secret = require('./secrets.js')
var fs = require('fs');

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName){
    console.log("ERROR BUDDY!")
  }
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : "token " + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    // console.log(res.statusCode);
    var contributorsArray = JSON.parse(body);
    var picURL = []

    cb(err, body);
      for(var i = 0; i < contributorsArray.length; i++){
        // picURL.push(contributorsArray[i].avatar_url);
        downloadImageByURL(contributorsArray[i].avatar_url, contributorsArray[i].login)
      }
  });
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:");
});


function downloadImageByURL(url, filePath) {
request.get(url)               // Note 1
       .on('error', function (err) {                                  
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode)
         console.log('Downloaded image ....')
       })
       .pipe(fs.createWriteStream('./downloadImageByURl/' + filePath + ".png"));
         console.log('Downloading image...');
       }
