console.log('this is loaded keys.js');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};


//omdb key is fe398fbb
//send all data request to http://www.omdbapi.com/?apikey=[yourkey]&