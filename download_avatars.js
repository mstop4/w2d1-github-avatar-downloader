/*---------------------*
 *                     *
 * download_avatars.js *
 *                     *
 *---------------------*/

var request = require('request');

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("mstop4", "FMODGMS", function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
})