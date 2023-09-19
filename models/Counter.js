const { Schema, default: mongoose } = require("mongoose");

const CounterSchema = new Schema({
    name: String,
    seq: {
      type: Number,
      default: 452079
    }
  })
  
  module.exports = Counter = mongoose.model("Counter", CounterSchema);
  