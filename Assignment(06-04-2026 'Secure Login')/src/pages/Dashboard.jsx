import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { LogOut, ShieldCheck, User, Bell } from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const roleColors = {
    admin:    'bg-red-100 text-red-700',
    staff:    'bg-amber-100 text-amber-700',
    customer: 'bg-green-100 text-green-700',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <span className="font-['Syne'] font-extrabold text-gray-900 text-lg">SecureAuth Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition font-medium">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-['Syne'] text-3xl font-extrabold text-gray-900">
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-gray-500 text-sm">You're logged in as</p>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${roleColors[user?.role] || 'bg-gray-100 text-gray-600'}`}>
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Active Policies', value: '3', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Claims', value: '1', color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Renewals Due', value: '2', color: 'text-green-600', bg: 'bg-green-50' },
          ].map(card => (
            <div key={card.label} className={`${card.bg} rounded-2xl p-6`}>
              <p className="text-sm text-gray-500 mb-1">{card.label}</p>
              <p className={`font-['Syne'] text-4xl font-extrabold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            🎉 Your auth portal is fully wired. Connect your backend API at <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">/api/auth/*</code> to go live.
          </p>
        </div>
      </main>
    </div>
  )
}
