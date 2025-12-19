import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders');
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    toast(
      <div>
        <p>Are you sure you want to cancel this order?</p>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => {
              toast.dismiss();
              proceedWithCancel(orderId);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Yes, Cancel
          </button>
          <button 
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      }
    );
  };

  const proceedWithCancel = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Order cancelled successfully!');
        fetchOrders(); // Refresh orders list
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Order History</h1>
          <p className="text-black text-lg">Track your purchases and deliveries</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-700 rounded-xl shadow-lg p-12 max-w-md mx-auto border border-gray-300">
              <div className="text-6xl mb-6">📦</div>
              <h3 className="text-2xl font-bold text-black mb-4">No orders yet</h3>
              <p className="text-black mb-6">Start shopping to see your orders here!</p>
              <a href="/products" className="bg-red-900 text-white px-6 py-3 rounded hover:bg-black transition-colors">
                Start Shopping
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Order #{index + 1}</h3>
                    <p className="text-gray-600">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-600">₹{order.total}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Confirmed
                      </span>
                      <button 
                        onClick={() => cancelOrder(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Shipping Details</h4>
                      <p className="text-gray-600"><strong>Name:</strong> {order.customerName}</p>
                      <p className="text-gray-600"><strong>Phone:</strong> {order.phone}</p>
                      <p className="text-gray-600"><strong>Address:</strong> {order.address}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Items Ordered</h4>
                      <div className="space-y-2">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{item.name}</p>
                              <p className="text-gray-600">₹{item.price} x {item.qty}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;