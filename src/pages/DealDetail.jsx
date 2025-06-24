import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token:", token);
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching deal with ID:', id);

        const response = await axios.put(
          `https://dealbackend.onrender.com/api/deals/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('Deal fetched:', response.data);
        setDeal(response.data);
      } catch (error) {
        console.error('Error fetching deal:', error);
        if (error.response?.status === 401) {
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (error.response?.status === 404) {
          setError('Deal not found');
        } else {
          setError('Failed to load deal. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, navigate]);

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    setStatusUpdateMessage(`Updating status to ${newStatus}...`);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Updating deal:', id, 'to status:', newStatus);
      
      const response = await axios.get(
        `https://dealbackend.onrender.com/api/deals/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data);
      
      setDeal(response.data);
      setStatusUpdateMessage(`Status updated to ${newStatus}!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatusUpdateMessage(''), 3000);
      
    } catch (error) {
      console.error('Error updating status:', error);
      setStatusUpdateMessage('Failed to update status');
      
      if (error.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to update deal status. Please try again.');
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              {error.includes('session has expired') && (
                <button
                  onClick={() => navigate('/login')}
                  className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Go to Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-lg text-gray-600">Deal not found</p>
        <button
          onClick={() => navigate('/deals')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Deals
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Status Update Notification */}
      {statusUpdateMessage && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg ${
          statusUpdateMessage.includes('Failed') 
            ? 'bg-red-500' 
            : 'bg-green-500'
        } text-white animate-fade-in`}>
          {statusUpdateMessage}
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{deal.title}</h1>
              <p className="mt-2 text-gray-600">{deal.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              deal.status === 'Completed' ? 'bg-green-100 text-green-800' :
              deal.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {deal.status}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Price</p>
              <p className="mt-1 text-lg font-semibold text-blue-600">${deal.price}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="mt-1 text-gray-900">
                {new Date(deal.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            {deal.status === 'Pending' && (
              <div className="space-x-3">
                <button
                  onClick={() => updateStatus('In Progress')}
                  disabled={updating}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {updating ? 'Processing...' : 'Accept Deal'}
                </button>
                <button
                  onClick={() => updateStatus('Cancelled')}
                  disabled={updating}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {updating ? 'Processing...' : 'Reject Deal'}
                </button>
              </div>
            )}

            {deal.status === 'In Progress' && (
              <button
                onClick={() => updateStatus('Completed')}
                disabled={updating}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {updating ? 'Processing...' : 'Mark as Completed'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetail;