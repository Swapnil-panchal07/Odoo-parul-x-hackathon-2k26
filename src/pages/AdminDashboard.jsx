import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts'
import { 
  LayoutDashboard, Users, Map, Activity, 
  ArrowLeft, Search, MoreVertical, ShieldAlert,
  Ban, CheckCircle, Eye
} from 'lucide-react'

// Mock Data
const kpiData = [
  { title: 'Total Trips', value: '1,284', trend: '+12%', icon: <Map className="w-6 h-6" />, color: 'text-primary-600', bg: 'bg-primary-50' },
  { title: 'Total Users', value: '8,439', trend: '+5%', icon: <Users className="w-6 h-6" />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Active Sessions', value: '342', trend: '-2%', icon: <Activity className="w-6 h-6" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

const tripsOverTime = [
  { date: 'May 1', trips: 12 }, { date: 'May 5', trips: 19 },
  { date: 'May 10', trips: 25 }, { date: 'May 15', trips: 22 },
  { date: 'May 20', trips: 35 }, { date: 'May 25', trips: 41 },
  { date: 'May 30', trips: 38 },
]

const topCities = [
  { name: 'Paris', count: 450 },
  { name: 'London', count: 380 },
  { name: 'Rome', count: 320 },
  { name: 'Tokyo', count: 290 },
  { name: 'New York', count: 250 },
]

const usersList = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', joined: '2026-01-15', status: 'Active' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', joined: '2026-02-20', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', joined: '2026-03-05', status: 'Suspended' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', joined: '2026-04-12', status: 'Active' },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', joined: '2026-05-01', status: 'Active' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [users, setUsers] = useState(usersList)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') {
      navigate('/dashboard', { state: { error: 'Access Denied' } })
    }
  }, [navigate])

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
      }
      return u
    }))
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Admin Console</h1>
              <p className="text-xs font-medium text-slate-400">System Overview</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 flex flex-col gap-8">
        
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center gap-6"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{kpi.title}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-bold text-slate-900 leading-none">{kpi.value}</h3>
                  <span className={`text-sm font-bold mb-0.5 ${kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {kpi.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Trips Created (Last 30 Days)</h3>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tripsOverTime} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="trips" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Top Added Cities</h3>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCities} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Users Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900">User Management</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow text-sm"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                    <td className="px-6 py-4 text-slate-500">{user.email}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{user.joined}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-flex" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className={`p-2 rounded-lg transition-colors inline-flex ${
                          user.status === 'Active' 
                            ? 'text-slate-400 hover:text-red-600 hover:bg-red-50' 
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                        }`} 
                        title={user.status === 'Active' ? 'Suspend User' : 'Restore User'}
                      >
                        {user.status === 'Active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      No users found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </main>
    </div>
  )
}
