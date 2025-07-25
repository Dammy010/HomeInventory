import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
      <p>{room.items.length} items</p>
      <div className="mt-2 space-x-2">
        <Link to={`/room/${room.id}`} className="text-blue-600 hover:underline">View</Link>
        <Link to={`/add-item/${room.id}`} className="text-green-600 hover:underline">Add Item</Link>
      </div>
    </div>
  );
}
