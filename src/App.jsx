import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import MyTrips from './pages/MyTrips'
import TripBuilder from './pages/TripBuilder'
import TripBudget from './pages/TripBudget'
import TripChecklist from './pages/TripChecklist'
import TripNotes from './pages/TripNotes'
import TripView from './pages/TripView'
import Profile from './pages/Profile'
import CitySearch from './pages/CitySearch'
import ActivitySearch from './pages/ActivitySearch'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/trip-builder/:id" element={<TripBuilder />} />
          <Route path="/budget" element={<TripBudget />} />
          <Route path="/checklist" element={<TripChecklist />} />
          <Route path="/notes" element={<TripNotes />} />
          <Route path="/trip-view/:id" element={<TripView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search-city/:tripId" element={<CitySearch />} />
          <Route path="/search-activities/:tripId/:stopId" element={<ActivitySearch />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
