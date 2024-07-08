const { Schema, model } = require("mongoose");

const movieSchema = Schema({
  title: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  media_type: {
    type: String,
    enum: ["movie", "tv"],
  },
  movieId: { 
    required: true,
    type: String 
  },  
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
});

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  favoriteMovies: [movieSchema],
  toWatchMovies: [movieSchema],
  watchedMovies: [movieSchema],
});

module.exports = model("User", userSchema);
