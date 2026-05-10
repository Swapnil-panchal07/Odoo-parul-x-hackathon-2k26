import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, MapPin, 
  TrendingUp, Check, XCircle
} from 'lucide-react'

// Mock Data
const allCities = [
  { id: 'c1', name: 'Kyoto', country: 'Japan', region: 'Asia', vibe: 'Historic', cost: '$$$', pop: 'Trending', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop' },
  { id: 'c2', name: 'Santorini', country: 'Greece', region: 'Europe', vibe: 'Beach', cost: '$$$', pop: 'Popular', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=600&auto=format&fit=crop' },
  { id: 'c3', name: 'Rome', country: 'Italy', region: 'Europe', vibe: 'Historic', cost: '$$', pop: 'Classic', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop' },
  { id: 'c4', name: 'Bali', country: 'Indonesia', region: 'Asia', vibe: 'Beach', cost: '$', pop: 'Trending', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
  { id: 'c5', name: 'New York', country: 'USA', region: 'North America', vibe: 'Urban', cost: '$$$$', pop: 'Popular', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop' },
  { id: 'c6', name: 'Banff', country: 'Canada', region: 'North America', vibe: 'Nature', cost: '$$$', pop: 'Trending', image: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=600&auto=format&fit=crop' },
]

const regions = ['All', 'Europe', 'Asia', 'North America']
const vibes = ['All', 'Historic', 'Beach', 'Urban', 'Nature']

export default function CitySearch() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedVibe, setSelectedVibe] = useState('All')
  const [addedCities, setAddedCities] = useState([])

  const filteredCities = allCities.filter(city => {
    const matchesQuery = city.name.toLowerCase().includes(query.toLowerCase()) || city.country.toLowerCase().includes(query.toLowerCase())
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion
    const matchesVibe = selectedVibe === 'All' || city.vibe === selectedVibe
    return matchesQuery && matchesRegion && matchesVibe
  })

  const toggleAdd = (cityId) => {
    if (addedCities.includes(cityId)) {
      setAddedCities(addedCities.filter(id => id !== cityId))
    } else {
      setAddedCities([...addedCities, cityId])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar & Search Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <nav className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Add Destination</h1>
              <p className="text-xs font-medium text-slate-500">Search globally</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
            disabled={addedCities.length === 0}
          >
            Done ({addedCities.length})
          </button>
        </nav>
        
        <div className="px-6 pb-6 max-w-5xl mx-auto">
          <div className="relative mt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or country..."
              autoFocus
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow text-lg"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Region:</span>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {regions.map(r => (
                  <button 
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${selectedRegion === r ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-4">
              <span className="text-sm font-medium text-slate-500">Vibe:</span>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {vibes.map(v => (
                  <button 
                    key={v}
                    onClick={() => setSelectedVibe(v)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${selectedVibe === v ? 'bg-accent-50 text-accent-700 border-accent-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10">
        
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCities.map((city) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    
                    <div className="absolute top-4 left-4">
                      {city.pop === 'Trending' && (
                        <div className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-accent-600 shadow-sm">
                          <TrendingUp className="w-3 h-3" /> Trending
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-sm leading-tight">{city.name}</h3>
                        <div className="flex items-center gap-1 text-white/90 text-sm font-medium mt-1 drop-shadow-sm">
                          <MapPin className="w-3.5 h-3.5" /> {city.country}
                        </div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-white font-bold text-sm border border-white/20">
                        {city.cost}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex items-center justify-between mt-auto bg-white">
                    <div className="text-sm font-medium text-slate-500 px-3 py-1 bg-slate-100 rounded-lg">
                      {city.vibe}
                    </div>
                    <button 
                      onClick={() => toggleAdd(city.id)}
                      className={`px-5 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                        addedCities.includes(city.id) 
                          ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                          : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      }`}
                    >
                      {addedCities.includes(city.id) ? (
                        <><Check className="w-4 h-4" /> Added</>
                      ) : (
                        'Add to Trip'
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No destinations found</h3>
            <p className="text-slate-500 max-w-sm">We couldn't find any cities matching your current filters. Try adjusting your search or clearing filters.</p>
            <button 
              onClick={() => { setQuery(''); setSelectedRegion('All'); setSelectedVibe('All'); }}
              className="mt-6 px-6 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  )
}
