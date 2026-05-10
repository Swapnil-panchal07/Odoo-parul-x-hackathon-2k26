import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, Search, Filter, Calendar, 
  MapPin, Plus, MoreVertical, Trash2, Edit2, Map
} from 'lucide-react'

// Dummy Data
const myTrips = [
  { 
    id: 1, 
    name: 'Euro Summer Tour', 
    destinations: 'Paris, London, Rome',
    dates: 'Jun 15 - Jul 02, 2026', 
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop', 
    status: 'Upcoming' 
  },
  { 
    id: 2, 
    name: 'Japan Adventure', 
    destinations: 'Tokyo, Kyoto, Osaka',
    dates: 'Oct 10 - Oct 24, 2026', 
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop', 
    status: 'Planning' 
  },
  { 
    id: 3, 
    name: 'Weekend Getaway', 
    destinations: 'New York City',
    dates: 'May 01 - May 03, 2026', 
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop', 
    status: 'Past' 
  }
]

export default function MyTrips() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredTrips = myTrips.filter(trip => 
    (filter === 'All' || trip.status === filter) &&
    trip.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': return 'bg-green-100 text-green-700 border-green-200'
      case 'Planning': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Past': return 'bg-slate-100 text-slate-700 border-slate-200'
      default: return 'bg-primary-100 text-primary-700 border-primary-200'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xl font-bold text-slate-900">My Trips</span>
        </div>
        <Link to="/create-trip" className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" /> New Trip
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search trips..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['All', 'Upcoming', 'Planning', 'Past'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                  filter === status 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="h-56 relative overflow-hidden cursor-pointer">
                <img src={trip.image} alt={trip.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-primary-600 shadow-sm">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-red-600 shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{trip.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-sm">{trip.destinations}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-600">
                    <Calendar className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-sm">{trip.dates}</span>
                  </div>
                </div>
                
                <Link to={`/trip-builder/${trip.id}`} className="block w-full text-center bg-primary-50 text-primary-700 font-bold py-3 rounded-xl hover:bg-primary-100 transition-colors">
                  View Itinerary
                </Link>
              </div>
            </motion.div>
          ))}
          
          {/* Add New Trip Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filteredTrips.length * 0.1 }}
          >
            <Link to="/create-trip" className="h-full min-h-[400px] border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50/50 transition-all cursor-pointer group p-6">
              <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Plan another trip</h3>
              <p className="text-sm mt-2 text-center max-w-[200px]">The world is waiting for you.</p>
            </Link>
          </motion.div>
        </div>
        
        {filteredTrips.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Map className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No trips found</h3>
            <p className="text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        )}

      </main>
    </div>
  )
}
