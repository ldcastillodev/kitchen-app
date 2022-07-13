
import axios from "axios";
import { KitchenHistory } from "../models/history.js";
import { Recipes } from "../models/recipes.js";

async function getRandomRecipe() {
  const recipes = await Recipes.findOne().select("-_id -__v")
  const keys = Object.keys(recipes.recipes);
  const recipe = keys[Math.floor(Math.random() * keys.length)]
  const ingredients = recipes.recipes[recipe]
  return {recipe, ingredients};
}


export const prepareDish = async (req, res) => {
  const dish = await getRandomRecipe();
  await addToHistory(dish.recipe);
  await axios.post('http://warehouse:8080/warehouse', dish.ingredients);
  await axios.patch('http://warehouse:8080/warehouse/remove-ingredients', dish.ingredients);
  res.json({
    status: 'ready',
    dish_prepared: dish.recipe,
    ingredients_used: dish.ingredients
  })
}

export async function getRecipes(req, res) {
  const recipes = await Recipes.findOne().select("-_id -__v")
  res.json({recipes: recipes.recipes})
}

export async function getKitchenHistory(req, res) {
  const kitchenHistory = await KitchenHistory.find().select("-_id -__v");
  res.json({
    historial: kitchenHistory
  })
}

async function addToHistory(dish) {
  const kitchenHistory = new KitchenHistory({ dish });
  await kitchenHistory.save()
}

export async function deleteHistory (req, res) {
  await KitchenHistory.deleteMany();
  res.json({mensaje: 'deleted'})
}
