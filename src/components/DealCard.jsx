import { Link } from 'react-router-dom';

const DealCard = ({ deal }) => (
  <div className="bg-white p-4 shadow rounded">
    <h2 className="font-bold text-lg">{deal.title}</h2>
    <p>{deal.description}</p>
    <p className="text-blue-600">₹{deal.price}</p>
    <p>Status: {deal.status}</p>
    <Link to={`/deal-room?id=${deal._id}`} className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded">View</Link>
  </div>
);

export default DealCard;
