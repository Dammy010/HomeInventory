import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Box, Home, List, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <header className="bg-gradient-to-br from-blue-100 via-white to-white py-24 text-center px-4">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Organize Your Home Smartly</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Easily track and manage the items in every room of your home all in one place.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-900 text-white px-8 py-3 text-lg rounded-full hover:bg-blue-800 transition duration-300"
        >
          Get Started
        </Link>
      </header>

      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Home className="mx-auto text-blue-700 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Create Rooms</h3>
            <p className="text-gray-600">
              Add different rooms in your home such as Bedroom, Kitchen, Living Room, etc.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Box className="mx-auto text-blue-700 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Add Items</h3>
            <p className="text-gray-600">
              Add detailed items to each room with name and quantity for easy tracking.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <List className="mx-auto text-blue-700 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Manage Easily</h3>
            <p className="text-gray-600">
              Edit or remove items and rooms anytime. Stay organized and clutter-free.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
