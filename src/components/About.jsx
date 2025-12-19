const About = () => {
    return (
        <div className="min-h-screen bg-gray-800 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-white mb-6">About E-commerce</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Your ultimate destination for premium shopping experiences, inspired by the world's best streaming platform
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">Our Mission</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            To revolutionize online shopping by providing a seamless, entertainment-inspired 
                            experience that makes discovering and purchasing products as engaging as watching 
                            your favorite shows.
                        </p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                        <h2 className="text-3xl font-bold text-red-600 mb-4">Our Vision</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            To become the world's most loved shopping platform by combining cutting-edge 
                            technology with user-centric design, creating an experience that's both 
                            functional and delightful.
                        </p>
                    </div>
                </div>
                
                <div className="mt-16 text-center">
                    <div className="bg-gray-900 rounded-lg p-12 max-w-4xl mx-auto border border-gray-800">
                        <h2 className="text-4xl font-bold text-white mb-6">Why Choose E-commerce?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold text-red-600 mb-2">Curated Selection</h3>
                                <p className="text-gray-400">Hand-picked products for the best quality</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-bold text-red-600 mb-2">Fast Delivery</h3>
                                <p className="text-gray-400">Quick and reliable shipping worldwide</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🛡️</div>
                                <h3 className="text-xl font-bold text-red-600 mb-2">Secure Shopping</h3>
                                <p className="text-gray-400">Your data and payments are always protected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;