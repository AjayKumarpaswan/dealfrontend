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
    if (!user || !user.token) {
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

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;

  if (!deal) return <div className="p-4 text-red-600">Deal not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white mt-10 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Deal Details</h1>
      <p><strong>Title:</strong> {deal.title}</p>
      <p><strong>Description:</strong> {deal.description}</p>
      <p><strong>Price:</strong> ₹{deal.price}</p>
      <p><strong>Seller ID:</strong> {deal.seller}</p>
      <p><strong>Status:</strong> {deal.status || 'Not set'}</p>
      {/* <p><strong>Seller Username:</strong> {deal.seller?.username}</p> */}

      <div className="mt-6">
        <label htmlFor="status" className="block mb-1 font-medium text-gray-700">Update Status</label>
        <input
          type="text"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleStatusUpdate}
          disabled={updating}
          className={`mt-3 bg-blue-600 text-white px-4 py-2 rounded ${updating ? 'opacity-60' : 'hover:bg-blue-700'}`}
        >
          {updating ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </div>
  );
};

export default DealDetail;
