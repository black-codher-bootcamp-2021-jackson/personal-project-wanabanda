const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedRecipesSchema = new Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  id: {},
  title: String,
  image: String,
});
