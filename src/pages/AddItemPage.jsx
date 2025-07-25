import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AddItemPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const updated = rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, items: [...r.items, { name, quantity }] };
      }
      return r;
    });
    localStorage.setItem('rooms', JSON.stringify(updated));
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-700 hover:text-blue-900 transition duration-200"
          >
            <ArrowLeft className="mr-1 w-5 h-5" />
            Back
          </button>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              id="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g. Air Conditioner"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              min="1"
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
