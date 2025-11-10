'use client'

import { useState } from 'react'
import { FiGitBranch, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi'
import Card from './Card'
import Button from './Button'

interface Pipeline {
  id: string
  name: string
  stages: string[]
  status: 'success' | 'failed' | 'running' | 'pending'
  branch: string
  lastRun: string
}

export default function DeploymentPipeline() {
  const [pipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Production Deploy',
      stages: ['Build', 'Test', 'Deploy'],
      status: 'success',
      branch: 'main',
      lastRun: '2 hours ago',
    },
    {
      id: '2',
      name: 'Staging Deploy',
      stages: ['Build', 'Test', 'Deploy'],
      status: 'running',
      branch: 'develop',
      lastRun: '10 minutes ago',
    },
    {
      id: '3',
      name: 'Feature Branch',
      stages: ['Build', 'Test'],
      status: 'failed',
      branch: 'feature/auth',
      lastRun: '1 hour ago',
    },
  ])

  const [showBuilder, setShowBuilder] = useState(false)

  const getStatusIcon = (status: Pipeline['status']) => {
    switch (status) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5 text-green-600" />
      case 'failed':
        return <FiXCircle className="w-5 h-5 text-red-600" />
      case 'running':
        return <FiClock className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return <FiClock className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Deployment Pipelines</h2>
          <p className="text-gray-600">Manage CI/CD workflows</p>
        </div>
        <Button onClick={() => setShowBuilder(!showBuilder)} icon={FiGitBranch}>
          {showBuilder ? 'View Pipelines' : 'Pipeline Builder'}
        </Button>
      </div>

      {!showBuilder ? (
        <div className="space-y-4">
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(pipeline.status)}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{pipeline.name}</h3>
                    <p className="text-sm text-gray-600">Branch: {pipeline.branch}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{pipeline.lastRun}</span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                {pipeline.stages.map((stage, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                      {stage}
                    </div>
                    {idx < pipeline.stages.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-primary-500">
                  Run Pipeline
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-500">
                  View Logs
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card title="Visual Pipeline Builder">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pipeline Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="my-pipeline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Git Repository
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://github.com/org/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Build Stages
              </label>
              <div className="space-y-3">
                {['Build', 'Test', 'Security Scan', 'Deploy'].map((stage, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id={`stage-${idx}`}
                      defaultChecked={idx < 3}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`stage-${idx}`} className="flex-1 text-gray-900">
                      {stage}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="primary">Create Pipeline</Button>
              <Button variant="secondary" onClick={() => setShowBuilder(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
