import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, User, Mail, Globe, Lock, 
  Heart, Trash2, Camera, Shield, Save, CheckCircle
} from 'lucide-react'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('general')
  const [message, setMessage] = useState('')
  
  const [settings, setSettings] = useState({
    name: 'Alex Traveler',
    email: 'alex@traveloop.app',
    language: 'English (US)',
    currency: 'USD ($)',
    twoFactor: false
  })

  useEffect(() => {
    const saved = localStorage.getItem('userSettings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = (e, customMsg) => {
    e.preventDefault()
    localStorage.setItem('userSettings', JSON.stringify(settings))
    setMessage(customMsg || 'Settings saved successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSecuritySave = (e) => {
    e.preventDefault()
    localStorage.setItem('userSettings', JSON.stringify(settings))
    setMessage('Security settings updated securely.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xl font-bold text-slate-900">Settings</span>
        </div>
      </nav>

      {/* Toast Message */}
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-2xl shadow-lg border border-green-200 flex items-center gap-3 z-50 font-medium"
          >
            <CheckCircle className="w-5 h-5" /> {message}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-10 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col gap-1 sticky top-24">
            <button 
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors ${activeTab === 'general' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <User className="w-5 h-5" /> General
            </button>
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors ${activeTab === 'preferences' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Globe className="w-5 h-5" /> Preferences
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors ${activeTab === 'security' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Shield className="w-5 h-5" /> Security
            </button>
            <div className="h-px bg-slate-100 my-2 mx-4"></div>
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-red-600 hover:bg-red-50 transition-colors w-full">
              <Trash2 className="w-5 h-5" /> Delete Account
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">General Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{settings.name || 'Your Name'}</h3>
                  <p className="text-slate-500 text-sm">Update your photo and personal details.</p>
                </div>
              </div>

              <form className="space-y-6 max-w-lg" onSubmit={handleSave}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      name="name"
                      value={settings.name} 
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      name="email"
                      value={settings.email} 
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" 
                    />
                  </div>
                </div>
                
                <button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-colors shadow-sm">
                  <Save className="w-5 h-5" /> Save Changes
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">App Preferences</h2>
              
              <form className="space-y-6 max-w-lg" onSubmit={(e) => handleSave(e, 'Preferences saved!')}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                  <select 
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                  >
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                  <select 
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>

                <button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-colors shadow-sm">
                  <Save className="w-5 h-5" /> Save Preferences
                </button>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" /> Saved Destinations
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-24 rounded-2xl overflow-hidden group cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=400&auto=format&fit=crop" alt="Banff" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-end">
                        <span className="text-white font-bold text-sm">Banff, CA</span>
                      </div>
                    </div>
                    <div className="relative h-24 rounded-2xl overflow-hidden group cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=400&auto=format&fit=crop" alt="Santorini" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-end">
                        <span className="text-white font-bold text-sm">Santorini, GR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Security & Password</h2>
              
              <form className="space-y-6 max-w-lg" onSubmit={handleSecuritySave}>
                
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
                  <div>
                    <h4 className="font-bold text-slate-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500">Add an extra layer of security.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="twoFactor"
                      checked={settings.twoFactor} 
                      onChange={handleChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all" />
                  </div>
                </div>
                
                <button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-colors shadow-sm">
                  <Save className="w-5 h-5" /> Update Security
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
