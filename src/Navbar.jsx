import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaBars } from 'react-icons/fa';
import { useCart } from './CartContext';

const Navbar = ({ token, setToken }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const logOutHandler = () => {
    setToken('');
    localStorage.clear();
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative">
      
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">Store</Link>
      </div>

      
      <div className="space-x-4 hidden md:flex">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        {!token ? (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        ) : (
          <button onClick={logOutHandler} className="text-gray-700 hover:text-blue-600">LogOut</button>
        )}
      </div>

      
      <div className="flex items-center space-x-4">
        
        <div className="relative">
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            <FaShoppingCart size={22} />
          </Link>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>

        
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden mt-2 flex flex-col space-y-2 px-4 py-3">
          <Link to="/" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">Home</Link>
          {!token ? (
            <Link to="/login" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">Login</Link>
          ) : (
            <button onClick={() => { toggleMenu(); logOutHandler(); }} className="text-gray-700 hover:text-blue-600">LogOut</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
