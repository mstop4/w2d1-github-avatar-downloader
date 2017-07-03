/*---------------------*
 *                     *
 * download_avatars.js *
 *                     *
 *---------------------*/

// Variables
// ---------------------

// Init packages
var request = require("request");
var fs = require("fs");

// GitHub info
var GITHUB_USER = "mstop4";
var GITHUB_TOKEN = "ae8066a4e51b2e538d0b9f636b46f1b60f3f5b1e";
var repoOwner = process.argv[2];
var repoName = process.argv[3];

// Local info
var avatarDir = "./avatars"


// Functions
// ---------------------

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

// Downloads an image from url to filePath on local machine
function downloadImageByURL(url, filePath) {

  request.get(url)
         .on("error", function (err) {
            console.log("Error downloading image!");
            throw err;
         })
         .on("response", function (response) {
            console.log("Downloading avatar from " + url + " ...");
         })
         .pipe(fs.createWriteStream(filePath)
                 // Show message when download is complete
                 .on("finish", function () { dlComplete(filePath) }));
}

// Parses contributor list for relavant information (avatar URL, login name), then downloads avatars
function parseContributors(contributorList) {

  //Parse string -> JSON
  var contrib_JSON = JSON.parse(contributorList);

  for (var i = 0; i < contrib_JSON.length; i++ ) {
    downloadImageByURL(contrib_JSON[i]["avatar_url"] ,avatarDir + "/" + contrib_JSON[i]["login"] + ".png");
  }
}

// Get the avatars of all contributors for a repo
function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "GitHub Avatar Downloader - Student Project"
    }
  };

  // Begin request
  console.log("Fetching from: " + options.url + " ...\n");
  request(options, function (error, response, body) {

    if (error !== null && response.statusCode !== 200) {
      console.log("Error! Can't fetch data!");
      return;
    } else {
      console.log("Processing contributors...\n")
      cb.apply(this,[body]);
    }
  });
}

// Start here
// ------------------

console.log("\nWelcome to the GitHub Avatar Downloader!\n");

// Check for valid arguments, quit if arguments are not valid
if (!repoOwner || !repoName) {
  console.log("Error! Invalid arguments.");
  console.log("Usage: node download_avatars.js repoOwner repoName");
  return;
}

// Create directory if necessary, then download avatars
createDir(avatarDir);
getRepoContributors(repoOwner, repoName, parseContributors);
