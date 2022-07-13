import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipes: {     
        type: Object, 
        required: true 
    }
});

 export const Recipes = mongoose.model('Recipes', recipeSchema);
