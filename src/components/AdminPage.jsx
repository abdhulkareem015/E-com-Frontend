import { useState } from 'react';

const AdminPage=()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const productData = {
            name,
            price: parseInt(price),
            image
        };

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            
            if (response.ok) {
                alert('Product added successfully!');
                setName('');
                setPrice('');
                setImage('');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg border border-gray-300">
                <div className="text-center mb-8">
                    <div className="text-3xl font-bold text-gray-600 mb-4">ADMIN PANEL</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h1>
                    <p className="text-gray-600">Add products to your catalog</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="text" 
                        placeholder="Product Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-gray-800"
                        required
                    />
                    <input 
                        type="number" 
                        placeholder="Product Price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-gray-800"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Product Image URL" 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-gray-800"
                        required
                    />
                    <button type="submit" className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded font-bold transition-colors">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AdminPage;