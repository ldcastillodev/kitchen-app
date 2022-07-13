import express from "express";
import { deleteShoppingHistory, getIngredients, getShoppingHistory, market, removeIngredients, resetInventory } from "../controller/warehouse.js";

const router = express.Router()

router.get('/warehouse/get-ingredients', getIngredients)

router.get('/warehouse/shopping-history', getShoppingHistory)

router.post('/warehouse', market);

router.patch('/warehouse/remove-ingredients', removeIngredients);

router.patch('/warehouse/reset-inventory', resetInventory);

router.delete('/warehouse/shopping-history', deleteShoppingHistory)

export default router;