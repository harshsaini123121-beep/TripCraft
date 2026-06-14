import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlanTrip from './pages/PlanTrip';
import TripResult from './pages/TripResult';
import MyTrips from './pages/MyTrips';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/result/:id" element={<TripResult />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
