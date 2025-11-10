'use client'

import { useState } from 'react'
import { FiAlertTriangle, FiActivity, FiDatabase } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Card from './Card'

const metricsData = [
  { time: '10:00', cpu: 45, memory: 4200, network: 120 },
  { time: '10:15', cpu: 52, memory: 4500, network: 145 },
  { time: '10:30', cpu: 48, memory: 4300, network: 135 },
  { time: '10:45', cpu: 68, memory: 6800, network: 220 },
  { time: '11:00', cpu: 73, memory: 7200, network: 250 },
  { time: '11:15', cpu: 65, memory: 6500, network: 210 },
]

interface Alert {
  id: string
  severity: 'critical' | 'warning' | 'info'
  message: string
  time: string
  source: string
}

export default function Monitoring() {
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'critical',
      message: 'High CPU usage detected on node-3',
      time: '5 minutes ago',
      source: 'Prometheus',
    },
    {
      id: '2',
      severity: 'warning',
      message: 'Memory usage approaching threshold',
      time: '15 minutes ago',
      source: 'Prometheus',
    },
    {
      id: '3',
      severity: 'info',
      message: 'New deployment completed successfully',
      time: '1 hour ago',
      source: 'CI/CD',
    },
  ])

  const [logs] = useState([
    { timestamp: '2024-01-10 11:25:43', level: 'INFO', message: 'Pod web-app-abc123 started successfully' },
    { timestamp: '2024-01-10 11:25:30', level: 'WARN', message: 'Database connection pool nearing capacity' },
    { timestamp: '2024-01-10 11:25:12', level: 'ERROR', message: 'Failed to pull image: timeout exceeded' },
    { timestamp: '2024-01-10 11:24:55', level: 'INFO', message: 'Service api-gateway scaled to 5 replicas' },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Monitoring & Logging</h2>
        <p className="text-gray-600">Real-time metrics and system logs</p>
      </div>

      <Card title="Active Alerts">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'critical'
                  ? 'bg-red-50 border-red-500'
                  : alert.severity === 'warning'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <FiAlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.severity === 'critical'
                        ? 'text-red-600'
                        : alert.severity === 'warning'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.source} • {alert.time}
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 rounded">
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="System Metrics (Real-time)">
        <div className="mb-4 flex space-x-4">
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-primary-500">
            Last Hour
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500">
            Last 24 Hours
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500">
            Last 7 Days
          </button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#3f51b5" name="CPU %" strokeWidth={2} />
            <Line type="monotone" dataKey="memory" stroke="#00bcd4" name="Memory (MB)" strokeWidth={2} />
            <Line type="monotone" dataKey="network" stroke="#4caf50" name="Network (Mbps)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <FiActivity className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold">Prometheus</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Metrics collection and alerting</p>
          <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors focus:ring-2 focus:ring-primary-500">
            View Dashboard
          </button>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <FiDatabase className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold">Elasticsearch</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Log aggregation and search</p>
          <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors focus:ring-2 focus:ring-primary-500">
            View Logs
          </button>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <FiActivity className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold">Grafana</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Visualization and analytics</p>
          <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors focus:ring-2 focus:ring-primary-500">
            Open Grafana
          </button>
        </Card>
      </div>

      <Card title="Recent Logs">
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="mb-2">
              <span className="text-gray-400">{log.timestamp}</span>{' '}
              <span
                className={
                  log.level === 'ERROR'
                    ? 'text-red-400'
                    : log.level === 'WARN'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }
              >
                [{log.level}]
              </span>{' '}
              <span className="text-gray-200">{log.message}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
