const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpires = process.env.JWT_EXPIRES;

const profileSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      "Please provied a vaild email address",
    ],
  },
  password: { type: String, required: true, minlength: 6, select: false },
  favouritRecipes: Array,
  lander: String,
  shopping: String,

  resetPasswordToken: String,
  resetPasswordExpries: Date,
  //add fav
  //pantry
});

//encpty password before saving in database
profileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  //remove the confirm field
  this.passwordConfirm = undefined;
});

//check if password correct
profileSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//get signed token
profileSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, jwtSecret, { expiresIn: jwtExpires });
};

//forgot password
profileSchema.methods.getResetPasswordToken = function () {
  //generate new scecret password token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash the token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //update expires
  this.resetPasswordExpries = Date.now() + 10 * (60 * 1000);

  return resetToken;
};
mongoose.model("profiles", profileSchema);
