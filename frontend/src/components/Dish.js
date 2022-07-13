import { useState } from 'react';

export const Dish = ({dish_prepared}) => { 
  return (
    <>
      <div className="scrollable-div">
        <h1>Plato Preparado</h1>
        {dish_prepared !== undefined && 
          <p> {dish_prepared.split('_').join(' ')}</p>
        }
      
      </div>
    </>
  )
  
}

/*return (
    <>
    <h1>status: {status}</h1>
    <h1>Plato: {dish_prepared}</h1>
    {ingredients.map(i => {
      return (
         <h1>Ingredientes Usados: {i} </h1> 
      )
    })}
    </>
  )
  */