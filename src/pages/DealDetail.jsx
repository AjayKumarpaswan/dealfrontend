import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const DealDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deal, setDeal] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user || !user._id) {
      toast.error('Please login to view deals');
      navigate('/login');
      return;
    }

    const fetchDeal = async () => {
      try {
        const res = await API.get(`/deals/${id}`);
        setDeal(res.data);
        setStatus(res.data.status || '');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch deal');
        console.error('Error fetching deal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, user, navigate]);

  const handleStatusUpdate = async () => {
    if (!status.trim()) return toast.error('Status cannot be empty');

    setUpdating(true);
    try {
      const res = await API.put(`/deals/${id}`, { status });
      setDeal(res.data);
      toast.success('Deal status updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
      console.error('Error updating deal:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (!deal) return <div className="text-center py-10 text-red-600">Deal not found.</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?business,technology')" }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Deal Details</h1>

        <div className="space-y-4 text-gray-700 text-lg">
          <p><span className="font-semibold">Title:</span> {deal.title}</p>
          <p><span className="font-semibold">Description:</span> {deal.description}</p>
          <p><span className="font-semibold">Price:</span> ₹{deal.price}</p>
          <p><span className="font-semibold">Seller ID:</span> {deal.seller}</p>
          <p><span className="font-semibold">Status:</span> {deal.status || 'Not set'}</p>
        </div>

        <div className="mt-8">
          <label htmlFor="status" className="block text-sm font-medium text-gray-600 mb-1">
            Update Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="e.g., In Progress, Completed"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleStatusUpdate}
            disabled={updating}
            className={`mt-4 w-full bg-blue-600 text-white py-3 rounded-md shadow-sm font-medium transition duration-200 ${
              updating ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {updating ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealDetail;
