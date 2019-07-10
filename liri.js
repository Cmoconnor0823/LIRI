//The code below is first to set the environment 
//then next to require the api key file
require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
//I should now be able to access the key information by using
// var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//require file system npm
var fs = require("fs");


//found a npm for styling to make it more readable
var chalk = require('chalk');
//grab both which serch the user wants and what they are searching for
var searchOpt = process.argv[2];
var searchParam = process.argv[3];

//call the function to show search results
userSearch(searchOpt, searchParam);
//create a function to show the results maybe **switch case?
function userSearch(searchOpt, searchParam) {
    switch (searchOpt) {
        case "spotify-this-song":
            showSongInfo(searchParam);
            break;

        //stop console log test and creat a default with a error -- this should help varify user input
        case "concert-this":
            showConcertInfo(searchParam);
            break;
        case "movie-this":
            showMovieInfo(searchParam);
            break;
        case "do-what-it-says":
            whatItSaysInfo(searchParam)
            break;

        default:
            console.log("Invalid Search. Please Input from the following options:\nspotify-this-song")
    }
}

//create the function for searching the "random".text file info for a test

//create the 3 different search functions

//Function for spotify
//show artist, song name, preview link, and album, o song provided default to "the sigh"by ace of base
//use the spotify npm
function showSongInfo(searchParam) {
    if (searchParam === undefined) {
        searchParam = "The Sign"; //default choice
    }
    spotify.search(
        {
            type: "track",
            query: searchParam
        },
        function (error, data) {
            if (error) {
                console.log("Error recorded: " + error);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.legnth; i++) {
                console.log(chalk.blue("log.txt", "****Song Info*****\n"));
                fs.appendFileSync("log.txt", "*****Song Info*****\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************************\n");
            }
        }
    );
};
//function for bands in town name of the venue, venue location, date of the event using moment .js
// use this link "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

function showConcertInfo(searchParam) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchParam + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log(chalk.blue("**********EVENT INFO*********"));
                //Append in log.txt file
                fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log(chalk.bgMagenta("Name of the Venue: " + concerts[i].venue.name));
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
                console.log(chalk.bgCyan("Venue Location: " + concerts[i].venue.city));
                fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
                console.log(chalk.bgGreen("Date of the Event: " + concerts[i].datetime));
                fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].datetime + "\n");
                console.log(chalk.blue("*****************************"));
                fs.appendFileSync("log.txt", "*****************************" + "\n");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}


// function for movies "omdb"
//display movie title, year it came out, imdb rating, rotten tomatoes rating
//country where movie was produced, language of the movie, plot, and actors
function showMovieInfo(searchParam) {

    if (searchParam === undefined) {
        searchParam = "Mr. Nobody";
    } 

    var queryUrl = "http://www.omdbapi.com/?t=" + searchParam + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            var movies = JSON.parse(body);
                console.log(chalk.blue("**********Movie INFO*********\n"));
                fs.appendFileSync("log.txt", "**********Movie INFO*********\n");
                
                //console.log(movies);
                //fs.appendFileSync("log.txt", i + "\n");
                
                console.log(chalk.green("Title: " + movies.Title));
                fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
                
                console.log(chalk.green("Release Year: " + movies.Year));
                fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
                
                console.log(chalk.green("IMDB Rating: " + movies.imdbRating));
                fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
                
                console.log(chalk.green("Rotten Tomatoes Rating: " + movies.Ratings[1].Value));
                
                console.log(chalk.green("Country: " + movies.Country));
                
                console.log(chalk.green("Language: " + movies.Language));
                
                console.log(chalk.green("Plot: " + movies.Plot));
                
                console.log(chalk.green("Actors: " + movies.Actors));
                
                console.log(chalk.blue("\n---------------------------------------------------\n"));
            }
        
        });
};