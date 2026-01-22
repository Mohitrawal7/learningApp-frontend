import { useState } from 'react';
import { User, Lock, ArrowRight, CircleDashed } from 'lucide-react';
import { login } from '../api.js';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../services/authServices.jsx"

/**
 * LoginPage Component
 * This component handles user authentication and navigates to the dashboard on a successful login.
 */
const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try{
     await login({ username, password });
 
      setTimeout(()=>navigate("/dashboard"),1500);
    }catch(error){
      console.error("Login failed:", error);
      setError('Invalid username or password. Please try again.');
    }
finally{
      setLoading(false);
        }
  };

  

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log in to Your Account</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        {/* Username Input */}
        <div>
          <label className="sr-only" htmlFor="username">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="sr-only" htmlFor="password">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <CircleDashed size={20} className="animate-spin mr-2" />
              Logging in...
            </>
          ) : (
            <>
              Log In
              <ArrowRight size={20} className="ml-2" />
            </>
          )}
        </button>
      </form>
      <p className="mt-4 text-gray-500 text-sm text-center">
        Use "Alice Johnson" or "Bob Williams" with any password to log in.
      </p>
    </div>
  );
};

export default LoginPage;
