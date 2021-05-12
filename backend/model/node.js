const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// dhusgdusd
const nodeSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: String,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "node",
      default: null,
    },
    children: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "node",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model("node", nodeSchema);

module.exports = Node;
