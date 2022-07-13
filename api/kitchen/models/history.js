import mongoose from "mongoose";

const Schema = mongoose.Schema;

const KitchenHistorySchema = new Schema({
    dish: {     
        type: String, 
        required: true 
    }
});

 export const KitchenHistory = mongoose.model('KitchenHistory', KitchenHistorySchema);
