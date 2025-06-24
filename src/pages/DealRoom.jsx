// src/pages/MessageRoom.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const DealRoom = () => {
  const { dealId } = useParams(); // Use dealId from route
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${dealId}`);
        setMessages(res.data);
      } catch (err) {
        toast.error('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [dealId]);

  // Handle message send
  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSending(true);
    try {
      const res = await API.post('/messages', {
        dealId,
        content,
      });
      setMessages((prev) => [...prev, res.data]);
      setContent('');
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Deal Chat Room</h2>

        <div className="h-80 overflow-y-auto border p-4 mb-4 rounded bg-gray-50">
          {loading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded ${
                  msg.sender === user._id ? 'bg-blue-100 text-right' : 'bg-gray-200'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DealRoom;
