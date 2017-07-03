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
var requestURL = "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

console.log(requestURL);

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
})