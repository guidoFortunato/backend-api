const { Schema, model } = require("mongoose");

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
  favoriteMovies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  toWatchMovies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  watchedMovies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

module.exports = model("User", userSchema);
