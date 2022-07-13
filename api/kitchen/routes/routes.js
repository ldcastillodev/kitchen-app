import express from "express";
import { deleteHistory, getKitchenHistory, getRecipes, prepareDish } from "../controller/kitchen.js";
const router = express.Router()


router.get('/kitchen', prepareDish);

router.get('/kitchen/recipes/', getRecipes)

router.get('/kitchen/history', getKitchenHistory)

router.delete('/kitchen/history', deleteHistory )

export default router;