const mongoose = require("mongoose");
const Profile = mongoose.model("profiles");
const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/auth");

const privateRoutes = (app) => {
  app.get("/api/profile/private", (protect, getPrivateData), (_, res) => {
    res.status(500);
  });

  app.get("/api/profile/saved", protect, getPrivateData), (_, res) => {};
};
module.exports = privateRoutes;
