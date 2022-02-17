const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  name: { type: String, required: true },
  features: { type: String, required: true },
  price: { type: Number, required: true, min: 0, max: 9999},
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String },
});

// Virtual for manufacturer url
ComponentSchema.virtual("url").get(function () {
  return "/component/" + this._id;
});

module.exports = mongoose.model("Component", ComponentSchema);
