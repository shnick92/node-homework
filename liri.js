require("dotenv").config();

var keys = require("./keys.js");
var songs = require('node-spotify-api');
var fs = require("fs");
var request = require("request");
var inquirer = require("inquirer");
var tweet = require('twitter');
var input = process.argv;
var command = process.argv[2];
var what = [];
for (var i = 3; i < input.length; i++) {
	what.push(input[i])
}
what = what.join(" ");


// ----------------------------------------------------------

// Spotify client

function spotifySearch(){
	if (what !== 0) {
		var spotify = new songs(keys.spotify);	
		spotify.search({ type: 'track', query: what, limit: 1 }, function(err, data, response) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Song name: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
		});
	} else {
		spotify.search({ type: 'track', query: 'The Sign Ace of Base' }, function(err, data, response) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Song name: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
		});
	}
};

if (command === "spotify-this-song") {
	spotifySearch();
};

//--------------------------------------------------------------

//Twitter client
function tweets(){
	var twitter = new tweet(keys.twitter);
	var params = {screen_name: 'shnick92'};
	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < 19; i++) {
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log("-----------------------------------------------------")
			}
		}
	});
};

if (command === "my-tweets") {
	tweets();	
};

//--------------------------------------------------------------

//OMDB client
function movieOMDB(){
	if (what !== 0) {
		var queryUrl = "http://www.omdbapi.com/?t=" + what + "&y=&plot=short&apikey=trilogy";
		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("The Title of this movie is: " + JSON.parse(body).Title);
				console.log(JSON.parse(body).Title + "'s release date is: " + JSON.parse(body).Released);
				console.log(JSON.parse(body).Title + "'s IMDB score is: " + JSON.parse(body).Ratings[0].Value);
				console.log(JSON.parse(body).Title + "'s RT score is: " + JSON.parse(body).Ratings[1].Value);
				console.log(JSON.parse(body).Title + " was produced in: " + JSON.parse(body).Country);
				console.log(JSON.parse(body).Title + "'s language is: " + JSON.parse(body).Language);
				console.log(JSON.parse(body).Title + "'s plot is: " + JSON.parse(body).Plot);
				console.log(JSON.parse(body).Title + "'s cast is: " + JSON.parse(body).Actors);
			}
		});
	} else{
		request("http://www.omdbapi.com/?t=Mr-Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("The Title of this movie is: " + JSON.parse(body).Title);
				console.log(JSON.parse(body).Title + "'s release date is: " + JSON.parse(body).Released);
				console.log(JSON.parse(body).Title + "'s IMDB score is: " + JSON.parse(body).Ratings[0].Value);
				console.log(JSON.parse(body).Title + "'s RT score is: " + JSON.parse(body).Ratings[1].Value);
				console.log(JSON.parse(body).Title + " was produced in: " + JSON.parse(body).Country);
				console.log(JSON.parse(body).Title + "'s language is: " + JSON.parse(body).Language);
				console.log(JSON.parse(body).Title + "'s plot is: " + JSON.parse(body).Plot);
				console.log(JSON.parse(body).Title + "'s cast is: " + JSON.parse(body).Actors);
			}
		});
	}
};

if (command === "movie-this") {
	movieOMDB();
};

// -----------------------------------------------------------------

// do what it says
function DWITS(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}
		var dataArray = data.split(",");
		command = dataArray[0]
		what = dataArray[1]

		if (dataArray[0] === "spotify-this-song") {
			spotifySearch(dataArray[1]);
		}
	});
};

if (command === "do-what-it-says") {
	DWITS();
};