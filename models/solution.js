const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  upvotes: {
    type: Number,
    default: 0
  },
  upvotedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Solution", solutionSchema);