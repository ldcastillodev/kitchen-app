import express  from "express";
import routes from "./routes/routes.js";
import mongoose from "mongoose";
import { Warehouse } from "./models/warehouse.js";
import cors from 'cors';

const PORT = process.env.PORT || 8080

const MONGODB_URI = 'mongodb+srv://ldcastillodev:ld96cas*@warehouse.msfkdlw.mongodb.net/?retryWrites=true&w=majority'

const app = express();
app.use(express.json());
app.use(cors())
app.use(routes)



mongoose.connect(MONGODB_URI)
  .then(() => {
    Warehouse.findOne()
      .then(warehouse => {
        if(!warehouse) {
          const warehouse = new Warehouse({
            ingredients: {
              tomato: 5,
              lemon: 5,
              potato: 5,
              rice: 5,
              ketchup: 5,
              lettuce: 5,
              onion: 5,
              cheese: 5, 
              meat: 5,
              chicken: 5
            }
          });
          warehouse.save();
        } 
      });
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)  
    });
  })

