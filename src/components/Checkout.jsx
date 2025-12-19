import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

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
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    const orderData = {
      items: cart,
      customerName: name,
      address: address,
      phone: phone,
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      orderDate: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Clear cart after successful order
        await fetch('http://localhost:3000/cart', { method: 'DELETE' });
        toast.success('Order placed successfully!', {
          position: "top-center"
        });
        window.location.href = '/orders';
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-700 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>
            
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-black">{item.name}</h3>
                    <p className="text-red-800">₹{item.price} x {item.qty}</p>
                  </div>
                </div>
                <p className="font-bold text-black">₹{item.price * item.qty}</p>
              </div>
            ))}
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-xl font-bold text-black">
                <span>Total: ₹{total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-gray-700  rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Shipping Details</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-black font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-black font-semibold mb-2">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24"
                  required
                />
              </div>
              
              <div>
                <label className="block text-black font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-900 text-white py-3 px-6 rounded-lg hover:bg-black transition-colors font-semibold text-lg"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;