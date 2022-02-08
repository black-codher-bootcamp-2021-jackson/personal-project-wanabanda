const mongoose = require("mongoose");
const Profile = mongoose.model("profiles");

const sendToken = (profile, stausCode, res) => {
  const token = profile.getSignedToken();
  res.status(stausCode).json({ sucess: true, token });
};

const profileRoutes = (app) => {
  app.get("/", (_, res) => {
    res.header("Content-Type", "text/html");
    res.status(200);
  });

  app.get(`/api/profile`, async (req, res) => {
    const profiles = await Profile.find();

    return res.status(200).send(profiles);
  });

  //register new user
  app.post(`/api/register`, async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const profile = await Profile.create({
        username,
        email,
        password,
      });

      sendToken(profile, 201, res);
    } catch (error) {
      res.status(500).json({
        sucuess: false,
        error: error.message,
      });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email does not exist" });
    }

    try {
      const profile = await Profile.findOne({ email }).select("+password");

      if (!profile) {
        res.status(404).json({ sucess: false, error: "Invaild credentials" });
      }

      const isMatch = await profile.matchPassword(password);

      if (!isMatch) {
        res
          .status(404)
          .json({ sucess: false, error: "Wrong password, please try again" });
      }

      sendToken(profile, 200, res);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ sucess: false, error: error.message });
    }
  });

  /*
  app.post(`/api/profile`, async (req, res) => {
    const profile = await Profile.create(req.body);

    return res.status(201).send({
      error: false,
      profile,
    });
  });

  app.put(`/api/profile/:id`, async (req, res) => {
    const { id } = req.params;

    const profile = await Profile.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      profile,
    });
  });

  app.delete(`/api/profile/:id`, async (req, res) => {
    const { id } = req.params;

    const profile = await Profile.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      profile,
    });
  });*/
};

module.exports = profileRoutes;
