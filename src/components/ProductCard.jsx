import { Link } from "react-router";
import AddToCart from './AddToCart';

const ProductCard=(props)=>{
    const{name,price,image,id,_id}=props;
    const product = {id: _id || id, name, price, image};

    return(
        <div className="bg-gray-700 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Link to={`/products/${id}`}>
                <div className="relative">
                    <img src={image} alt={name} className="w-full h-80 object-contain bg-white rounded-lg transition-all duration-300 transform hover:scale-102"/>

                </div>
            </Link>
            <div className="p-4">
                <Link to={`/products/${id}`}>
                    <h2 className="text-lg font-bold text-black mb-2">{name}</h2>
                </Link>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-xl font-bold text-gray-200">₹{price}</p>
                    <div className="flex items-center text-yellow-400">
                        ★ 4.5
                    </div>
                </div>
                <AddToCart product={product} />
            </div>
        </div>
    )
}

export default ProductCard;

