import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mountain } from 'lucide-react'

export default function TripBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  
  useEffect(() => {
    const saved = localStorage.getItem(`trip_${id}`)
    if (saved) {
      setTrip(JSON.parse(saved))
    } else {
      setTrip({
        name: 'New Trip',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })
    }
  }, [id])

  if (!trip) return null

  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)
  // Calculate difference in days, at least 1 day
  const daysDiff = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1)
  
  const days = Array.from({ length: daysDiff }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl flex items-center justify-between px-6 mb-6">
         <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
           <ArrowLeft className="w-5 h-5" /> Back to Dashboard
         </button>
      </div>
      
      {/* Printable Area matching the image */}
      <div className="w-full max-w-4xl bg-[#e5a98d] rounded-sm shadow-xl p-10 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-5xl font-black text-[#c1272d] uppercase tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
            Travel<br/>Itinerary
          </h1>
          <div className="relative w-32 h-32 flex items-end justify-end">
             <div className="absolute top-0 right-4 w-16 h-16 bg-[#c1272d] rounded-full"></div>
             <Mountain className="w-24 h-24 text-[#5c3e34] z-10 fill-current" />
             <Mountain className="w-16 h-16 text-[#3d5a5c] absolute bottom-0 left-0 z-20 fill-current" />
          </div>
        </div>

        {/* Top Inputs */}
        <div className="flex gap-6 mb-4">
          <div className="flex-1 flex bg-white px-4 py-2 font-bold text-[#c1272d] text-lg rounded-sm items-center">
            WEEK <input className="ml-2 w-full outline-none text-slate-800 font-normal bg-transparent" defaultValue="1" />
          </div>
          <div className="flex-1 flex bg-white px-4 py-2 font-bold text-[#c1272d] text-lg rounded-sm items-center">
            DATE <input className="ml-2 w-full outline-none text-slate-800 font-normal bg-transparent" defaultValue={`${trip.startDate} to ${trip.endDate}`} />
          </div>
        </div>

        {/* Table */}
        <div className="w-full bg-white rounded-sm overflow-hidden border-2 border-[#e5a98d]">
          <div className="flex bg-[#3d5a5c] text-white font-bold text-center uppercase tracking-wider text-sm">
            <div className="w-1/4 py-3 border-r border-[#e5a98d]">Activity</div>
            <div className="w-2/4 py-3 border-r border-[#e5a98d]">Description</div>
            <div className="w-1/4 py-3">Time</div>
          </div>
          
          {days.map((day) => (
            <div key={day} className="flex border-t border-[#e5a98d] min-h-[80px]">
              <div className="w-1/4 flex items-center justify-center font-bold text-[#3d5a5c] border-r border-[#e5a98d] bg-white text-lg">
                Day {day}
              </div>
              <div className="w-2/4 p-4 border-r border-[#e5a98d] bg-white text-[#3d5a5c] flex flex-col justify-center">
                <div className="font-medium flex items-center">Budget: <input className="outline-none text-slate-800 ml-2 flex-1 border-b border-dashed border-[#e5a98d] bg-transparent" /></div>
                <div className="font-medium flex items-center mt-2">Place to see: <input className="outline-none text-slate-800 ml-2 flex-1 border-b border-dashed border-[#e5a98d] bg-transparent" /></div>
              </div>
              <div className="w-1/4 bg-white p-2">
                <textarea className="w-full h-full outline-none resize-none text-slate-800 bg-transparent" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
