import { Link } from "react-router";
const ProductCard=(props)=>{

    const{name,price,image,id}=props;

    return(
        <Link to={`/products/${id}`}>
        <div className=" rounded-lg p-6 shadow-xl bg-white w-[350px]">
            <img src={image} alt={name} className="w-[400px] h-auto  rounded-lg shadow-xl"/>
            <h2 className="text-lg font-bold mt-2">{name}</h2>
            <p className="text-md text-gray-600">Rs.{price}</p>

        </div></Link>
    )
}

export default ProductCard;

