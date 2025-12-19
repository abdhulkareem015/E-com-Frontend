import { useContext } from 'react';
import GlobalContext from '../Contexts/GlobalContext';
import { toast } from 'react-toastify';

const AddToCart = ({ product }) => {
  const context = useContext(GlobalContext);
  const cart = context?.cart || [];
  const setCart = context?.setCart || (() => {});

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id || product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        }),
      });
      
      if (response.ok) {
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
          setCart(
            cart.map(item =>
              item.id === product.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          );
        } else {
          setCart([...cart, { ...product, qty: 1 }]);
        }
        toast.success('Product added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <button 
      onClick={handleAdd} 
      className="w-full bg-red-800 hover:bg-black text-white py-2 px-4 rounded font-semibold transition-all duration-300 transform hover:scale-108">
      Add to Cart
    </button>
  );
};

export default AddToCart;