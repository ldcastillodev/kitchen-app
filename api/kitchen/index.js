import express  from "express";
import routes from "./routes/routes.js";
import mongoose from "mongoose";
import cors from 'cors';
import { Recipes } from "./models/recipes.js";
import recipes from "./recipes/recipes.js";

const PORT = process.env.PORT || 4000
const MONGODB_URI = 'mongodb+srv://ldcastillodev:ld96cas*@kitchen.o2mnpbs.mongodb.net/?retryWrites=true&w=majority'

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    Recipes.findOne()
      .then(r => {
        if(!r) {
          const recipe = new Recipes({
            recipes: recipes
          });
          recipe.save();
        }
      })
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    });
  })

