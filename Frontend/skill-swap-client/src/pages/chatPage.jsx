import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatWindow from '../components/chat/chatWindow';
import axios from 'axios';

export default function ChatPage() {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const [matchUser, setMatchUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchMatchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${roomId}`);
        setMatchUser(data);
      } catch (error) {
        console.error('Failed to fetch match details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchUser();
  }, [roomId, currentUser, navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Chat</h1>
      
      {loading ? (
        <div className="text-center text-gray-600">Loading chat...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-[600px] flex flex-col">
          <div className="border-b p-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              Chat with {matchUser?.name || 'User'}
            </h2>
          </div>
          <ChatWindow 
            roomId={roomId} 
            currentUserId={currentUser._id} 
          />
        </div>
      )}
    </div>
  );
}