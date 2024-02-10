import React from 'react'
import products from '../productList'
import Card from './Card'
const Products = ({getData}) => {
  return (
    <>
    <div className="product-listing">
      {products.map((item) => (
        <Card  item={item} getData={getData} key={item.id}/>
  
          
      ))}

    </div>
    
    
    
    
    
    </>
  )
}

export default Products