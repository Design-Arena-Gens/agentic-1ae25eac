import { IconType } from 'react-icons'

interface StatCardProps {
  title: string
  value: string
  icon: IconType
  trend?: string
  trendPositive?: boolean
}

export default function StatCard({ title, value, icon: Icon, trend, trendPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary-100 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trendPositive ? 'text-green-600' : 'text-red-600'
            }`}
            aria-label={`Trend: ${trend}`}
          >
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
