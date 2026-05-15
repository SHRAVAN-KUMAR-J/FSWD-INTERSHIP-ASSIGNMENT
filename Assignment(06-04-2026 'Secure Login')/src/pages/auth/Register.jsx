import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import Alert from '../../components/Alert'
import RolePicker from '../../components/RolePicker'
import Spinner from '../../components/Spinner'

// Password strength helper
function getStrength(pwd) {
  let score = 0
  if (pwd.length >= 6)  score++
  if (pwd.length >= 10) score++
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

function StrengthBar({ password }) {
  if (!password) return null
  const score = getStrength(password)
  const labels = ['', 'Weak', 'Fair', 'Strong', 'Very strong']
  const colors  = ['', 'text-red-500', 'text-amber-500', 'text-green-600', 'text-green-600']
  const segClass = (i) => {
    if (i >= score) return 'strength-seg'
    if (score <= 1) return 'strength-seg weak'
    if (score <= 2) return 'strength-seg fair'
    return 'strength-seg strong'
  }
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0,1,2,3].map(i => <div key={i} className={segClass(i)} />)}
      </div>
      <p className={`text-xs mt-1 ${colors[score]}`}>{labels[score]}</p>
    </div>
  )
}

// Visual panel
function VisualPanel() {
  return (
    <div className="hidden md:flex md:w-5/12 flex-col justify-end p-10 relative overflow-hidden bg-gradient-to-br from-green-900 via-green-700 to-emerald-500">
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-white/10" />
      <div className="absolute bottom-32 -left-6 w-44 h-44 rounded-full border border-white/10" />
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-5">
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          OTP Verified Signup
        </span>
        <h2 className="font-['Syne'] text-3xl font-extrabold text-white leading-tight mb-3">
          Join thousands of policyholders
        </h2>
        <p className="text-green-100 text-sm leading-relaxed">
          Create your account in seconds. Email verification keeps your policies safe.
        </p>
      </div>
    </div>
  )
}

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', role: 'customer', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await register(formData)
      navigate('/verify-otp', {
        state: { email: formData.email, purpose: 'register', registrationData: formData },
      })
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to register')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        <VisualPanel />

        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-7">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-1">New Account</p>
              <h1 className="font-['Syne'] text-2xl font-extrabold text-gray-900">Create account</h1>
              <p className="text-sm text-gray-500 mt-1">We'll send an OTP to verify your email</p>
            </div>

            <Alert type="error" message={error} />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Mobile */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input name="name" type="text" value={formData.name} onChange={handleChange}
                      placeholder="Jane Smith" required disabled={loading}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition disabled:bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input name="mobile" type="text" value={formData.mobile} onChange={handleChange}
                      placeholder="+91 99999…" required disabled={loading}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition disabled:bg-gray-50" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input name="email" type="email" value={formData.email} onChange={handleChange}
                    placeholder="you@example.com" required disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition disabled:bg-gray-50" />
                </div>
              </div>

              {/* Password + strength */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input name="password" type={showPass ? 'text' : 'password'} value={formData.password}
                    onChange={handleChange} placeholder="Min. 6 characters" minLength={6} required disabled={loading}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition disabled:bg-gray-50" />
                  <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-green-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <StrengthBar password={formData.password} />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Account type</label>
                <RolePicker value={formData.role} onChange={v => setFormData(p => ({ ...p, role: v }))} disabled={loading} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <><Spinner size={4} /> Sending OTP...</> : 'Create account →'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
