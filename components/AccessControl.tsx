'use client'

import { useState } from 'react'
import { FiUser, FiShield, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import Card from './Card'
import Button from './Button'
import Modal from './Modal'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'developer' | 'viewer'
  lastActive: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
  users: number
}

export default function AccessControl() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', lastActive: '2 hours ago' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'developer', lastActive: '1 day ago' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'viewer', lastActive: '3 days ago' },
  ])

  const [roles] = useState<Role[]>([
    { id: '1', name: 'Admin', permissions: ['read', 'write', 'delete', 'manage'], users: 1 },
    { id: '2', name: 'Developer', permissions: ['read', 'write', 'deploy'], users: 1 },
    { id: '3', name: 'Viewer', permissions: ['read'], users: 1 },
  ])

  const [showAddUserModal, setShowAddUserModal] = useState(false)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'developer':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Access Control (RBAC)</h2>
        <p className="text-gray-600">Manage users and role-based permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Users</h3>
            <Button onClick={() => setShowAddUserModal(true)} icon={FiPlus}>
              Add User
            </Button>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                  <button
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500"
                    aria-label={`Edit ${user.name}`}
                  >
                    <FiEdit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors focus:ring-2 focus:ring-red-500"
                    aria-label={`Remove ${user.name}`}
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Roles</h3>
            <Button icon={FiPlus}>Create Role</Button>
          </div>

          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FiShield className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">{role.name}</h4>
                  </div>
                  <span className="text-sm text-gray-600">{role.users} users</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Audit Log">
        <div className="space-y-3">
          {[
            { action: 'User john@example.com logged in', time: '10 minutes ago', type: 'info' },
            { action: 'Role "Developer" permissions updated', time: '2 hours ago', type: 'warning' },
            { action: 'User jane@example.com deployed to production', time: '5 hours ago', type: 'success' },
            { action: 'Failed login attempt for admin@example.com', time: '1 day ago', type: 'error' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    log.type === 'error'
                      ? 'bg-red-500'
                      : log.type === 'warning'
                      ? 'bg-yellow-500'
                      : log.type === 'success'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                ></div>
                <p className="text-gray-900">{log.action}</p>
              </div>
              <span className="text-sm text-gray-600">{log.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {showAddUserModal && (
        <Modal
          title="Add New User"
          onClose={() => setShowAddUserModal(false)}
          onConfirm={() => setShowAddUserModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="user-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="user-email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="user-role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="user-role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option>Viewer</option>
                <option>Developer</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
