import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('rooms')) || [];
    const found = stored.find((r) => r.id === id);
    setRoom(found);
  }, [id]);

  const updateLocalStorage = (updatedRoom) => {
    const allRooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const newRooms = allRooms.map((r) => (r.id === room.id ? updatedRoom : r));
    localStorage.setItem('rooms', JSON.stringify(newRooms));
    setRoom(updatedRoom);
  };

  const handleDeleteItem = (index) => {
    const updated = {
      ...room,
      items: room.items.filter((_, i) => i !== index),
    };
    updateLocalStorage(updated);
  };

  const openEditModal = (index) => {
    const currentItem = room.items[index];
    setEditIndex(index);
    setEditName(currentItem.name);
    setEditQuantity(currentItem.quantity.toString());
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    const name = editName.trim();
    const quantity = Number(editQuantity);

    if (!name || isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid name and a quantity greater than 0.");
      return;
    }

    const updatedItems = room.items.map((item, i) =>
      i === editIndex ? { ...item, name, quantity } : item
    );

    const updatedRoom = { ...room, items: updatedItems || [] };
    updateLocalStorage(updatedRoom);
    setIsModalOpen(false);
  };

  if (!room) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Room not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-700 underline hover:text-blue-900"
        >
          ← Back
        </button>
        <Link
          to={`/add-item/${room.id}`}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          + Add Item
        </Link>
      </div>

      <h2 className="text-4xl font-bold text-blue-900 mb-2 text-center">
        {room.name}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Here's a list of all items in this room.
      </p>

      {room.items.length === 0 ? (
        <p className="text-center text-gray-500">
          No items have been added to this room yet.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {room.items.map((item, index) => (
            <li
              key={index}
              className="bg-white border rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-3">
                <button
                  onClick={() => openEditModal(index)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">Edit Item</h3>

            <label className="block mb-2 text-sm">Item Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-2 text-sm">Quantity</label>
            <input
              type="number"
              min="1"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-6"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
