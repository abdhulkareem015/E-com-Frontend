import { useState } from "react"
import { useNavigate } from "react-router";
import {toast} from "react-toastify";
import axios from "axios";

const LoginForm=()=>{
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/register", {
                email,
                password,
                name
            });
            toast.success("Account created successfully!");
            setIsSignup(false);
            setEmail('');
            setPassword('');
            setName('');
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup failed");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Admin login
        if (email === "admin" && password === "admin" && role === "admin") {
            toast.success("Admin Login Successful");
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("role", "admin");
            navigate("/adminpage");
            return;
        }
        
        // User login
        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password
            });
            toast.success("Login Successful");
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("role", "user");
            navigate('/products');
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed");
        }
    };
    return(
        <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12">
            <div className="bg-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-300">
                <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-gray-300 mb-4">E-Commerce</div>
                    <h1 className="text-2xl font-bold text-gray-400 mb-2">
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </h1>
                    <p className="text-gray-400">Welcome to our store</p>
                </div>
                
                <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
                    {isSignup && (
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                                required
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            {role === 'admin' ? 'Username' : 'Email'}
                        </label>
                        <input 
                            type={role === 'admin' ? 'text' : 'email'} 
                            placeholder={role === 'admin' ? 'Username' : 'Email'} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-gray-800"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-gray-800"
                            required
                        />
                    </div>
                    
                    {!isSignup && (
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Role</label>
                            <select 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-gray-800"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        className="w-full bg-red-900 text-white py-3 px-6 rounded hover:bg-black transition-colors font-semibold text-lg"
                    >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}
                        <button 
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setEmail('');
                                setPassword('');
                                setName('');
                                setRole('user');
                            }}
                            className="text-black hover:text-gray-600 font-semibold ml-2"
                        >
                            {isSignup ? 'Login' : 'Create Account'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default LoginForm;


