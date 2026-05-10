import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Compass, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Link, useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()
  const [view, setView] = useState('login') // login, signup, forgot
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMsg(null)

    try {
      if (view === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        })
        if (signUpError) throw signUpError

        if (data?.session) {
          localStorage.setItem('userRole', 'user')
          navigate('/dashboard')
        } else {
          setMsg('Account created! Please check your email to confirm.')
        }
      }
      else if (view === 'login') {
        // Intercept Admin Login
        if (email === 'Admin' && password === 'Admin') {
          localStorage.setItem('userRole', 'admin')
          navigate('/dashboard')
          return
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError

        localStorage.setItem('userRole', 'user')
        navigate('/dashboard')
      }
      else if (view === 'forgot') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)
        if (resetError) throw resetError
        setMsg('Password reset instructions sent to your email.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-6">
      {/* Background Ornaments */}
      <div className="absolute top-[-15%] right-[-5%] w-[50%] h-[50%] bg-accent-300/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-300/40 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-600/30">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-bold text-slate-900 tracking-tight">Traveloop</span>
        </Link>

        <div className="bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-3xl p-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {view === 'login' && 'Welcome back'}
                {view === 'signup' && 'Start your journey'}
                {view === 'forgot' && 'Reset password'}
              </h2>
              <p className="text-slate-500 mb-6">
                {view === 'login' && 'Enter your details to access your trips.'}
                {view === 'signup' && 'Create an account to plan your next adventure.'}
                {view === 'forgot' && 'Enter your email to receive reset instructions.'}
              </p>

              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}
              {msg && (
                <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-medium border border-green-100">
                  {msg}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {view === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-2xl leading-5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email or Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-2xl leading-5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm"
                      placeholder="you@example.com or Admin"
                    />
                  </div>
                </div>

                {view !== 'forgot' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      {view === 'login' && (
                        <button type="button" onClick={() => setView('forgot')} className="text-sm font-medium text-primary-600 hover:text-primary-500">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-2xl leading-5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-2xl shadow-lg shadow-primary-600/20 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      {view === 'login' && 'Sign in'}
                      {view === 'signup' && 'Create account'}
                      {view === 'forgot' && 'Send instructions'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {view === 'login' && (
                  <p>Don't have an account? <button onClick={() => setView('signup')} className="font-medium text-primary-600 hover:text-primary-500">Sign up</button></p>
                )}
                {view === 'signup' && (
                  <p>Already have an account? <button onClick={() => setView('login')} className="font-medium text-primary-600 hover:text-primary-500">Log in</button></p>
                )}
                {view === 'forgot' && (
                  <p>Remember your password? <button onClick={() => setView('login')} className="font-medium text-primary-600 hover:text-primary-500">Back to login</button></p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
