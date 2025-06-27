import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
import io from 'socket.io-client';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

export default function ChatWindow({ roomId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL);
    setSocket(newSocket);
    
    newSocket.emit('joinRoom', roomId);
    newSocket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/api/messages/${roomId}`);
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };
    
    if (roomId) fetchMessages();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const messageData = {
      room: roomId,
      sender: currentUserId,
      content: newMessage,
      timestamp: new Date()
    };
    
    // Send to socket
    socket.emit('sendMessage', messageData);
    
    // Save to database
    try {
      await axios.post('/api/messages', messageData);
    } catch (error) {
      console.error('Failed to save message', error);
    }
    
    // Update UI
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`mb-3 ${msg.sender === currentUserId ? 'text-right' : ''}`}
            >
              <div 
                className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === currentUserId 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-3 bg-white">
        <div className="flex">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg p-2 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
            rows={1}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 flex items-center"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}