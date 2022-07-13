import mongoose from "mongoose";

const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
  ingredients: {
    tomato: {
      type: Number,
      required: true
    },
    lemon: {
      type: Number,
      required: true
    },
    potato: {
      type: Number,
      required: true
    },
    rice: {
      type: Number,
      required: true
    },
    ketchup: {
      type: Number,
      required: true
    },
    lettuce: {
      type: Number,
      required: true
    },
    onion: {
      type: Number,
      required: true
    },
    cheese: {
      type: Number,
      required: true
    },
    meat: {
      type: Number,
      required: true
    },
    chicken: {
      type: Number,
      required: true
    }
  }
});

 export const Warehouse = mongoose.model('Warehouse', warehouseSchema);
