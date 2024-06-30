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

const Movie = model("Movie", movieSchema);
module.exports = Movie;
