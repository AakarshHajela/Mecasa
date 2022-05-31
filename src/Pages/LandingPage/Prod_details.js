import React,{useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Products from './Products';

const Prod_details = (id) =>{

  const [data, setData] = useState(null);  
 
  var prod = Products.filter(function(el){
        return el.id === id;
    })
  return (
    prod.map((it)=>
    <div>
        <img style={{height:400}} alt="" src={it.thumb}/>
        <Typography>{it.product_name}</Typography>
        <Typography>{it.price}</Typography>
        <Typography>{it.description}</Typography>
    </div>
    )
  );
}

export default Prod_details;