import React from 'react';
import { FaLink } from 'react-icons/fa'; 

export default function MatchCard({ match, onConnect }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-900">{match.name}</h3>
            <p className="text-sm text-gray-600">{match.email}</p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-bold">
            {Math.floor(Math.random() * 41) + 60}% Match
          </div>
        </div>

        <div className="mb-3">
          <h4 className="font-medium text-gray-700 text-sm">Can Teach:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {match.teachSkills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx} 
                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 text-sm">Wants to Learn:</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {match.learnSkills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onConnect(match._id)}
          className="mt-4 bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
        >
          <FaLink className="mr-2" /> Connect
        </button>
      </div>
    </div>
  );
}