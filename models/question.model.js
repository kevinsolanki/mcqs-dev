const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      require: true,
    },
    option: [String],
    answer: { type: String, enum: [a, b, c, d] },
    techId: { type: Schema.Types.ObjectId, ref: "tech" },
    level: { type: String, enum: [1, 2, 3] },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("question", questionSchema);
