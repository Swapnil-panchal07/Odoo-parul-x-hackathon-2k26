import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, Plus, Trash2, Edit3, MapPin, 
  Clock, FileText, LayoutGrid, List
} from 'lucide-react'

// Dummy Data
const initialNotes = [
  { 
    id: 1, 
    title: 'Paris Cafe Recommendations', 
    content: 'Must visit Café de Flore in Saint-Germain-des-Prés for breakfast. Also try the hidden gem Le Peloton near the Marais for great coffee and waffles.', 
    location: 'Paris, France',
    timestamp: '2 hours ago',
    color: 'bg-yellow-100'
  },
  { 
    id: 2, 
    title: 'Train from Paris to London', 
    content: 'Eurostar departs from Gare du Nord at 10:13 AM. Need to arrive at least 45 minutes early for border control. Booking reference: XYZ123.', 
    location: 'General',
    timestamp: '1 day ago',
    color: 'bg-blue-100'
  },
  { 
    id: 3, 
    title: 'London Oyster Card Info', 
    content: 'Can just use contactless credit card for the tube now. Capped at £8.10 per day for zones 1-2. No need to buy a physical Oyster card!', 
    location: 'London, UK',
    timestamp: '2 days ago',
    color: 'bg-emerald-100'
  }
]

const colors = [
  'bg-white', 'bg-yellow-100', 'bg-blue-100', 'bg-emerald-100', 'bg-purple-100', 'bg-pink-100'
]

export default function TripNotes() {
  const { id } = useParams()
  const [notes, setNotes] = useState(initialNotes)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  
  // Form State
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('General')
  const [selectedColor, setSelectedColor] = useState('bg-white')

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openEditor = (note = null) => {
    if (note) {
      setEditingNote(note)
      setTitle(note.title)
      setContent(note.content)
      setLocation(note.location)
      setSelectedColor(note.color)
    } else {
      setEditingNote(null)
      setTitle('')
      setContent('')
      setLocation('General')
      setSelectedColor('bg-white')
    }
    setIsEditorOpen(true)
  }

  const saveNote = () => {
    if (!title.trim() && !content.trim()) return
    
    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? {
        ...n, title, content, location, color: selectedColor, timestamp: 'Just now'
      } : n))
    } else {
      setNotes([{
        id: Date.now(),
        title: title || 'Untitled Note',
        content,
        location,
        color: selectedColor,
        timestamp: 'Just now'
      }, ...notes])
    }
    setIsEditorOpen(false)
  }

  const deleteNote = (noteId) => {
    setNotes(notes.filter(n => n.id !== noteId))
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link to={`/dashboard`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Trip Journal</h1>
            <p className="text-xs font-medium text-slate-500">Euro Summer Tour</p>
          </div>
        </div>
        <button 
          onClick={() => openEditor()}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-5 h-5" /> <span className="hidden md:inline">New Note</span>
        </button>
      </nav>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full relative">
        
        {/* Search & Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow shadow-sm"
            />
          </div>
          <div className="flex bg-slate-200/50 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notes Grid/List */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          <AnimatePresence>
            {filteredNotes.map((note, idx) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => openEditor(note)}
                className={`${note.color} ${note.color === 'bg-white' ? 'border-slate-200' : 'border-transparent'} border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col ${viewMode === 'list' ? 'md:flex-row md:items-center gap-6' : 'h-72'}`}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{note.title}</h3>
                  <p className={`text-slate-700 leading-relaxed ${viewMode === 'grid' ? 'line-clamp-4' : 'line-clamp-2'}`}>
                    {note.content}
                  </p>
                </div>
                <div className={`mt-auto pt-6 flex items-center justify-between ${viewMode === 'list' ? 'md:mt-0 md:pt-0 md:w-64 md:shrink-0 md:flex-col md:items-end md:gap-2' : ''}`}>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin className="w-4 h-4" /> {note.location}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{note.timestamp}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredNotes.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No notes found</h3>
              <p className="text-slate-500">Add a new note to start journaling your trip.</p>
            </div>
          )}
        </div>

      </main>

      {/* Editor Overlay */}
      <AnimatePresence>
        {isEditorOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => saveNote()}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:bottom-auto md:top-24 md:rounded-3xl h-[85vh] md:h-auto md:max-h-[80vh] ${selectedColor} border border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden rounded-t-3xl`}
            >
              <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button 
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${c} ${selectedColor === c ? 'border-slate-400 scale-110' : 'border-transparent'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={saveNote}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Title"
                  className="w-full text-3xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 mb-4 placeholder-slate-400"
                />
                
                <div className="flex items-center gap-4 mb-8 text-sm font-medium text-slate-500 bg-black/5 w-max px-4 py-2 rounded-xl">
                  <MapPin className="w-4 h-4" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent border-none focus:outline-none w-32 placeholder-slate-400"
                    placeholder="Location"
                  />
                </div>
                
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing..."
                  className="w-full h-full min-h-[300px] text-lg text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder-slate-400 leading-relaxed"
                ></textarea>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
