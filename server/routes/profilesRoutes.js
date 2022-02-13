const mongoose = require("mongoose");

const Profile = mongoose.model("profiles");
const resetEmail = require("../utils/resetEmail");

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

  //login user
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

      resetToken(profile, 200, res);
    } catch (error) {
      //console.log(error);
      res.status(500).json({ sucess: false, error: error.message });
    }
  });

  //forgot password
  app.post(`/api/forgotpassword`, async (req, res, next) => {
    const { email } = req.body;

    try {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        return res.status(404).json({
          error: false,
          message: "Email is not registered in our database",
        });
      }

      const resetToken = profile.getResetPasswordToken();
      //save to the database
      await profile.save();

      //!!!!! configure to index.js !!!!!!
      const resetUrl = `/api/passwordreset/${resetToken}`;

      const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

      try {
        await resetEmail({
          to: profile.email,
          subject: "Password Reset Request",
          text: message,
        });

        res.status(200).json({ sucess: true, data: "Email sent" });
      } catch (error) {
        profile.resetPasswordToken = undefined;
        profile.resetPasswordExpries = undefined;

        await profile.save();

        return next(res.status(500).send("Email could not be sent"));
      }
    } catch (error) {
      next(error);
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
