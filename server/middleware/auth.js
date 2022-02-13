const jwt = require("jsonwebtoken");
const Profile = require("../models/Profiles");
jwtSecret = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(res.status(401).send("Not Authorized"));
  }

  //decode json token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const profile = await Profile.findById(decoded._id);

    //verify user exist
    if (!profile) {
      return next(res.status(404).send("No user was found"));
    }
    req.profile = profile;
    return next();
  } catch (error) {
    return next(res.status(401).send("Not Authorised1"));
  }
};
