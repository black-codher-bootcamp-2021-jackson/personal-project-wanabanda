const mongoose = require("mongoose");
const { Schema } = mongoose;
const Profile = mongoose.model("profiles");
const IngredientSchema = new Schema({
  creadtedBy: { type: Schema.Types.ObjectId, ref: "profile" },
  name: String,
});

mongoose.model("ingredient", IngredientSchema);
