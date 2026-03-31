import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Soya Gold Seeds (5kg)', price: 1200, quantity: 2, category: 'Seeds' },
    { id: 3, name: 'Urea Fertilizer (50kg)', price: 3500, quantity: 1, category: 'Fertilizers' }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = 50;
  const total = subtotal + delivery;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <ShoppingBag className="text-agri-green" /> My Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                <div className="w-20 h-20 bg-agri-light rounded-lg flex items-center justify-center text-agri-green/30">
                  <ShoppingBag size={32} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-agri-green uppercase">{item.category}</p>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-agri-green font-bold">₹{item.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100"><Minus size={16} /></button>
                    <span className="px-3 font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-agri-green/10 h-fit space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{delivery}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button className="w-full bg-agri-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-lg shadow-agri-green/20">
              Checkout <ArrowRight size={20} />
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <CreditCard size={12} /> Secure UPI Payment
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 text-lg mb-6">Your cart is empty!</p>
          <Link to="/" className="bg-agri-green text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-agri-green/20">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
