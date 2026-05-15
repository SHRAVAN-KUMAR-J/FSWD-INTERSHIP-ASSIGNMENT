import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, X, CheckCircle2 } from 'lucide-react'
import Alert from '../../components/Alert'
import RolePicker from '../../components/RolePicker'
import OTPInput from '../../components/OTPInput'
import Spinner from '../../components/Spinner'

// ─── Visual panel ─────────────────────────────────────────────────────────────
function VisualPanel() {
  return (
    <div className="hidden md:flex md:w-5/12 flex-col justify-end p-10 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      {/* Decorative rings */}
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full border border-white/10" />
      <div className="absolute -top-8 -right-8 w-56 h-56 rounded-full border border-white/10" />
      <div className="absolute bottom-24 -left-8 w-40 h-40 rounded-full border border-white/10" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-5">
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          TLS Encrypted
        </span>
        <h2 className="font-['Syne'] text-3xl font-extrabold text-white leading-tight mb-3">
          Welcome back to your portal
        </h2>
        <p className="text-blue-100 text-sm leading-relaxed">
          Access your insurance dashboard, claims, and policies — all in one secure place.
        </p>
      </div>
    </div>
  )
}

// ─── Forgot Password Modal ────────────────────────────────────────────────────
function ForgotModal({ onClose }) {
  const [step, setStep]           = useState(1)
  const [email, setEmail]         = useState('')
  const [otp, setOtp]             = useState('')
  const [newPassword, setNewPass] = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')
  const [loading, setLoading]     = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    try {
      if (step === 1) {
        const res  = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        const data = await res.json()
        if (data.success) { setSuccess('OTP sent! Check your inbox/spam.'); setStep(2) }
        else setError(data.message || 'Failed to send OTP')
      } else {
        const res  = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, newPassword }),
        })
        const data = await res.json()
        if (data.success) {
          setSuccess(data.message || 'Password reset successfully!')
          setTimeout(onClose, 2800)
        } else setError(data.message || 'Failed to reset password')
      }
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-modal-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-8 py-7 text-center text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full w-7 h-7 flex items-center justify-center transition">
            <X className="w-4 h-4" />
          </button>
          <Lock className="w-10 h-10 mx-auto mb-3" />
          <h3 className="font-['Syne'] text-xl font-extrabold">Reset Your Password</h3>
          <p className="text-blue-100 text-sm mt-1.5">
            {step === 1 ? "We'll send a 6-digit OTP to your email" : 'Enter OTP and set a new password'}
          </p>
        </div>

        {/* Step dots */}
        <div className="flex items-center px-8 pt-6 gap-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${step >= 1 ? 'bg-blue-600 text-white' : 'border-2 border-gray-200 text-gray-400'}`}>
            {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
          </div>
          <div className={`flex-1 h-0.5 transition-all ${step > 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${step === 2 ? 'bg-blue-600 text-white' : 'border-2 border-gray-200 text-gray-400'}`}>2</div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 pt-5 space-y-4">
          <Alert type="error"   message={error} />
          <Alert type="success" message={success} />

          {/* Email (always visible but locked in step 2) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading || step === 2}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {step === 2 && (
            <div className="animate-slide-down space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">6-digit OTP</label>
                <OTPInput value={otp} onChange={setOtp} disabled={loading} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPass(e.target.value)}
                    placeholder="Min. 6 characters"
                    minLength={6}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <><Spinner size={4} /> Processing...</> : step === 1 ? 'Send OTP' : 'Reset Password'}
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export default function Login() {
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [role, setRole]       = useState('customer')
  const [showPass, setShowP]  = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [forgot, setForgot]   = useState(false)

  const { loginWithPassword, navigateBasedOnRole } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const flashMsg  = location.state?.message || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { role: userRole } = await loginWithPassword(email, password, role)
      navigate(navigateBasedOnRole(userRole))
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to login. Check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        <VisualPanel />

        {/* Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </div>
              <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-1">Insurance Portal</p>
              <h1 className="font-['Syne'] text-2xl font-extrabold text-gray-900">Sign in</h1>
              <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>
            </div>

            {flashMsg && <Alert type="info" message={flashMsg} />}
            <Alert type="error" message={error} />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" required disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition disabled:bg-gray-50" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPass(e.target.value)}
                    placeholder="••••••••" required disabled={loading}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition disabled:bg-gray-50" />
                  <button type="button" onClick={() => setShowP(v => !v)} className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Login as</label>
                <RolePicker value={role} onChange={setRole} disabled={loading} />
              </div>

              <div className="text-right">
                <button type="button" onClick={() => setForgot(true)} className="text-sm text-blue-600 hover:text-blue-800 font-medium underline">
                  Forgot password?
                </button>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <><Spinner size={4} /> Signing in...</> : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              No account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create one →</Link>
            </p>
          </div>
        </div>
      </div>

      {forgot && <ForgotModal onClose={() => setForgot(false)} />}
    </div>
  )
}
