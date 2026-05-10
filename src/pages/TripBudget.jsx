import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { 
  ArrowLeft, Wallet, TrendingUp, AlertCircle, 
  Plus, DollarSign, Plane, Home, Coffee, Camera, MoreHorizontal 
} from 'lucide-react'

// Dummy Data
const budgetCategories = [
  { name: 'Transport', value: 800, color: '#3b82f6', icon: <Plane className="w-4 h-4" /> },
  { name: 'Stay', value: 1200, color: '#8b5cf6', icon: <Home className="w-4 h-4" /> },
  { name: 'Meals', value: 500, color: '#f59e0b', icon: <Coffee className="w-4 h-4" /> },
  { name: 'Activities', value: 300, color: '#10b981', icon: <Camera className="w-4 h-4" /> },
  { name: 'Misc', value: 100, color: '#64748b', icon: <MoreHorizontal className="w-4 h-4" /> },
]

const dailyExpenses = [
  { day: 'Day 1', amount: 150 },
  { day: 'Day 2', amount: 320 },
  { day: 'Day 3', amount: 180 },
  { day: 'Day 4', amount: 90 },
  { day: 'Day 5', amount: 210 },
  { day: 'Day 6', amount: 450 },
  { day: 'Day 7', amount: 120 },
]

const recentExpensesList = [
  { id: 1, title: 'Flight to Paris', category: 'Transport', amount: 450, date: 'Jun 15' },
  { id: 2, title: 'Louvre Tickets', category: 'Activities', amount: 45, date: 'Jun 16' },
  { id: 3, title: 'Dinner at Le Jules Verne', category: 'Meals', amount: 180, date: 'Jun 16' },
  { id: 4, title: 'Hotel Grand', category: 'Stay', amount: 300, date: 'Jun 17' },
]

export default function TripBudget() {
  const { id } = useParams()
  const totalBudget = 4000
  const totalSpent = budgetCategories.reduce((acc, curr) => acc + curr.value, 0)
  const remaining = totalBudget - totalSpent
  const spentPercentage = (totalSpent / totalBudget) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link to={`/trip-builder/${id || '1'}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Euro Summer Tour</h1>
            <p className="text-xs font-medium text-slate-500">Budget Tracker</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" /> <span className="hidden md:inline">Add Expense</span>
        </button>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 flex flex-col gap-8">
        
        {/* Header Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm col-span-1 md:col-span-2 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-slate-500 font-medium flex items-center gap-2 mb-1">
                  <Wallet className="w-5 h-5 text-primary-500" /> Total Balance
                </h2>
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900">${remaining.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-500">Total Budget</div>
                <div className="text-xl font-bold text-slate-700">${totalBudget.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Spent: ${totalSpent.toLocaleString()}</span>
                <span className={`${spentPercentage > 90 ? 'text-red-500' : 'text-slate-500'}`}>{spentPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${spentPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 75 ? 'bg-yellow-500' : 'bg-primary-500'}`}
                ></motion.div>
              </div>
            </div>

            {spentPercentage > 75 && (
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-yellow-600 bg-yellow-50 px-4 py-3 rounded-xl border border-yellow-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                You are approaching your budget limit. Review your planned activities.
              </div>
            )}
          </motion.div>

          {/* Average Daily */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-center"
          >
            <div className="w-12 h-12 bg-accent-50 rounded-2xl flex items-center justify-center text-accent-600 mb-4 border border-accent-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-slate-500 font-medium mb-1">Avg. Daily Spend</h3>
            <div className="text-3xl font-bold text-slate-900 mb-2">${Math.round(totalSpent / 7)}</div>
            <p className="text-sm text-slate-500">Based on 7 days of travel</p>
          </motion.div>
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Breakdown Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Expense Breakdown</h3>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                {budgetCategories.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: cat.color }}>
                        {cat.icon}
                      </div>
                      <span className="font-medium text-slate-700">{cat.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">${cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Daily Spend Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Spending</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => `$${value}`} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Expenses List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">View all</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentExpensesList.map((expense) => {
              const cat = budgetCategories.find(c => c.name === expense.category)
              return (
                <div key={expense.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: cat?.color || '#cbd5e1' }}>
                      {cat?.icon || <DollarSign className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{expense.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-slate-500">{expense.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-xs font-medium text-slate-500">{expense.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    ${expense.amount}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

      </main>
    </div>
  )
}
