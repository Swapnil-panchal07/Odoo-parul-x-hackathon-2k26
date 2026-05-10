import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, Clock, 
  Plus, Trash2, Camera, Coffee, Navigation, Tent, XCircle
} from 'lucide-react'

// Mock Data
const allActivities = [
  { id: 'a1', title: 'Eiffel Tower Guided Tour', category: 'Culture', priceRange: '$$', duration: '2 hours', cost: '$45', image: 'https://images.unsplash.com/photo-1543305113-e6bb16bcebc0?q=80&w=600&auto=format&fit=crop', desc: 'Skip the line and explore the iconic Eiffel Tower with an expert guide.' },
  { id: 'a2', title: 'Seine River Evening Cruise', category: 'Adventure', priceRange: '$', duration: '1.5 hours', cost: '$25', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop', desc: 'See Paris illuminated at night on a relaxing boat cruise along the Seine.' },
  { id: 'a3', title: 'Louvre Museum Access', category: 'Culture', priceRange: '$$', duration: '4 hours', cost: '$40', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop', desc: 'Discover the Mona Lisa and thousands of other masterpieces.' },
  { id: 'a4', title: 'Montmartre Food Tour', category: 'Food', priceRange: '$$$', duration: '3 hours', cost: '$85', image: 'https://images.unsplash.com/photo-1554652230-058b8f36c535?q=80&w=600&auto=format&fit=crop', desc: 'Taste local cheeses, wines, and pastries in the historic artists district.' },
  { id: 'a5', title: 'Versailles Palace Trip', category: 'Sightseeing', priceRange: '$$$', duration: '6 hours', cost: '$90', image: 'https://images.unsplash.com/photo-1563810486-5389cb43dd6a?q=80&w=600&auto=format&fit=crop', desc: 'Half-day trip to the opulent Palace of Versailles and its stunning gardens.' },
  { id: 'a6', title: 'Catacombs Underground', category: 'Adventure', priceRange: '$$', duration: '2 hours', cost: '$55', image: 'https://images.unsplash.com/photo-1597838816882-4435b1977fbe?q=80&w=600&auto=format&fit=crop', desc: 'Explore the dark history of Paris in the famous underground ossuaries.' },
]

const categories = ['All', 'Culture', 'Adventure', 'Food', 'Sightseeing']
const prices = ['All', '$', '$$', '$$$']

const catIcons = {
  Culture: <Camera className="w-4 h-4" />,
  Adventure: <Navigation className="w-4 h-4" />,
  Food: <Coffee className="w-4 h-4" />,
  Sightseeing: <Tent className="w-4 h-4" />
}

export default function ActivitySearch() {
  const { tripId, stopId } = useParams()
  const navigate = useNavigate()
  
  const [selectedCat, setSelectedCat] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [addedActivities, setAddedActivities] = useState(['a1']) // Mock pre-added
  
  const filteredActivities = allActivities.filter(act => {
    const matchCat = selectedCat === 'All' || act.category === selectedCat
    const matchPrice = selectedPrice === 'All' || act.priceRange === selectedPrice
    return matchCat && matchPrice
  })

  const toggleActivity = (id) => {
    if (addedActivities.includes(id)) {
      setAddedActivities(addedActivities.filter(a => a !== id))
    } else {
      setAddedActivities([...addedActivities, id])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header & Filters */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <nav className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Discover Activities</h1>
              <p className="text-xs font-medium text-slate-500">Paris, France</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm"
          >
            Done ({addedActivities.length})
          </button>
        </nav>
        
        <div className="px-6 pb-4 flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Category:</span>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedCat(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${selectedCat === c ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:ml-4">
            <span className="text-sm font-medium text-slate-500">Price:</span>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {prices.map(p => (
                <button 
                  key={p}
                  onClick={() => setSelectedPrice(p)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${selectedPrice === p ? 'bg-accent-50 text-accent-700 border-accent-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-10">
        {filteredActivities.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredActivities.map((act) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row"
                >
                  <div className="md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden">
                    <img src={act.image} alt={act.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm border border-slate-100 flex items-center gap-1.5">
                      {catIcons[act.category]} {act.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{act.title}</h3>
                      <div className="text-lg font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl shrink-0">
                        {act.cost}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 flex-1">{act.desc}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Clock className="w-4 h-4" /> {act.duration}
                      </div>
                      
                      <button 
                        onClick={() => toggleActivity(act.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                          addedActivities.includes(act.id)
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {addedActivities.includes(act.id) ? (
                          <><Trash2 className="w-4 h-4" /> Remove</>
                        ) : (
                          <><Plus className="w-4 h-4" /> Add Activity</>
                        )}
                      </button>
                    </div>
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">No activities found</h3>
            <p className="text-slate-500 max-w-sm">Try adjusting your filters to discover more amazing things to do.</p>
            <button 
              onClick={() => { setSelectedCat('All'); setSelectedPrice('All'); }}
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
