import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MatchCard from '../components/matches/matchCard';
import axios from 'axios';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchMatches = async () => {
      try {
        const { data } = await axios.get('/api/matches');
        setMatches(data);
      } catch (err) {
        setError('Failed to load matches');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [currentUser, navigate]);

  const handleConnect = async (matchId) => {
    try {
      await axios.post('/api/matches/connect', { matchId });
      setMatches(matches.filter(match => match._id !== matchId));
    } catch (err) {
      console.error('Failed to connect', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Potential Matches</h1>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      {loading ? (
        <div className="text-center text-gray-600">Loading matches...</div>
      ) : matches.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-gray-700">No matches found. Update your skills to find matches.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(match => (
            <MatchCard 
              key={match._id} 
              match={match} 
              onConnect={handleConnect} 
            />
          ))}
        </div>
      )}
    </div>
  );
}