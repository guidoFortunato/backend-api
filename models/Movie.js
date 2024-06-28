const { Schema, model } = require("mongoose");

const movieSchema = Schema({
  title: {
    required: true,
    type: String,
  },
  image: {
    type: String,
  },
  media_type: {
    type: String,
    enum: ["movie", "tv"],
  },
  description: { 
    type: String 
  },
  movieId: { 
    type: String 
  },
  releaseDate: { 
    type: Date 
  },
  
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
});

const Movie = model("Movie", movieSchema);
module.exports = Movie;
