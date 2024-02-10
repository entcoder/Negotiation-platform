import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './productDetail.css'; // Importing CSS file for styling

const ProductDetail = ({ product, getDataNego }) => {


  const negoProductHandler= (e)=>{
    
    getDataNego(product);
    console.log(product)
  }


  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price}</p>
        {/* Button for negotiation */}
        <button className='negotiation-button'><Link to="/negotiation" className="negotiation-button" onClick={negoProductHandler}>Negotiate</Link></button>
        
      </div>
    </div>
  );
};

export default ProductDetail;
