import { Button } from "@mui/material"

export const DeleteShoppingHistory = ({deleteHistory}) => { 

  return (
    <>
        <button className="danger" onClick={deleteHistory}>Borrar Historial de compra</button>
    </>
  )
}