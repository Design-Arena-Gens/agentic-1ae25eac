'use client'

import { FiHome, FiServer, FiGitBranch, FiActivity, FiShield, FiSettings, FiPackage, FiBook } from 'react-icons/fi'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'clusters', label: 'Clusters', icon: FiServer },
  { id: 'deployments', label: 'Deployments', icon: FiGitBranch },
  { id: 'monitoring', label: 'Monitoring', icon: FiActivity },
  { id: 'access', label: 'Access Control', icon: FiShield },
  { id: 'config', label: 'Configuration', icon: FiSettings },
  { id: 'registry', label: 'Registry', icon: FiPackage },
  { id: 'docs', label: 'Documentation', icon: FiBook },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200" role="navigation" aria-label="Main navigation">
      <nav className="p-4">
        <ul className="space-y-2" role="menu">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <li key={item.id} role="none">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  role="menuitem"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
