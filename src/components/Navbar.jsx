import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">HomeInventory</Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/add-room" className="hover:underline">Add Room</Link>
        </div>
      </div>

      {menuOpen && (
        <div ref={menuRef} className="md:hidden px-4 pb-4 space-y-2 bg-blue-800 text-white">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/dashboard" className="block hover:underline" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/add-room" className="block hover:underline" onClick={() => setMenuOpen(false)}>Add Room</Link>
        </div>
      )}
    </nav>
  );
}
