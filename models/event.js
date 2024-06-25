const { Schema, model } = require("mongoose");

const eventSchema = Schema({

  title: {
    type: String,
    required: true
  },

  notes: {
    type: String,
    
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }


});

eventSchema.method('toJSON', function(){
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})



module.exports = model("Event", eventSchema);
