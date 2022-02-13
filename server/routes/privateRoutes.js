const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/auth");

const privateRoutes = (app) => {
  app.get("/api/profile/private", (protect, getPrivateData), (_, res) => {
    res.status(500);
  });
};
module.exports = privateRoutes;
