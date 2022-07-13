import { useState, useEffect } from 'react';

export const Ingredients = ({loaded}) => { 
  
  const [data, setData] = useState({ingredientes: {}});
  
  const [err, setErr] = useState('');
  
 
  useEffect(() => {
    getIngredients()
  }, [loaded])

  const getIngredients = async () => {
    try {
      //console.log(data.ingredientes)
      const response = await fetch('http://localhost:8080/warehouse/get-ingredients', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result)
      
    } catch (err) {
      setErr(err.message);
    } 
  };
  
  

  
  return (
    <>
      <div className="scrollable-div">
        <h1>Ingredientes Disponibles</h1>
        
        { Object.keys(data.ingredientes).length > 0  && 
          <div> 
            
            {
              Object.keys(data.ingredientes).map(i => {
                
                return (
                  <div key={i} className='ingredientes'> 
                    <p>{data.ingredientes[i]} {i.toUpperCase()} &nbsp;</p>
                  </div>
                )
              })
            }
            
          </div>
        }

      </div>
    
    
    </>
  )
}