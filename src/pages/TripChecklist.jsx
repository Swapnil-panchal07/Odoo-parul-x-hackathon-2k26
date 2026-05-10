import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, CheckSquare, Plus, Trash2, 
  Shirt, FileText, Smartphone, Briefcase, HeartPulse
} from 'lucide-react'

const categories = [
  { id: 'clothing', name: 'Clothing', icon: <Shirt className="w-5 h-5" />, color: 'bg-blue-100 text-blue-700' },
  { id: 'documents', name: 'Documents', icon: <FileText className="w-5 h-5" />, color: 'bg-purple-100 text-purple-700' },
  { id: 'electronics', name: 'Electronics', icon: <Smartphone className="w-5 h-5" />, color: 'bg-slate-100 text-slate-700' },
  { id: 'essentials', name: 'Essentials', icon: <Briefcase className="w-5 h-5" />, color: 'bg-amber-100 text-amber-700' },
  { id: 'health', name: 'Health', icon: <HeartPulse className="w-5 h-5" />, color: 'bg-red-100 text-red-700' }
]

const initialItems = [
  { id: 1, text: 'Passport & Visa', category: 'documents', packed: true },
  { id: 2, text: 'Flight Tickets', category: 'documents', packed: false },
  { id: 3, text: 'T-shirts (x5)', category: 'clothing', packed: false },
  { id: 4, text: 'Jeans (x2)', category: 'clothing', packed: false },
  { id: 5, text: 'Universal Adapter', category: 'electronics', packed: true },
  { id: 6, text: 'Power Bank', category: 'electronics', packed: false },
  { id: 7, text: 'Toothbrush & Paste', category: 'essentials', packed: false },
  { id: 8, text: 'First Aid Kit', category: 'health', packed: false },
]

export default function TripChecklist() {
  const { id } = useParams()
  const [items, setItems] = useState(initialItems)
  const [newItemText, setNewItemText] = useState('')
  const [selectedCat, setSelectedCat] = useState('clothing')

  const toggleItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    ))
  }

  const addItem = (e) => {
    e.preventDefault()
    if (!newItemText.trim()) return
    const newItem = {
      id: Date.now(),
      text: newItemText,
      category: selectedCat,
      packed: false
    }
    setItems([...items, newItem])
    setNewItemText('')
  }

  const deleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId))
  }

  const resetChecklist = () => {
    setItems(items.map(item => ({ ...item, packed: false })))
  }

  const packedCount = items.filter(i => i.packed).length
  const progress = items.length === 0 ? 0 : (packedCount / items.length) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link to={`/dashboard`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Packing List</h1>
            <p className="text-xs font-medium text-slate-500">Euro Summer Tour</p>
          </div>
        </div>
        <button onClick={resetChecklist} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Reset All
        </button>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10">
        
        {/* Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary-500" /> Packing Progress
            </h2>
            <span className="font-bold text-slate-700">{packedCount} of {items.length} packed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-primary-500 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Add Item Form */}
        <form onSubmit={addItem} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-10 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add a new item..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
          />
          <div className="flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`p-3 rounded-2xl flex items-center justify-center transition-colors border ${
                  selectedCat === cat.id ? 'border-primary-500 bg-primary-50 text-primary-600 shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
                title={cat.name}
              >
                {cat.icon}
              </button>
            ))}
          </div>
          <button 
            type="submit"
            disabled={!newItemText.trim()}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            Add
          </button>
        </form>

        {/* Categories List */}
        <div className="space-y-8">
          {categories.map(category => {
            const catItems = items.filter(i => i.category === category.id)
            if (catItems.length === 0) return null

            return (
              <div key={category.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{category.name}</h3>
                  <span className="ml-auto text-sm font-medium text-slate-500">
                    {catItems.filter(i => i.packed).length}/{catItems.length}
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {catItems.map(item => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
                      >
                        <label className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                            item.packed ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-300'
                          }`}>
                            {item.packed && <CheckSquare className="w-4 h-4" />}
                          </div>
                          <span className={`text-lg transition-all ${item.packed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                            {item.text}
                          </span>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={item.packed}
                            onChange={() => toggleItem(item.id)}
                          />
                        </label>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
