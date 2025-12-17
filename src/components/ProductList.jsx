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
        <div className="min-h-screen mx-auto flex-col gap-4 bg-gray-500 w-full p-4 shadow-lg">
            <h1 className="text-2xl font-bold mb-15 mt-10 text-center">PROUDCUT LIST</h1>
            <div className="flex flex-row mb-20 mt-30 justify-center gap-30">
                
            {products.map((product)=>{

                return(
                    <ProductCard key={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image} 
                      id={product.id} />
                )
      })}
      {/* <OrderSummary/> */}


            </div>
        </div>
        </>
    )
}

export default ProductList;


