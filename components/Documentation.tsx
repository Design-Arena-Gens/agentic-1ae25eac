'use client'

import { FiBook, FiExternalLink, FiSearch, FiHelpCircle } from 'react-icons/fi'
import Card from './Card'

interface DocSection {
  title: string
  description: string
  links: { title: string; url: string }[]
}

export default function Documentation() {
  const sections: DocSection[] = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of the Kubernetes management platform',
      links: [
        { title: 'Platform Overview', url: '#' },
        { title: 'Quick Start Guide', url: '#' },
        { title: 'Basic Concepts', url: '#' },
        { title: 'First Deployment', url: '#' },
      ],
    },
    {
      title: 'Cluster Management',
      description: 'Managing Kubernetes clusters',
      links: [
        { title: 'Creating a Cluster', url: '#' },
        { title: 'Scaling Nodes', url: '#' },
        { title: 'Upgrading Kubernetes', url: '#' },
        { title: 'Cluster Backup & Restore', url: '#' },
      ],
    },
    {
      title: 'Deployment & CI/CD',
      description: 'Automated deployment workflows',
      links: [
        { title: 'Pipeline Configuration', url: '#' },
        { title: 'Git Integration', url: '#' },
        { title: 'Deployment Strategies', url: '#' },
        { title: 'Rollback Procedures', url: '#' },
      ],
    },
    {
      title: 'Monitoring & Observability',
      description: 'System monitoring and logging',
      links: [
        { title: 'Prometheus Setup', url: '#' },
        { title: 'Grafana Dashboards', url: '#' },
        { title: 'Log Aggregation', url: '#' },
        { title: 'Alert Configuration', url: '#' },
      ],
    },
    {
      title: 'Security & Access Control',
      description: 'RBAC and security best practices',
      links: [
        { title: 'User Management', url: '#' },
        { title: 'Role Configuration', url: '#' },
        { title: 'Network Policies', url: '#' },
        { title: 'Secret Management', url: '#' },
      ],
    },
    {
      title: 'Configuration Management',
      description: 'GitOps and manifest management',
      links: [
        { title: 'GitOps Overview', url: '#' },
        { title: 'Manifest Structure', url: '#' },
        { title: 'Sync Strategies', url: '#' },
        { title: 'Version Control', url: '#' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Documentation & Support</h2>
        <p className="text-gray-600">Comprehensive guides and resources</p>
      </div>

      <Card>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-primary-500">
            Search
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <Card key={idx}>
            <div className="flex items-center space-x-3 mb-4">
              <FiBook className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{section.description}</p>
            <ul className="space-y-2">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.url}
                    className="flex items-center justify-between text-primary-600 hover:text-primary-700 text-sm group"
                  >
                    <span>{link.title}</span>
                    <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="API Documentation">
          <p className="text-gray-600 mb-4">
            Complete REST API reference for programmatic access to the platform.
          </p>
          <div className="space-y-3">
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900">REST API Reference</p>
              <p className="text-sm text-gray-600">Complete endpoint documentation</p>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900">Authentication</p>
              <p className="text-sm text-gray-600">API keys and OAuth flows</p>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900">Client SDKs</p>
              <p className="text-sm text-gray-600">Python, Go, Node.js libraries</p>
            </a>
          </div>
        </Card>

        <Card title="Support & Community">
          <p className="text-gray-600 mb-4">
            Get help from our support team and community resources.
          </p>
          <div className="space-y-3">
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiHelpCircle className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Support Portal</p>
                  <p className="text-sm text-gray-600">Submit tickets and track issues</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiBook className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Knowledge Base</p>
                  <p className="text-sm text-gray-600">Common issues and solutions</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiExternalLink className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Community Forum</p>
                  <p className="text-sm text-gray-600">Connect with other users</p>
                </div>
              </div>
            </a>
          </div>
        </Card>
      </div>

      <Card title="Video Tutorials">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Platform Introduction', duration: '10:24' },
            { title: 'Deploying Your First App', duration: '15:37' },
            { title: 'Setting Up Monitoring', duration: '12:18' },
          ].map((video, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer">
              <div className="aspect-video bg-gray-300 rounded mb-3 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1"></div>
                </div>
              </div>
              <p className="font-medium text-gray-900">{video.title}</p>
              <p className="text-sm text-gray-600">{video.duration}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
