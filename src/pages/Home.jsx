import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Map, Plane, Compass, CalendarDays, Star, ArrowRight } from 'lucide-react'

const features = [
  {
    title: 'Smart Itinerary Builder',
    description: 'Drag, drop, and organize your multi-city trip perfectly.',
    icon: <Map className="w-6 h-6 text-primary-500" />
  },
  {
    title: 'Budget Tracking',
    description: 'Keep your finances in check with beautiful visual charts.',
    icon: <Plane className="w-6 h-6 text-accent-500" />
  },
  {
    title: 'Packing Checklists',
    description: 'Never forget an essential again with categorized lists.',
    icon: <CalendarDays className="w-6 h-6 text-primary-500" />
  }
]

const destinations = [
  { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop', price: '$$$' },
  { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop', price: '$$' },
  { name: 'Banff, Canada', image: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=800&auto=format&fit=crop', price: '$$$' },
]

export default function Home() {
  return (
    <div className="flex-grow bg-slate-50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-300 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-300 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>

      {/* Navbar Placeholder */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-2 rounded-xl">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Traveloop</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Log in</Link>
          <Link to="/auth" className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg">Sign up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm mb-8"
        >
          <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
          <span className="text-sm font-medium text-slate-700">The #1 tool for multi-city adventures</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
        >
          Plan your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">dream trip</span><br/> in minutes.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-600 max-w-2xl mb-10"
        >
          Build stunning multi-city itineraries, track your budget, and pack smart. 
          All your travel plans seamlessly organized in one beautiful place.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/auth" className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 hover:scale-105">
            Start Planning Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium text-slate-700 bg-white/50 backdrop-blur-md border border-slate-200 hover:bg-white transition-all shadow-sm">
            Explore Demo
          </button>
        </motion.div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 px-6 relative z-10 bg-white/40 backdrop-blur-lg border-t border-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to travel</h2>
            <p className="text-slate-600 text-lg">Powerful tools hidden behind a beautifully simple interface.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trending destinations</h2>
              <p className="text-slate-600 text-lg">Get inspired for your next adventure.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">{dest.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-slate-50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary-600" />
            <span className="text-xl font-bold text-slate-900">Traveloop</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Traveloop Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
