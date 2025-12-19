import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../Contexts/GlobalContext';

const Cart = () => {
  const context = useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart');
      const data = await response.json();
      setCart(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, qty) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qty }),
      });
      
      if (response.ok) {
        setCart(cart.map(item => 
          item.id === id ? { ...item, qty } : item
        ));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setCart(cart.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Shopping Cart</h1>
          <p className="text-black text-lg">Items you've added to your cart</p>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-700 rounded-xl shadow-lg p-12 max-w-md mx-auto border border-gray-300">
              <div className="text-6xl mb-6">🛒</div>
              <h3 className="text-2xl font-bold text-black mb-4">Your cart is empty</h3>
              <p className="text-black mb-6">Add some products to get started!</p>
              <a href="/products" className="bg-red-900 text-white px-6 py-3 rounded hover:bg-black transition-colors">
                Browse Products
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 mb-6 border border-gray-300">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-6 mb-6 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                    <div>
                      <h3 className="text-xl font-bold text-black">{item.name}</h3>
                      <p className="text-red-600 font-semibold text-lg">₹{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-600 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.qty - 1))}
                        className="bg-gray-400 hover:bg-gray-600 px-3 py-2 rounded-l-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-semibold">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="bg-gray-400 hover:bg-gray-600 px-3 py-2 rounded-r-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="text-xl font-bold text-black min-w-[100px]">₹{item.price * item.qty}</p>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-300">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-800">Total: ₹{total}</span>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-red-900 text-white py-3 px-6 rounded hover:bg-black transition-colors font-semibold border border-gray-400">
                  Continue Shopping
                </button>
                <a href="/checkout" className="flex-1 bg-blue-900 text-white py-3 px-6 rounded hover:bg-black transition-colors font-semibold text-center border border-gray-400">
                  Proceed to Pay
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;