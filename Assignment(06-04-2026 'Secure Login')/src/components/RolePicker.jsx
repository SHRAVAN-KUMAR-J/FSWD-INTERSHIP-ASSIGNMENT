const ROLES = [
  { value: 'customer', label: 'Customer', icon: '👤' },
  { value: 'staff',    label: 'Staff',    icon: '🧑‍💼' },
  { value: 'admin',    label: 'Admin',    icon: '🔑' },
]

export default function RolePicker({ value, onChange, disabled = false }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-1.5">
      {ROLES.map(r => (
        <button
          key={r.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(r.value)}
          className={`
            border rounded-lg py-2.5 px-1 text-center text-xs font-medium transition-all
            ${value === r.value
              ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
              : 'border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <span className="block text-lg mb-1">{r.icon}</span>
          {r.label}
        </button>
      ))}
    </div>
  )
}
