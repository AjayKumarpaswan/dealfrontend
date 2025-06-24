import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('https://dealbackend.onrender.com/api/deals', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
        
        if (error.response?.status === 401) {
          // Token expired or invalid
          logout();
          setError('Your session has expired. Please log in again.');
        } else {
          setError(error.response?.data?.message || 'Failed to load deals. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 bg-opacity-90">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 bg-opacity-90 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <svg className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">{error}</h3>
            {error.includes('session has expired') && (
              <Link 
                to="/login" 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Go to Login
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-50 bg-opacity-90 py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {user?.role === 'seller' ? 'Deals Assigned to Me' : 'My Deals'}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {deals.length} {deals.length === 1 ? 'deal' : 'deals'} found
              </p>
            </div>
            <Link
              to="/deals/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
            >
              Create New Deal
            </Link>
          </div>
        </div>

        {deals.length === 0 ? (
          <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-lg rounded-xl p-8 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No deals found</h3>
            <p className="mt-2 text-sm text-gray-600">
              {user?.role === 'seller' 
                ? 'You currently have no deals assigned to you.' 
                : 'Get started by creating your first deal.'}
            </p>
            {user?.role !== 'seller' && (
              <div className="mt-6">
                <Link
                  to="/deals/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                >
                  Create Deal
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <div
                key={deal._id}
                className="bg-white bg-opacity-90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{deal.title}</h3>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        deal.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : deal.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {deal.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">{deal.description}</p>
                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${deal.price}</span>
                    <div className="flex space-x-2">
                      <Link
                        to={`/deals/${deal._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                      >
                        View Details
                      </Link>
                      {user?.role === 'seller' && deal.status === 'Pending' && (
                        <button
                          onClick={() => handleStatusUpdate(deal._id, 'In Progress')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;