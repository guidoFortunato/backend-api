const { Schema, model } = require("mongoose");

const movieSchema = Schema({
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
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
});

const Movie = model("Movie", movieSchema);
module.exports = Movie;
