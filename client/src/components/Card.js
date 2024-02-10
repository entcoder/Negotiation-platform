import React from 'react'
import './products.css'
import {Link} from "react-router-dom"


const Card = ({item,getData}) => {
    const handleViewClick = () => {
        // Call the getData function and pass the item as an argument
        getData(item);
        console.log(item)
      };
  return (
    <div>
        <div className="product">
      <img src={item.imageUrl} alt={item.name} />

      <div className="product__info">
        <p className="info__name">{item.name}</p>

        <p className="info__description">{item.description.substring(0, 100)}...</p>

        <p className="info__price">${item.price}</p>
        <Link to="/details" className="info__button" onClick={handleViewClick}>
          View
        </Link>
        
      </div>
    </div>
    </div>
  )
}

export default Card