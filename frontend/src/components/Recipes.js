import { useState, useEffect } from 'react';
import ControlledAccordions from './acordion';
export const Recipes = ({loaded}) => { 

  const [response, setResponse] = useState(false);
  const [data, setData] = useState({ recipes : {} });
  const [err, setErr] = useState('');


  useEffect(() => {
    getRecipes()
  }, [loaded])
  
  const getRecipes = async () => {

    try {
      const response = await fetch('http://localhost:4000/kitchen/recipes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setResponse(true);

    } catch (err) {
      setErr(err.message);
    } 
  };
   
  return (
    <>
      <div className="scrollable-div">
        <h1>Lista de Recetas</h1>
        
        { Object.keys(data.recipes).length > 0  && 
          
          <div> 
            <ControlledAccordions recipes = {data.recipes}/>
            
          </div>
        }

      </div>
    </>
  )
}
// {console.log(data.recipes[recipe])}
/*
{
              
              Object.keys(data.recipes).map(recipe => {
                return (
                  <div key={recipe}> 
                    <h2>{recipe}</h2>
                    
                  </div>
                )
              })
            }
*/