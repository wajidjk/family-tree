const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "node",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "node",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model("node", nodeSchema);

module.exports = Node;
