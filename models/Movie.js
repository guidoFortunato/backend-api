const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function () {
      return this.media_type === "movie";
    },
  },
  // name: {
  //   type: String,
  //   required: function () {
  //     return this.media_type === "tv";
  //   },
  // },
  media_type: {
    type: String,
    required: true,
    enum: ["movie", "tv"],
  },
  description: { 
    type: String 
  },
  releaseDate: { 
    type: Date 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
