//The code below is first to set the environment 
//then next to require the api key file
require("dotenv").config();
var keys = require("./keys.js");

//I should now be able to access the key information by using
// var spotify = new Spotify(keys.spotify);