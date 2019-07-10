//The code below is first to set the environment 
//then next to require the api key file
require("dotenv").config();
var keys = require("./keys.js");
//I should now be able to access the key information by using
// var spotify = new Spotify(keys.spotify);
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');

//grab both which serch the user wants and what they are searching for
var searchOpt = process.argv[2];
var searchParam = process.argv[3];

//call the function to show search results

//create a function to show the results maybe **switch case?

//stop console log test and creat a default with a error -- this should help varify user input

//create the function for searching the .text file info for a test

//create the 3 different search functions

//Function for spotify

//function for bands in town

// function for movies "omdb"
