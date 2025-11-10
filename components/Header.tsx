'use client'

import { FiBell, FiUser, FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import Tooltip from './Tooltip'

export default function Header() {
  const [notifications, setNotifications] = useState(3)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6" role="banner">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-primary-500">K8s Platform</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Tooltip content="Notifications">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-primary-500"
            aria-label={`Notifications: ${notifications} unread`}
          >
            <FiBell className="w-5 h-5 text-gray-700" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </Tooltip>

        <Tooltip content="Settings">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-primary-500"
            aria-label="Settings"
          >
            <FiSettings className="w-5 h-5 text-gray-700" />
          </button>
        </Tooltip>

        <Tooltip content="User Profile">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-primary-500"
            aria-label="User Profile"
          >
            <FiUser className="w-5 h-5 text-gray-700" />
          </button>
        </Tooltip>
      </div>
    </header>
  )
}
