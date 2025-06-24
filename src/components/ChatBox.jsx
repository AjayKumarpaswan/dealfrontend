import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBox = ({ dealId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${dealId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [dealId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const response = await axios.post('/api/messages', {
        dealId,
        content: newMessage
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h3>Chat</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;