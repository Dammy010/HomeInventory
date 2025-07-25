import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function AddRoomPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = { id: uuidv4(), name, items: [] };
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms.push(newRoom);
    localStorage.setItem('rooms', JSON.stringify(rooms));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Add a New Room</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Room Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g. Living Room"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Add Room
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full border border-blue-900 text-blue-900 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
