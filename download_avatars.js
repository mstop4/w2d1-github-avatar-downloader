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
var repoOwner = "mstop4";
var repoName = "FMODGMS";

var avatarDir = "./avatars"

function dlComplete(message) {
  console.log("Avatar downloaded to: " + message);
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

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

function parseContributors(contributorList) {

  //Parse string -> JSON
  var contrib_JSON = JSON.parse(contributorList);

  for (var i = 0; i < contrib_JSON.length; i++ ) {
    //console.log(contrib_JSON[i]['login']);
    downloadImageByURL(contrib_JSON[i]["avatar_url"] ,avatarDir + "/" + contrib_JSON[i]["login"] + ".png");
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
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
      throw error;
    }

    else {
      cb.apply(this,[body]);
    }
  });
}

// Start
console.log("Welcome to the GitHub Avatar Downloader!");

createDir(avatarDir);
getRepoContributors(repoOwner, repoName, parseContributors);
