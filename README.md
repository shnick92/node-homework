# node-homework
Node based liri CLI that takes in commands for Twitter, Spotify, OMDB, and using the random.txt file.

If you type in "node liri.js spotify-this-song <song name>" you will get a response with the artist name, album name, song title, and a URL to preview it using spotify.
  
If you type in "node liri.js my-tweets" you will get a response with my previous 20 tweets

If you type in "node liri.js movie-this <movie name>" you will get a response with the title, date released, IMDB score, RT score, what country the movie was produced in, what language(s) the movie is in, a short plot summary, and who the cast is.
  
If you type in "node liri.js do-what-it-says" the module will read the random.txt file and run the command on there (in this case spotify-this-song for "I Want it That Way").
