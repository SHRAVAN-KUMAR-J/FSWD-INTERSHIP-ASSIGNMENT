import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { RotateCcw, ShieldCheck } from 'lucide-react'
import Alert from '../../components/Alert'
import OTPInput from '../../components/OTPInput'
import Spinner from '../../components/Spinner'

// Countdown timer hook
function useCountdown(initial = 599) {
  const [seconds, setSeconds] = useState(initial)
  const intervalRef = useRef(null)

  const start = () => {
    clearInterval(intervalRef.current)
    setSeconds(initial)
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(intervalRef.current); return 0 }
        return s - 1
      })
    }, 1000)
  }

  useEffect(() => { start(); return () => clearInterval(intervalRef.current) }, [])

  const fmt = () => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  return { seconds, fmt, restart: start }
}

// Visual panel
function VisualPanel() {
  return (
    <div className="hidden md:flex md:w-5/12 flex-col justify-end p-10 relative overflow-hidden bg-gradient-to-br from-violet-900 via-violet-700 to-purple-500">
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-white/10" />
      <div className="absolute -top-4 -right-4 w-44 h-44 rounded-full border border-white/10" />
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-5">
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Expires in 10 minutes
        </span>
        <h2 className="font-['Syne'] text-3xl font-extrabold text-white leading-tight mb-3">
          One last step to verify you
        </h2>
        <p className="text-purple-100 text-sm leading-relaxed">
          A 6-digit code was sent to your email. Check your inbox and spam folder.
        </p>
      </div>
    </div>
  )
}

export default function OTPVerify() {
  const [otp, setOtp]           = useState('')
  const [error, setError]       = useState('')
  const [resendMsg, setResend]  = useState('')
  const [verifying, setVerify]  = useState(false)
  const [resending, setResend2] = useState(false)

  const { verifyOTP, register }   = useAuth()
  const location                  = useLocation()
  const navigate                  = useNavigate()
  const { seconds, fmt, restart } = useCountdown(599)

  const { email, purpose, registrationData } = location.state || {}

  // Guard
  useEffect(() => {
    if (!email || !registrationData || purpose !== 'register') navigate('/register', { replace: true })
  }, [])

  const handleVerify = async (e) => {
    e.preventDefault()
    if (otp.replace(/\s/g,'').length < 6) { setError('Please enter the complete 6-digit code.'); return }
    setError(''); setResend(''); setVerify(true)
    try {
      await verifyOTP(email, otp)
      navigate('/login', { replace: true, state: { message: '✓ Account verified! Please sign in.' } })
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid or expired OTP'
      setError(msg)
    } finally {
      setVerify(false)
    }
  }

  const handleResend = async () => {
    if (!registrationData) { setError('Missing data. Please register again.'); return }
    setError(''); setResend(''); setResend2(true)
    try {
      await register(registrationData)
      setResend('A new OTP has been sent to your email.')
      setOtp('')
      restart()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResend2(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        <VisualPanel />

        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-purple-600 tracking-widest uppercase mb-1">Email Verification</p>
              <h1 className="font-['Syne'] text-2xl font-extrabold text-gray-900">Enter OTP</h1>
              <p className="text-sm text-gray-500 mt-1">Code sent to</p>
              {email && (
                <span className="inline-block mt-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{email}</span>
              )}
            </div>

            <Alert type="error"   message={error} />
            <Alert type="success" message={resendMsg} />

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">6-digit verification code</label>
                <OTPInput value={otp} onChange={setOtp} disabled={verifying} />
              </div>

              {/* Timer */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {seconds > 0
                    ? <>Expires in <span className="font-semibold text-purple-600">{fmt()}</span></>
                    : <span className="text-red-500 font-medium">OTP expired</span>}
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-800 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                  {resending ? 'Sending…' : 'Resend OTP'}
                </button>
              </div>

              <button
                type="submit"
                disabled={verifying || otp.replace(/\D/g,'').length < 6}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {verifying ? <><Spinner size={4} /> Verifying…</> : 'Verify & Continue'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Didn't get the code? Check spam or{' '}
              <button onClick={handleResend} className="text-purple-600 font-medium hover:underline">resend</button>.
            </p>

            <p className="text-center mt-3">
              <button onClick={() => navigate('/register')} className="text-sm text-gray-400 hover:text-gray-600 underline">
                ← Back to register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
