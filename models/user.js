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
  movies: [
    { 
      type: Schema.Types.ObjectId,
      ref: "Movie" 
    }
  ],
});

module.exports = model("User", userSchema);
