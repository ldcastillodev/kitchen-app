import { useState, useEffect } from 'react';
export const ShopHistory = ({loaded}) => { 

  const [response, setResponse] = useState(false);
  const [data, setData] = useState({ historial : {} });
  const [err, setErr] = useState('');


  useEffect(() => {
    getShoppingHistory()
  }, [loaded])
  
  const getShoppingHistory = async () => {

    try {
      const response = await fetch('http://localhost:8080/warehouse/shopping-history', {
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
      <h1>Historial de compras</h1>


      { Object.keys(data.historial).length > 0  && 

        <div> 
          {
            Object.keys(data.historial).map(i => {
              return (
                <div key={i}> 
                  <p>{(data.historial[i].ingredient).toUpperCase()} - Cantidad comprada: {data.historial[i].quantity}</p>
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