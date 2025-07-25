import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('rooms')) || [];
    setRooms(stored);
  }, []);

  const updateLocalStorage = (updatedRooms) => {
    setRooms(updatedRooms);
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  };

  const handleDeleteRoom = (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this room?');
    if (!confirmDelete) return;

    const filtered = rooms.filter(r => r.id !== id);
    updateLocalStorage(filtered);
  };

  const openEditRoomModal = (room) => {
    setEditingRoom(room);
    setNewRoomName(room.name);
  };

  const handleEditRoomSave = () => {
    if (!newRoomName.trim()) return;
    const updatedRooms = rooms.map(r =>
      r.id === editingRoom.id ? { ...r, name: newRoomName.trim() } : r
    );
    updateLocalStorage(updatedRooms);
    setEditingRoom(null);
    setNewRoomName('');
  };

  const handleDeleteItem = (roomId, itemId) => {
    const updatedRooms = rooms.map(room =>
      room.id === roomId
        ? { ...room, items: room.items.filter(item => item.id !== itemId) }
        : room
    );
    updateLocalStorage(updatedRooms);
  };

  const openEditItemModal = (roomId, item) => {
    setEditingItem({ ...item, roomId });
    setNewItemName(item.name);
  };

  const handleEditItemSave = () => {
    const updatedRooms = rooms.map(room =>
      room.id === editingItem.roomId
        ? {
            ...room,
            items: room.items.map(item =>
              item.id === editingItem.id ? { ...item, name: newItemName.trim() } : item
            )
          }
        : room
    );
    updateLocalStorage(updatedRooms);
    setEditingItem(null);
    setNewItemName('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-blue-900">Your Rooms</h2>
        <button
          onClick={() => navigate('/add-room')}
          className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800"
        >
          + Add Room
        </button>
      </div>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-600">
          No rooms yet.{' '}
          <a href="/add-room" className="text-blue-600 underline font-medium">
            Create one
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div
              key={room.id}
              className="bg-white shadow p-6 rounded-xl border border-gray-100 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{room.name}</h3>

              {room.items.length === 0 ? (
                <p className="text-gray-500 mb-4">No items added yet.</p>
              ) : (
                <ul className="mb-4 text-sm space-y-1">
                  {room.items.map(item => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{item.name}</span>
                      <div className="space-x-2 text-xs">
                        <button
                          onClick={() => openEditItemModal(room.id, item)}
                          className="text-yellow-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(room.id, item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3 justify-between items-center mt-auto">
                <a
                  href={`/room/${room.id}`}
                  className="text-sm text-white bg-blue-700 px-3 py-1.5 rounded hover:bg-blue-800"
                >
                  View
                </a>
                <button
                  onClick={() => navigate(`/add-item/${room.id}`)}
                  className="text-sm text-green-600 hover:underline"
                >
                  + Add Item
                </button>
                <button
                  onClick={() => openEditRoomModal(room)}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Edit Room Name</h3>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingRoom(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditRoomSave}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Edit Item Name</h3>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditItemSave}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
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
