import { useState, useEffect } from 'react';
import './App.css';
import * as React from 'react';
import { Dish } from './components/Dish';
import { ShopHistory } from './components/ShopHistory';
import { Recipes } from './components/Recipes';
import { Ingredients } from './components/Ingredients'
import { ResetInventory } from './components/ResetInventory';
import { DeleteShoppingHistory } from './components/DeleteShoppingHistory';
import { BasicModal } from './components/Modal';
import { Button } from '@mui/material';
import { KitchenHistory } from './components/KitchenHistory';
import { DeleteKitchenHistory } from './components/DeleteKitchenHistory';


const  App = () => {
  const [loaded,setLoaded] = useState(0)
  const [dish, setDish] = useState({dish: []});
  const [ingredients, setIngredients] = useState({ingredientes: {}})
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const prepareDish = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/kitchen', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setDish(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
      setLoaded(loaded + 1)
    }
  };
  const deleteShoppingHistory = async () => {
    try {
      const response = await fetch('http://localhost:8080/warehouse/shopping-history', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
      setLoaded(loaded + 1)
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err.message);
    } 
  };
  const resetInventory = async () => {
    try {
      const response = await fetch('http://localhost:8080/warehouse/reset-inventory', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
      });
      setLoaded(loaded + 1)
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err.message);
    } 
  };

  const deleteKitchenHistory = async () => {
    try {
      const response = await fetch('http://localhost:4000/kitchen/history', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
      setLoaded(loaded + 1)
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err.message);
    } 
  };

  return (
    <div className="App">

      
      {isLoading && <BasicModal/>}
      <div className='grid-container'>
        <div className = 'dish'><Dish dish_prepared = {dish?.dish_prepared}/></div>
        <div className = 'ingredients'><Ingredients  loaded = {loaded}/></div>
        <div className = 'shoppinghistory'><ShopHistory  loaded = {loaded}/></div>
        <div className = 'recipes'><Recipes /></div>
        <div className = 'kitchenhistory'><KitchenHistory loaded={loaded} /></div>
      </div>

      <div className='botones'>
        {err && <h2>{err}</h2>}
        <button className = 'pedido' variant="contained" onClick={prepareDish}>Hacer Pedido</button>
        
        <ResetInventory resetInventory={resetInventory}/>
        <DeleteShoppingHistory deleteHistory = {deleteShoppingHistory}/>
        <DeleteKitchenHistory deleteKitchenHistory= {deleteKitchenHistory}/>
      </div>
      
    </div>
  );
}

/*
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    alert('you changed the counter to ' + counter)
  }, [counter])

  const Person = (props) => { // ejemplo de props
    return (
      <>
      <h1>Name: {props.name}</h1>
      <h1>Age: {props.lastname}</h1>
      </>
    )
  }
  <Person name = {'john'} lastname = {'castillo'}/> 
      <Person name = {'luis'} lastname = {'castillo'}/>
      <button onClick={() => setCounter((prevCounter) => prevCounter - 1)}>-</button>
      <h1>{counter}</h1>
      <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>+</button>
  */

export default App;
