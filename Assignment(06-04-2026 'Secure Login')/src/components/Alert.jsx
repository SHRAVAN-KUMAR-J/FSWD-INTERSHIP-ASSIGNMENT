import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

const config = {
  error:   { bg: 'bg-red-50 border-red-200 text-red-700',   Icon: AlertCircle },
  success: { bg: 'bg-green-50 border-green-200 text-green-700', Icon: CheckCircle2 },
  info:    { bg: 'bg-blue-50 border-blue-200 text-blue-700', Icon: Info },
}

export default function Alert({ type = 'error', message }) {
  if (!message) return null
  const { bg, Icon } = config[type] || config.error
  return (
    <div className={`${bg} border px-4 py-3 rounded-lg mb-5 flex items-center gap-2.5 animate-fade-in text-sm`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}
