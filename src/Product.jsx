import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';

const Product = ({ token }) => {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const productId = location.pathname.split('/').pop();

    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }
  }, [location]);

  const handleAddToCart = () => {
    if (!token) {
      setMessage('Please login first!');
      return;
    }

    addToCart(product);
    setMessage('Added to cart ✅');

    
    setTimeout(() => setMessage(''), 2000);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-center gap-8">
        
        <img
          src={product.image}
          alt={product.title}
          className="w-96 h-96 object-contain mb-6 sm:mb-0"
        />

        
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-6">${product.price}</p>

          
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

         
          {message && (
            <p className={`mt-3 text-sm ${token ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
