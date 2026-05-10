import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, Plane, Wallet, Map, Calendar, 
  ArrowRight, Compass, Bell, Settings, LogOut,
  TrendingUp, Activity, MapPin, CheckCircle,
  CheckSquare, FileText, Share2, Shield, User
} from 'lucide-react'

// Dummy Data
const stats = [
  { label: 'Total Trips', value: '12', icon: <Map className="w-5 h-5 text-primary-500" /> },
  { label: 'Countries Visited', value: '8', icon: <Compass className="w-5 h-5 text-accent-500" /> },
  { label: 'Upcoming', value: '1', icon: <Calendar className="w-5 h-5 text-green-500" /> },
]

const upcomingTrips = [
  { id: 1, name: 'Euro Summer Tour', dates: 'Jun 15 - Jul 02', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop', status: 'Upcoming' },
]

const recentActivity = [
  { id: 1, text: 'Added Paris to Euro Summer Tour', time: '2h ago', icon: <MapPin className="w-4 h-4" /> },
  { id: 2, text: 'Booked flight to London', time: '5h ago', icon: <Plane className="w-4 h-4" /> },
  { id: 3, text: 'Completed packing checklist for Japan', time: '1d ago', icon: <CheckCircle className="w-4 h-4" /> },
]

export default function Dashboard() {
  const role = localStorage.getItem('userRole')
  const navigate = useNavigate()
  
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 hidden md:flex md:flex-col justify-between sticky top-0 h-screen">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="bg-primary-600 p-2 rounded-xl">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Traveloop</span>
          </Link>

          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
              <Activity className="w-5 h-5" /> Dashboard
            </Link>
            <Link to="/trips" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Map className="w-5 h-5" /> My Trips
            </Link>
            <Link to="/budget" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Wallet className="w-5 h-5" /> Cost Breakdown
            </Link>
            <Link to="/checklist" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <CheckSquare className="w-5 h-5" /> Packing Checklist
            </Link>
            <Link to="/notes" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <FileText className="w-5 h-5" /> Trip Notes
            </Link>
            <Link to="/trip-view/1" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Share2 className="w-5 h-5" /> Shared Itinerary
            </Link>
            {role === 'admin' && (
              <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                <Shield className="w-5 h-5" /> Admin Dashboard
              </Link>
            )}
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </nav>
        </div>

        <div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors w-full">
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-8 relative">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, Alex! 👋</h1>
            <p className="text-slate-500 mt-1">Ready for your next adventure?</p>
          </div>
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setShowNotif(!showNotif)}
              className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
            </button>
            
            <AnimatePresence>
              {showNotif && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-14 right-14 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4"
                >
                  <h3 className="font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">Notifications</h3>
                  <p className="text-sm text-slate-500 text-center py-4">You're all caught up!</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={() => setShowProfile(!showProfile)} className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm focus:ring-2 focus:ring-primary-500">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-14 right-0 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                >
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 w-full text-left">
                    <User className="w-4 h-4" /> User Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left border-t border-slate-100">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Welcome Notification Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-primary-600/20 mb-10 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-md mb-3 border border-white/20">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> PROMO
              </div>
              <h2 className="text-2xl font-bold mb-2">Get 20% off your first trip!</h2>
              <p className="text-primary-100 max-w-lg">Plan a multi-city tour and discover budget-friendly destinations selected just for you.</p>
            </div>
            <Link to="/create-trip" className="shrink-0 flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg">
              <Plus className="w-5 h-5" /> Plan New Trip
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Stats & Upcoming) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Trip */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">Upcoming Trip</h3>
                <Link to="/trips" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all</Link>
              </div>
              {upcomingTrips.map(trip => (
                <div 
                  key={trip.id} 
                  onClick={() => navigate(`/trip-builder/${trip.id}`)}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row group hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-full md:w-48 h-48 md:h-auto relative">
                    <img src={trip.image} alt={trip.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-3 w-max uppercase tracking-wider">{trip.status}</span>
                    <h4 className="text-2xl font-bold text-slate-900 mb-1">{trip.name}</h4>
                    <p className="text-slate-500 flex items-center gap-2 font-medium mb-6">
                      <Calendar className="w-4 h-4" /> {trip.dates}
                    </p>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors">View Itinerary</button>
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/trip-builder/${trip.id}`); }} className="px-4 py-2.5 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Budget Summary Preview */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent-500" /> Budget Overview
                </h3>
                <Link to="/budget" className="text-sm font-medium text-primary-600">Details</Link>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-32 h-32 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-32 h-32 drop-shadow-md">
                    <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-primary-500" strokeDasharray="60, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-slate-900">60%</span>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-slate-600">Spent ($2,400)</span>
                      <span className="text-slate-900">Budget ($4,000)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column (Recent & Recommended) */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => navigate('/create-trip')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">
                  <Plus className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">New Trip</span>
                </button>
                <button onClick={() => navigate('/search-city/1')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-accent-50 text-accent-700 hover:bg-accent-100 transition-colors">
                  <Map className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Explore</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div 
                    key={activity.id} 
                    className="flex gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors"
                    onClick={() => navigate('/trip-builder/1')}
                  >
                    <div className="mt-0.5 p-2 bg-slate-50 text-slate-400 rounded-full border border-slate-100 shrink-0">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{activity.text}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/trips')} className="w-full mt-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors border-t border-slate-100 pt-4">View all activity</button>
            </div>

            {/* Recommended */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recommended</h3>
              <div className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer" onClick={() => navigate('/search-city/1')}>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=500&auto=format&fit=crop" alt="London" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 p-4 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white font-bold text-lg leading-tight">London, UK</h4>
                  <p className="text-white/80 text-xs mt-1">Perfect for your budget profile</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

function Star(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
