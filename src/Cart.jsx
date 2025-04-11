import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  if (cartItems.length === 0) return <div className="p-6">🛒 Your cart is empty</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between mb-4 p-4 border rounded shadow">
          <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
          <div className="flex-1 mx-4">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p>${item.price}</p>
            <div className="flex items-center mt-2 gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}
                className="px-3 py-1 bg-gray-300 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-300 rounded">+</button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 mt-2">Remove</button>
          </div>
        </div>
      ))}

      <div className="text-right font-bold text-xl mt-6">
        Total: ${getTotal()}
      </div>
    </div>
  );
};

export default Cart;
