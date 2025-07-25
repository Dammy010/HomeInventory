import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import RoomDetailPage from './pages/RoomDetailPage';
import AddItemPage from './pages/AddItemPage';
import AddRoomPage from './pages/AddRoomPage';
import MainLayout from './layouts/MainLayout';
import AboutPage from './pages/AboutPage';


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/room/:id" element={<RoomDetailPage />} />
        <Route path="/add-item/:roomId" element={<AddItemPage />} />
        <Route path="/add-room" element={<AddRoomPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
