import { useState, useEffect } from 'react';

export const KitchenHistory = ({loaded}) => { 
  
  const [data, setData] = useState({historial: {}});
  
  const [err, setErr] = useState('');
  
 
  useEffect(() => {
    getKitchenHistory()
  }, [loaded])

  const getKitchenHistory = async () => {
    console.log(data)
    try {
      const response = await fetch('http://localhost:4000/kitchen/history', {
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
        <h1>Historial de Pedidos</h1>
        { Object.keys(data.historial).length > 0  && 
          <div> 
            
          {
            console.log(Object.keys(data.historial).map(i => data.historial[i]))
          }
          {
            Object.keys(data.historial).map(i => {
              return (
                <div key={i}> 
                  <p>{(data.historial[i].dish).split('_').join(' ')}</p>
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