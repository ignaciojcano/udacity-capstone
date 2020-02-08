const mongoose = require("./index");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    text: String,
    complete: { type: Boolean, defaultValue: false }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
