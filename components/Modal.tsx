'use client'

import { ReactNode, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import Button from './Button'

interface ModalProps {
  title: string
  children: ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'danger'
}

export default function Modal({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="modal-title" className="text-2xl font-bold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">{children}</div>

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
