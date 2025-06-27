import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function SkillForm({ teachSkills, learnSkills, onSubmit }) {
  const [teachList, setTeachList] = useState(teachSkills || []);
  const [learnList, setLearnList] = useState(learnSkills || []);

  const handleAddSkill = (type) => {
    if (type === 'teach') {
      setTeachList([...teachList, { name: '', category: '', level: '' }]);
    } else {
      setLearnList([...learnList, { name: '', category: '', level: '' }]);
    }
  };

  const handleRemoveSkill = (type, index) => {
    if (type === 'teach') {
      const newList = [...teachList];
      newList.splice(index, 1);
      setTeachList(newList);
    } else {
      const newList = [...learnList];
      newList.splice(index, 1);
      setLearnList(newList);
    }
  };

  const handleSkillChange = (type, index, field, value) => {
    if (type === 'teach') {
      const newList = [...teachList];
      newList[index] = { ...newList[index], [field]: value };
      setTeachList(newList);
    } else {
      const newList = [...learnList];
      newList[index] = { ...newList[index], [field]: value };
      setLearnList(newList);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ teachSkills: teachList, learnSkills: learnList });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Skills I Can Teach</h2>
          <button 
            type="button" 
            onClick={() => handleAddSkill('teach')}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 flex items-center"
          >
            <FaPlus className="mr-1" /> Add
          </button>
        </div>
        
        {teachList.map((skill, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 items-end">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange('teach', index, 'name', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => handleSkillChange('teach', index, 'category', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Level</label>
              <select
                value={skill.level}
                onChange={(e) => handleSkillChange('teach', index, 'level', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSkill('teach', index)}
              className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Skills I Want to Learn</h2>
          <button 
            type="button" 
            onClick={() => handleAddSkill('learn')}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 flex items-center"
          >
            <FaPlus className="mr-1" /> Add
          </button>
        </div>
        
        {learnList.map((skill, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 items-end">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange('learn', index, 'name', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => handleSkillChange('learn', index, 'category', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Level</label>
              <select
                value={skill.level}
                onChange={(e) => handleSkillChange('learn', index, 'level', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSkill('learn', index)}
              className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        className="bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700"
      >
        Save Skills
      </button>
    </form>
  );
}