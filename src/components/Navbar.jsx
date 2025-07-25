import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">HomeInventory</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/add-room" className="hover:underline">Add Room</Link>
        </div>
      </div>
    </nav>
  );
}
