// src/pages/CreateDeal.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDeal = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    seller: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      toast.error('Please log in to create a deal');
      navigate('/login');
    } else {
      setFormData(prev => ({ ...prev, seller: user._id }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await API.post('/deals', {
        ...formData,
        price: Number(formData.price)
      });

      toast.success('Deal created!');
      navigate(`/deals/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Deal creation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1740&q=80')"
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create New Deal</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              placeholder="Enter deal title"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Describe the deal"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Seller ID</label>
            <input
              name="seller"
              value={formData.seller}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md shadow-md transition duration-200"
          >
            {isSubmitting ? 'Creating...' : 'Create Deal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDeal;
