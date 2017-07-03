/*---------------------*
 *                     *
 * download_avatars.js *
 *                     *
 *---------------------*/

// Init packages
var request = require("request");
var fs = require("fs");

// GitHub info
var GITHUB_USER = "mstop4";
var GITHUB_TOKEN = "ae8066a4e51b2e538d0b9f636b46f1b60f3f5b1e";
var repoOwner = "jquery";
var repoName = "jquery";

// Local info
var avatarDir = "./avatars"

// Displays a download confirmation
function dlComplete(filePath) {
  console.log("Avatar downloaded to: " + filePath);
}

// Creates a directory if it doesn't already exist
function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

// Downloads inamge from url to filePath on local machine
function downloadImageByURL(url, filePath) {

  request.get(url)
         .on("error", function (err) {
            console.log("Error downloading image!");
            throw err;
         })
         .on("response", function (response) {
            //console.log("Response Status Code: ", response.statusCode);
            //console.log("Content Type: ", response.headers["content-type"]);
            console.log("Downloading avatar from " + url + " ...");
         })
         .pipe(fs.createWriteStream(filePath)
                 .on("finish", function () { dlComplete(filePath) }));    // show message when download is complete
}

// parses contributor list for relavant information (avatar URL, login name)
function parseContributors(contributorList) {

  //Parse string -> JSON
  var contrib_JSON = JSON.parse(contributorList);

  // Start downloading contributors' avatars
  for (var i = 0; i < contrib_JSON.length; i++ ) {
    downloadImageByURL(contrib_JSON[i]["avatar_url"] ,avatarDir + "/" + contrib_JSON[i]["login"] + ".png");
  }
}

// Get the avatars of all contributors for a repo
function getRepoContributors(repoOwner, repoName, cb) {

  // request options for Github
  var options = {
    url: "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "GitHub Avatar Downloader - Student Project"
    }
  };

  console.log("Fetching from: " + options.url + "...");

  // begin request
  request(options, function (error, response, body) {

    // Check for errors
    console.log("Status Code: " + response.statusCode);
    if (error !== null && response.statusCode !== 200) {
      console.log("Error! Can't fetch data!");
      return;
    }

    // Process body
    else {
      cb.apply(this,[body]);
    }
  });
}

// Start
console.log("Welcome to the GitHub Avatar Downloader!");

createDir(avatarDir);
getRepoContributors(repoOwner, repoName, parseContributors);
