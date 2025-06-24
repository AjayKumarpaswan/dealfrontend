import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'buyer' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful! Redirecting to login...', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/login'), 3500);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Registration failed. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Toast notifications container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* Full-page background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Professional office background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>
      
      {/* Registration form container */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100/80 p-4 rounded-full backdrop-blur-sm">
              <IdentificationIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-8">Join our Virtual Deal Room platform</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <select
                id="role"
                name="role"
                onChange={handleChange}
                className="w-full py-3 px-3 border border-gray-300/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
              >
                <option value="buyer">Buyer Account</option>
                <option value="seller">Seller Account</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Registering...' : 'Register Now'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/80">
          <p>© {new Date().getFullYear()} Virtual Deal Room. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;