const mongoose = require("mongoose");
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  email: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  name: { type: String, unique: true },
});

mongoose.model("ingredient", IngredientSchema);
