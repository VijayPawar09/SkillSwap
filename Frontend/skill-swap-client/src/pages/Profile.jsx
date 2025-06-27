import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SkillForm from '../components/profile/skillForm';
import axios from 'axios';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const handleSubmit = async (skills) => {
    setLoading(true);
    try {
      await axios.put('/api/profile/skills', skills);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update skills', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Skills updated successfully!
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {currentUser.name}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {currentUser.email}</p>
        </div>

        <SkillForm 
          teachSkills={currentUser.teachSkills} 
          learnSkills={currentUser.learnSkills} 
          onSubmit={handleSubmit} 
        />
        
        {loading && (
          <div className="mt-4 text-center text-gray-600">Saving...</div>
        )}
      </div>
    </div>
  );
}