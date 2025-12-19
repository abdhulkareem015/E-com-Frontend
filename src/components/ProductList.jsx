import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';


const ProductList=()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    }, []);

    return(
      <>
        <div className="min-h-screen bg-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Explore Here</h1>
                    </div>
                <div className="grid grid-cols-4 gap-6">
                    {products.map((product)=>{
                        return(
                            <ProductCard key={product._id}
                              name={product.name}
                              price={product.price}
                              image={product.image} 
                              id={product.id}
                              _id={product._id} />
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductList;


