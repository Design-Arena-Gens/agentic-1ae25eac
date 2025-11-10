'use client'

import { useState } from 'react'
import { FiPackage, FiDownload, FiTrash2, FiTag } from 'react-icons/fi'
import Card from './Card'
import Button from './Button'

interface Image {
  id: string
  name: string
  tag: string
  size: string
  pushed: string
  pulls: number
  digest: string
}

export default function ContainerRegistry() {
  const [images] = useState<Image[]>([
    {
      id: '1',
      name: 'web-app',
      tag: 'v2.1.0',
      size: '245 MB',
      pushed: '2 hours ago',
      pulls: 1523,
      digest: 'sha256:abc123...',
    },
    {
      id: '2',
      name: 'web-app',
      tag: 'v2.0.5',
      size: '243 MB',
      pushed: '1 day ago',
      pulls: 8456,
      digest: 'sha256:def456...',
    },
    {
      id: '3',
      name: 'api-service',
      tag: 'v1.5.2',
      size: '178 MB',
      pushed: '3 hours ago',
      pulls: 945,
      digest: 'sha256:ghi789...',
    },
    {
      id: '4',
      name: 'database-migration',
      tag: 'latest',
      size: '92 MB',
      pushed: '5 days ago',
      pulls: 234,
      digest: 'sha256:jkl012...',
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Container Registry</h2>
        <p className="text-gray-600">Manage Docker images and container repositories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <FiPackage className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold">Total Images</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-600 mt-1">Across 8 repositories</p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <FiDownload className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold">Total Pulls</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">45.2K</p>
          <p className="text-sm text-gray-600 mt-1">Last 30 days</p>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-3">
            <FiTag className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold">Storage Used</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">12.4 GB</p>
          <p className="text-sm text-gray-600 mt-1">Of 100 GB available</p>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Container Images</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search images..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button>Push Image</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Image</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tag</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Size</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pushed</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pulls</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <FiPackage className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{image.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-mono">
                      {image.tag}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{image.size}</td>
                  <td className="py-4 px-4 text-gray-600 text-sm">{image.pushed}</td>
                  <td className="py-4 px-4 text-gray-700">{image.pulls.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 hover:bg-primary-100 rounded transition-colors focus:ring-2 focus:ring-primary-500"
                        aria-label={`Pull ${image.name}:${image.tag}`}
                      >
                        <FiDownload className="w-4 h-4 text-primary-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-100 rounded transition-colors focus:ring-2 focus:ring-red-500"
                        aria-label={`Delete ${image.name}:${image.tag}`}
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Registry Configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registry URL
            </label>
            <input
              type="text"
              value="registry.example.com"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authentication
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
              <option>Basic Auth</option>
              <option>Token-based</option>
              <option>OAuth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Retention Policy
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
              <option>Keep last 10 versions</option>
              <option>Keep for 90 days</option>
              <option>Keep all versions</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vulnerability Scanning
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="vuln-scan"
                defaultChecked
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
              />
              <label htmlFor="vuln-scan" className="text-gray-700">
                Enable automatic scanning
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button>Save Configuration</Button>
        </div>
      </Card>
    </div>
  )
}
