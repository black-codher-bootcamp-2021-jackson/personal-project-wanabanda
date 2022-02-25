const { query } = require("express");
const mongoose = require("mongoose");
const Ingredient = mongoose.model("ingredient");
const { protect } = require("../middleware/auth");

const privateRoutes = (app) => {
  app.get("/api/profile/private", protect, (_, res) => {
    res.status(200).json({
      sucess: true,
      data: "You got acces to the priavte data",
    });
  });

  app.get("/api/profile/ingredients/", protect, async (req, res) => {
    const ingredient = await Ingredient.find();
    const createdBy = query;

    Ingredient.find({ createdBy });
    return res.status(200).send(ingredient);
  });

  app.post("/api/profile/ingredients/:id/", protect, async (req, res) => {
    const name = req.body;

    try {
      const ingredient = await Ingredient.create(name);

      res.status(201).send(ingredient);
    } catch (error) {
      res.status(400).json({
        sucuess: false,
        error: error.message,
      });
    }
  });

  app.delete("/api/profile/ingredients/:name", async (req, res) => {
    const name = req.params.body;

    res.status(200).json({
      sucuess: "true",
      message: "ingredient has been deleted",
    });

    try {
      Ingredient.deleteOne({ name });
    } catch (error) {
      res.status(400).json({
        sucuess: false,
        error: error.message,
      });
    }
  });
};
module.exports = privateRoutes;
