const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (request, response) => {
  Recipe.create({
    title: request.body.title,
    level: request.body.level,
    ingredients: request.body.ingredients,
    cuisine: request.body.cuisine,
    dishType: request.body.dishType,
    image: request.body.image,
    duration: request.body.duration,
    creator: request.body.creator,
  })
    .then((createdRecipe) => {
      response.status(201).json(createdRecipe);
    })
    .catch((error) => {
      response.status(500).json({ message: "error" });
    });
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all the recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (request, response) => {
  Recipe.findById(request.params.id)
    .then((recipe) => {
      response.status(200).json(recipe);
    })
    .catch((error) => {
      response
        .status(500)
        .json({ message: "error while getting a single recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/id", (request, response) => {
  Recipe.findByIdAndUpdate(request.params.if, request.body, { new: true })
    .then((updatedRecipe) => {
      response.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      response
        .status(500)
        .json({ message: "Error while updating a single recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
