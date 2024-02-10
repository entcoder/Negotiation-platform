import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Negotiation from './components/Negotiation';




const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [negoProduct, setNegotiateProduct] = useState(null);





  const getData= (product)=>{
     setSelectedProduct(product);
  }
  const getDataNego= (product)=>{
     setNegotiateProduct(product);
  }
  return (
    
    <Router>
       <Navbar/>
       <Routes>
        <Route path="/products" element={<Products getData={getData} />}></Route>
        <Route path="/details" element={<ProductDetail product={selectedProduct} getDataNego={getDataNego}/>}></Route>
        <Route path="/negotiation" element={<Negotiation negoProduct={negoProduct}/>}></Route>


       </Routes>

    </Router>
    
  )
}

export default App