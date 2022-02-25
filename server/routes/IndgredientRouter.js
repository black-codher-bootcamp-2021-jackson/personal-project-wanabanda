const mongoose = require("mongoose");
const Ingredient = mongoose.model("ingredient");

const ingredientRoutes = (app) => {
  app.get("/api/recipes:/id", (_, res) => {
    res.header("Content-Type", "application/json");
    const id = req.params.id;
    const found = recipes.find((recipe) => (recipe.id = id));
    if (found) {
      res.header("Content-Type", "application/json");
      res.status(200);
      res.send(found);
    } else {
      //res.send("Task does not exist, try again");
      res.status(404).end;
    }
  });

  app.post("/api/ingredients/add", async (req, res) => {
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
