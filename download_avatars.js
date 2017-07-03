/*---------------------*
 *                     *
 * download_avatars.js *
 *                     *
 *---------------------*/

// Init packages
var request = require('request');

// GitHub info
var GITHUB_USER = "mstop4";
var GITHUB_TOKEN = "ae8066a4e51b2e538d0b9f636b46f1b60f3f5b1e";
var repoOwner = "mstop4";
var repoName = "FMODGMS";

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  console.log("Fetching from: " + options.url + "...");

  // begin request
  request(options, function (error, response, body) {

    // Check for errors
    console.log("Status Code: " + response.statusCode);
    if (error !== null && response.statusCode !== 200) {
      console.log("Error! Can't fetch data!");
      throw error;
    }


    else {
      console.log(body);
    }

  });
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
})