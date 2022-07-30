const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
const BoardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
    },
    product_type: {
      type: String,
      required: true,
    },
    price: {
      type: Number
      // required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required:
    },
    views: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);
BoardSchema.index(
  {
    title: "text",
    body: "text",
  },
  {
    weights: {
      title: 5,
      body: 1,
    },
  }
);

autoIncrement.initialize(mongoose.connection);
BoardSchema.plugin(autoIncrement.plugin, {
  model: "Board",
  field: "product_id",
  startAt: 1, //시작
  increment: 1, // 증가
});
const Board = mongoose.model("Board", BoardSchema);

module.exports = { Board };
