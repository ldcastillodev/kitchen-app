import axios from 'axios'
import { ShoppingHistory } from '../models/shopping_history.js';
import { Warehouse } from '../models/warehouse.js';

export const market = async (req, res) => {
  const ingredients = req.body; // un objeto con los ingredientes y cantidades necesarios para la receta 
  let ingredientsNeeded = await checkInventory(ingredients); // devuelve false si no necesito ingredientes, sino devuelve un objeto con los ingredientes necesarios
  let ingredientRequested;
  let ingredientsToAdd = {}
  if(!ingredientsNeeded) { // no se necesitan ingredientes
    res.json(ingredients); // manda response a la cocina con los ingredientes necesarios
  } else {
    let count = 0;
    const ingredients_array = Object.keys(ingredientsNeeded);
  
    for(let i = 0; i < ingredients_array.length; i++) {
      do { // hago la peticion de ingredientes a la api hasta tener los necesarios
        ingredientRequested = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingredients_array[i]}`);
        if(ingredientRequested.data.quantitySold !== 0) {
          count+= ingredientRequested.data.quantitySold;
          await addToShoppingHistory(ingredients_array[i], ingredientRequested.data.quantitySold); // cuando obtengo un ingrediente de la api lo agrego al historial de compras
        } 
      } while(count < ingredientsNeeded[ingredients_array[i]]);
      ingredientsToAdd[ingredients_array[i]] = count;
      count = 0; // count en 0 para seguir con el siguiente ingrediente
    }
    await addToInventory(ingredientsToAdd);
    res.json(ingredients);
  }
}

async function checkInventory(kitchenIngredients) { 
  // consultar el inventario de los ingredientes en la bd, debe retornar un objeto con los ingredientes a comprar y la cantidad
  // o retornar falso si hay suficiente inventario para hacer la receta
  const ingredientsNeeded = {};
  let count = 0;
  const warehouse = await Warehouse.findOne()
  for (const i in kitchenIngredients) {
    if(warehouse.ingredients[i] < kitchenIngredients[i]) {
      count = kitchenIngredients[i] - warehouse.ingredients[i];
      ingredientsNeeded[i] = count;
    }
  }
  return Object.keys(ingredientsNeeded).length === 0 ? false : ingredientsNeeded; 
}

async function addToInventory(ingredients) { // recibe los ingredientes comprados y los agrega al inventario
  const warehouse = await Warehouse.findOne();
  
  for(const i in ingredients) {
    warehouse.ingredients[i]+= ingredients[i]
  }
  
  await warehouse.save();
}

export async function removeIngredients(req, res) { // recibe de la cocina un objeto(req.body) con los ingredientes utilizados en el plato
  //resta del inventario los ingredientes que se usaron en el plato
  const ingredients = req.body;
  const warehouse = await Warehouse.findOne();
  
  for (const i in ingredients) {
    warehouse.ingredients[i] -= ingredients[i];
  }
  await warehouse.save();
  res.json({
    mensaje: 'ingredientes modificados en inventario'
  });
}

async function addToShoppingHistory(ingredient, quantity) { // agrega un ingrediente al historial de compras
  const shopping_history = new ShoppingHistory({
    ingredient,
    quantity
  });
  await shopping_history.save();
}

export async function resetInventory(req, res) {
  const warehouse = await Warehouse.findOne();
  for (const i in warehouse.ingredients) {
    warehouse.ingredients[i] = 5;
  }
  await warehouse.save();
  res.json({message: 'ingredients restarted to 5'})
}

export async function getInventory() {
  const inventory = await Warehouse.findOne();
  return inventory.ingredients;
}

export async function getIngredients(req, res) {
  const inventory = await Warehouse.findOne();
  res.json({ingredientes: inventory.ingredients});
}

export async function getShoppingHistory(req, res) {
  const shoppingHistory = await ShoppingHistory.find().select("-_id -__v")
  res.json({historial: shoppingHistory})
}

export async function deleteShoppingHistory(req, res) {
  await ShoppingHistory.deleteMany();
  res.json({mensaje: 'deleted'})
}
