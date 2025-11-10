'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import ClusterManagement from '@/components/ClusterManagement'
import DeploymentPipeline from '@/components/DeploymentPipeline'
import Monitoring from '@/components/Monitoring'
import AccessControl from '@/components/AccessControl'
import ConfigManagement from '@/components/ConfigManagement'
import ContainerRegistry from '@/components/ContainerRegistry'
import Documentation from '@/components/Documentation'
import Header from '@/components/Header'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'clusters':
        return <ClusterManagement />
      case 'deployments':
        return <DeploymentPipeline />
      case 'monitoring':
        return <Monitoring />
      case 'access':
        return <AccessControl />
      case 'config':
        return <ConfigManagement />
      case 'registry':
        return <ContainerRegistry />
      case 'docs':
        return <Documentation />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main id="main-content" className="flex-1 overflow-y-auto p-6" role="main">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  )
}
