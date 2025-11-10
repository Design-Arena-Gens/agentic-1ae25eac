'use client'

import { useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiArrowUp } from 'react-icons/fi'
import Card from './Card'
import Modal from './Modal'
import Button from './Button'

interface Cluster {
  id: string
  name: string
  version: string
  nodes: number
  status: 'healthy' | 'warning' | 'critical'
  region: string
}

export default function ClusterManagement() {
  const [clusters, setClusters] = useState<Cluster[]>([
    { id: '1', name: 'prod-cluster-1', version: 'v1.28.0', nodes: 5, status: 'healthy', region: 'us-east-1' },
    { id: '2', name: 'dev-cluster-1', version: 'v1.27.3', nodes: 3, status: 'healthy', region: 'us-west-2' },
    { id: '3', name: 'staging-cluster', version: 'v1.28.0', nodes: 4, status: 'warning', region: 'eu-west-1' },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)

  const handleDeleteCluster = () => {
    if (selectedCluster) {
      setClusters(clusters.filter(c => c.id !== selectedCluster))
      setShowDeleteModal(false)
      setSelectedCluster(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Cluster Management</h2>
          <p className="text-gray-600">Manage your Kubernetes clusters</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={FiPlus}>
          Add Cluster
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {clusters.map((cluster) => (
          <Card key={cluster.id} className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{cluster.name}</h3>
                <p className="text-sm text-gray-600">{cluster.region}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cluster.status === 'healthy'
                    ? 'bg-green-100 text-green-800'
                    : cluster.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {cluster.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium text-gray-900">{cluster.version}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nodes:</span>
                <span className="font-medium text-gray-900">{cluster.nodes}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-primary-500"
                aria-label={`Scale ${cluster.name}`}
              >
                <FiArrowUp className="w-4 h-4" />
                <span>Scale</span>
              </button>
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-500"
                aria-label={`Edit ${cluster.name}`}
              >
                <FiEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedCluster(cluster.id)
                  setShowDeleteModal(true)
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors focus:ring-2 focus:ring-red-500"
                aria-label={`Delete ${cluster.name}`}
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {showAddModal && (
        <Modal
          title="Add New Cluster"
          onClose={() => setShowAddModal(false)}
          onConfirm={() => setShowAddModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="cluster-name" className="block text-sm font-medium text-gray-700 mb-1">
                Cluster Name
              </label>
              <input
                type="text"
                id="cluster-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="my-cluster"
              />
            </div>
            <div>
              <label htmlFor="k8s-version" className="block text-sm font-medium text-gray-700 mb-1">
                Kubernetes Version
              </label>
              <select
                id="k8s-version"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option>v1.28.0</option>
                <option>v1.27.3</option>
                <option>v1.26.6</option>
              </select>
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                id="region"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option>us-east-1</option>
                <option>us-west-2</option>
                <option>eu-west-1</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal
          title="Delete Cluster"
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedCluster(null)
          }}
          onConfirm={handleDeleteCluster}
          confirmText="Delete"
          confirmVariant="danger"
        >
          <p className="text-gray-700">
            Are you sure you want to delete this cluster? This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  )
}
