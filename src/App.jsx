import React, { useState } from 'react';
import Products from './Products';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';

import Cart from './Cart';
import Product from './Product'
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null);

  return (
    <div className="App">
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route
          path='/products'
          element={token ? <Products /> : <Navigate to='/login' replace />}
        />
        <Route path='/product/:id' element={<Product token={token}/>}/>

        <Route path='/login' element={<Login token={token} setToken={setToken} />} />
        
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
