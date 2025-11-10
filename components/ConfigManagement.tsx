'use client'

import { useState } from 'react'
import { FiGitBranch, FiFile, FiFolder, FiCheck, FiX } from 'react-icons/fi'
import Card from './Card'
import Button from './Button'

interface Config {
  id: string
  name: string
  type: 'deployment' | 'service' | 'configmap' | 'secret'
  cluster: string
  namespace: string
  synced: boolean
  lastSync: string
}

export default function ConfigManagement() {
  const [configs] = useState<Config[]>([
    {
      id: '1',
      name: 'web-app-deployment',
      type: 'deployment',
      cluster: 'prod-cluster-1',
      namespace: 'production',
      synced: true,
      lastSync: '5 minutes ago',
    },
    {
      id: '2',
      name: 'api-service',
      type: 'service',
      cluster: 'prod-cluster-1',
      namespace: 'production',
      synced: true,
      lastSync: '10 minutes ago',
    },
    {
      id: '3',
      name: 'app-config',
      type: 'configmap',
      cluster: 'dev-cluster-1',
      namespace: 'development',
      synced: false,
      lastSync: '2 hours ago',
    },
    {
      id: '4',
      name: 'database-secret',
      type: 'secret',
      cluster: 'prod-cluster-1',
      namespace: 'production',
      synced: true,
      lastSync: '1 hour ago',
    },
  ])

  const [selectedConfig, setSelectedConfig] = useState<string | null>(null)

  const manifestExample = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:v2.1
        ports:
        - containerPort: 8080`

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deployment':
        return 'bg-blue-100 text-blue-800'
      case 'service':
        return 'bg-green-100 text-green-800'
      case 'configmap':
        return 'bg-yellow-100 text-yellow-800'
      case 'secret':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configuration Management</h2>
        <p className="text-gray-600">GitOps-based Kubernetes manifest management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <FiGitBranch className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900">GitOps Status</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Repository</span>
                <FiCheck className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">github.com/org/k8s-configs</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Branch</span>
                <FiCheck className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">main</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Last Sync</span>
                <FiCheck className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">5 minutes ago</p>
            </div>
          </div>
          <Button className="w-full mt-4">Sync Now</Button>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Managed Resources</h3>
          <div className="space-y-3">
            {configs.map((config) => (
              <div
                key={config.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedConfig === config.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
                onClick={() => setSelectedConfig(config.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FiFile className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{config.name}</p>
                      <p className="text-xs text-gray-600">
                        {config.cluster} / {config.namespace}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(config.type)}`}>
                      {config.type}
                    </span>
                    {config.synced ? (
                      <FiCheck className="w-5 h-5 text-green-600" aria-label="Synced" />
                    ) : (
                      <FiX className="w-5 h-5 text-red-600" aria-label="Out of sync" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">Last synced: {config.lastSync}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {selectedConfig && (
        <Card title="Manifest Editor">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500">
                View
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500">
                Edit
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500">
                History
              </button>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary">Validate</Button>
              <Button>Apply Changes</Button>
            </div>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            {manifestExample}
          </pre>
        </Card>
      )}

      <Card title="Recent Changes">
        <div className="space-y-3">
          {[
            { file: 'web-app-deployment.yaml', author: 'John Doe', action: 'Updated replicas', time: '10 minutes ago' },
            { file: 'api-service.yaml', author: 'Jane Smith', action: 'Changed port configuration', time: '1 hour ago' },
            { file: 'app-config.yaml', author: 'Bob Johnson', action: 'Added new environment variable', time: '3 hours ago' },
          ].map((change, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FiFolder className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">{change.file}</p>
                  <p className="text-sm text-gray-600">
                    {change.author} • {change.action}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{change.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
