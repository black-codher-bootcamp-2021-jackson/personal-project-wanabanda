const mongoose = require("mongoose");
const Ingredient = mongoose.model("ingredient");

const ingredientRoutes = (app) => {
  app.post("/api/ingredients/add", async (req, res) => {
    const name = req.body;

    try {
      const ingredient = await Ingredient.create(name);

      ingredient.save();
      res.status(201).json({
        sucuess: true,
        message: "new ingredient added",
      });
    } catch (error) {
      res.status(400).json({
        sucuess: false,
        error: error.message,
      });
    }
  });

  app.delete("/api/ingredients/:name", async (req, res) => {
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

module.exports = ingredientRoutes;
