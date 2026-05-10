import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, ArrowRight, MapPin, Calendar, 
  Users, Wallet, Image as ImageIcon, CheckCircle, Compass
} from 'lucide-react'

export default function CreateTrip() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    travelType: 'leisure',
    description: '',
    coverImage: null
  })

  const handleNext = () => setStep(s => Math.min(s + 1, 4))
  const handleBack = () => setStep(s => Math.max(s - 1, 1))
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const tripId = Date.now().toString()
    localStorage.setItem(`trip_${tripId}`, JSON.stringify(formData))
    navigate(`/trip-builder/${tripId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Plan New Trip</span>
          </div>
        </div>
        
        {/* Progress bar desktop */}
        <div className="hidden md:flex items-center gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-2 w-16 rounded-full ${i <= step ? 'bg-primary-600' : 'bg-slate-200'}`} />
          ))}
        </div>
        <div className="w-20" /> {/* Spacer for centering */}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 relative z-10"
        >
          <div className="mb-8">
            <span className="text-sm font-bold text-primary-600 mb-2 block uppercase tracking-wider">Step {step} of 4</span>
            <h2 className="text-3xl font-bold text-slate-900">
              {step === 1 && "Where are you heading?"}
              {step === 2 && "When is the trip?"}
              {step === 3 && "Trip details"}
              {step === 4 && "Make it yours"}
            </h2>
          </div>

          <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {/* STEP 1: Destination & Name */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Trip Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all text-lg"
                    placeholder="e.g. Euro Summer 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Main Destination / Starting Point</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all text-lg"
                      placeholder="e.g. Paris, France"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Dates */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="date"
                        name="startDate"
                        required
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="date"
                        name="endDate"
                        required
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      required
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Budget Target (Optional)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all"
                      placeholder="e.g. 5000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Travel Type</label>
                  <select
                    name="travelType"
                    value={formData.travelType}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all"
                  >
                    <option value="leisure">Leisure & Vacation</option>
                    <option value="business">Business</option>
                    <option value="adventure">Adventure</option>
                    <option value="family">Family</option>
                    <option value="honeymoon">Honeymoon</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Polish */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Trip Description / Notes</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                    placeholder="What's the goal of this trip?"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">Click to upload a cover photo</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex gap-4 pt-6 border-t border-slate-100">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-4 rounded-2xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="flex-1 flex justify-center items-center gap-2 bg-primary-600 text-white px-6 py-4 rounded-2xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
              >
                {step === 4 ? (
                  <>Create Trip <CheckCircle className="w-5 h-5" /></>
                ) : (
                  <>Next Step <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
