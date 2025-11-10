'use client'

import { FiServer, FiCpu, FiHardDrive, FiAlertCircle } from 'react-icons/fi'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Card from './Card'
import StatCard from './StatCard'

const cpuData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 68 },
  { time: '12:00', value: 73 },
  { time: '16:00', value: 65 },
  { time: '20:00', value: 58 },
]

const memoryData = [
  { time: '00:00', value: 4.2 },
  { time: '04:00', value: 4.5 },
  { time: '08:00', value: 6.8 },
  { time: '12:00', value: 7.2 },
  { time: '16:00', value: 6.5 },
  { time: '20:00', value: 5.8 },
]

const storageData = [
  { name: 'Used', value: 65 },
  { name: 'Available', value: 35 },
]

const COLORS = ['#3f51b5', '#e8eaf6']

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your Kubernetes cluster health and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Clusters"
          value="12"
          icon={FiServer}
          trend="+2"
          trendPositive={true}
        />
        <StatCard
          title="CPU Usage"
          value="68%"
          icon={FiCpu}
          trend="+5%"
          trendPositive={false}
        />
        <StatCard
          title="Memory Usage"
          value="7.2 GB"
          icon={FiHardDrive}
          trend="-0.3 GB"
          trendPositive={true}
        />
        <StatCard
          title="Active Alerts"
          value="3"
          icon={FiAlertCircle}
          trend="-1"
          trendPositive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="CPU Usage (24h)">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3f51b5" fill="#c5cae9" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Memory Usage (24h)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3f51b5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Storage Utilization">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {storageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Deployments">
          <div className="space-y-4">
            {[
              { name: 'web-app-v2.1', status: 'success', time: '2 hours ago' },
              { name: 'api-service-v1.5', status: 'success', time: '5 hours ago' },
              { name: 'database-migration', status: 'running', time: '10 minutes ago' },
              { name: 'monitoring-stack', status: 'failed', time: '1 day ago' },
            ].map((deployment, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{deployment.name}</p>
                  <p className="text-sm text-gray-600">{deployment.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    deployment.status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : deployment.status === 'running'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {deployment.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
