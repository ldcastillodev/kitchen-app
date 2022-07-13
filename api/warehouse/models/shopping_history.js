import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
    ingredient: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
    

});

 export const ShoppingHistory = mongoose.model('ShoppingHistory', shoppingSchema);
