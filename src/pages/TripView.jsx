import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Share2, Copy, MapPin, 
  Calendar, Clock, Navigation, CheckCircle
} from 'lucide-react'

// Dummy Data
const trip = {
  id: 1,
  name: 'Euro Summer Tour',
  description: 'A two week journey through the most romantic cities in Europe.',
  cover: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop',
  dates: 'Jun 15 - Jul 02, 2026',
  stops: [
    {
      city: 'Paris, France',
      date: 'Jun 15 - Jun 20',
      activities: [
        { title: 'Eiffel Tower Tour', time: '10:00 AM', type: 'Culture' },
        { title: 'Seine River Cruise', time: '07:30 PM', type: 'Adventure' }
      ]
    },
    {
      city: 'London, UK',
      date: 'Jun 20 - Jun 25',
      activities: [
        { title: 'British Museum', time: '11:00 AM', type: 'Culture' },
        { title: 'London Eye', time: '04:00 PM', type: 'Sightseeing' }
      ]
    }
  ]
}

export default function TripView() {
  const { id } = useParams()
  // Mock Public share toggle
  const isPublic = true

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={trip.cover} alt={trip.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-slate-50"></div>
        
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <Link to="/trips" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors">
              <Copy className="w-4 h-4" /> Copy Trip
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-6 md:p-12 z-10 max-w-5xl mx-auto left-0 right-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isPublic && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <CheckCircle className="w-3 h-3" /> Public Itinerary
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">{trip.name}</h1>
            <p className="text-xl text-white/90 max-w-2xl drop-shadow-md mb-6">{trip.description}</p>
            <div className="flex items-center gap-4 text-white">
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <Calendar className="w-5 h-5" /> {trip.dates}
              </span>
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <MapPin className="w-5 h-5" /> {trip.stops.length} Cities
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 -mt-8 relative z-20">
        <div className="space-y-12">
          {trip.stops.map((stop, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline dot & line (mobile only for left side, desktop is central) */}
              <div className="md:hidden absolute left-0 top-2 bottom-[-48px] w-0.5 bg-slate-200"></div>
              <div className="md:hidden absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-primary-500 border-4 border-slate-50 box-content"></div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">{stop.city}</h2>
                    <p className="text-slate-500 font-medium mt-1">{stop.date}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 border border-primary-100">
                    <Navigation className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-6">
                  {stop.activities.map((act, actIdx) => (
                    <div key={actIdx} className="flex gap-4 group">
                      <div className="w-16 shrink-0 text-sm font-bold text-slate-400 mt-1">{act.time}</div>
                      <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 group-hover:border-primary-200 group-hover:bg-primary-50/30 transition-colors">
                        <h4 className="font-bold text-slate-900">{act.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{act.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
