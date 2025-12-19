const Header=()=>{
    return(
        <header className="w-full bg-gray-800 shadow-lg text-white p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-3xl font-bold">
                    E-Commerce
                </div>
                <nav className="flex space-x-8 text-lg font-lg">
                    <a href='/' className="hover:text-black transition-colors duration-300 mt-2">HOME</a>
                    <a href="/about" className="hover:text-black transition-colors duration-300 mt-2">ABOUT</a>
                    <a href="/contact" className="hover:text-black transition-colors duration-300 mt-2">CONTACT</a>
                    <a href="/Products" className="hover:text-black transition-colors duration-300 mt-2">PRODUCTS</a>
                    <a href="/carts" className="hover:text-black transition-colors duration-300 mt-2">CARTS</a>
                    <a href="/orders" className="hover:text-black transition-colors duration-300 mt-2">ORDERS</a>
                    <a href="/Login" className="bg-red-900 text-white px-4 py-2 rounded hover:bg-black transition-colors duration-300 ">LOGIN</a>
                </nav>
            </div>
        </header> 
    )
}

export default Header;