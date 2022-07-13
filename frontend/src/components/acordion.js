import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({recipes}) {
  const [expanded, setExpanded] = React.useState(false);
  const [panel, setPanel] = React.useState('panel');
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {
        Object.keys(recipes).map((element, i) => {
          return(
            <div key = {element} className= "acordeon">
              
              <Accordion expanded={expanded === panel + i} onChange={handleChange(panel + i)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{color: '#00b19d'}}/>}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 , color: '#00b19d', fontWeight: 'bold', fontFamily: 'tahoma'}}>
                    {element.split('_').join(' ')}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', marginLeft: '20%' }} className='acordeon-ingrediente'>Ingredientes</Typography>
                </AccordionSummary>
                <AccordionDetails className='detalles' >
  
                    {
                      Object.keys(recipes[element]).map(ingredient => {
                        return(
                          <Typography className='ingredientes' sx={{ fontWeight: '600', color: '#00b19d', fontFamily: 'monospace' }}>
                            {recipes[element][ingredient]}&nbsp;{ingredient}, &nbsp;    
                          </Typography>
                        )
                      })
                    }
                
                  
                </AccordionDetails>
              </Accordion>
              
            </div>
          )
        })
      }
    </>
  );
}
