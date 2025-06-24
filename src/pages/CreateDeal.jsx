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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Deal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-3 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="seller"
          value={formData.seller}
          readOnly
          className="w-full p-3 bg-gray-100 border rounded cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Creating...' : 'Create Deal'}
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;
