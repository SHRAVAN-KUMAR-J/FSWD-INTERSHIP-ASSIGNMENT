import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth_user')) } catch { return null }
  })

  // ── Login with email + password ──────────────────────────────────────
  const loginWithPassword = useCallback(async (email, password, role) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    })
    const data = await res.json()
    if (!data.success) throw data.message || 'Login failed'
    const userData = { email, role: data.role, token: data.token, name: data.name }
    localStorage.setItem('auth_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }, [])

  // ── Register (sends OTP) ─────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (!data.success) {
      const err = new Error(data.message || 'Registration failed')
      err.response = { data }
      throw err
    }
    return data
  }, [])

  // ── Verify OTP ───────────────────────────────────────────────────────
  const verifyOTP = useCallback(async (email, otp) => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
    const data = await res.json()
    if (!data.success) {
      const err = new Error(data.message || 'OTP verification failed')
      err.response = { data }
      throw err
    }
    return data
  }, [])

  // ── Logout ───────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('auth_user')
    setUser(null)
  }, [])

  // ── Role → route map ─────────────────────────────────────────────────
  const navigateBasedOnRole = useCallback((role) => {
    const map = { admin: '/dashboard', staff: '/dashboard', customer: '/dashboard' }
    return map[role] || '/dashboard'
  }, [])

  return (
    <AuthContext.Provider value={{ user, loginWithPassword, register, verifyOTP, logout, navigateBasedOnRole }}>
      {children}
    </AuthContext.Provider>
  )
}
