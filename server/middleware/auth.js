const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Profile = mongoose.model("profiles");
jwtSecret = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(res.status(401).send("Not authorized to access this route"));
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const profile = await Profile.findById(decoded.id);

    if (!profile) {
      return next(res.status(404).send("No user found with this id"));
    }

    req.profile = profile;

    next();
  } catch (err) {
    return next(res.status(404).send("Not authorized to access this router"));
  }
};
