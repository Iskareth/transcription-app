'use client'

import { useEffect } from 'react'
import TranscriptionForm from './TranscriptionForm'

interface TranscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TranscribeModal({ isOpen, onClose }: TranscribeModalProps) {
  // Close modal on ESC key press
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal */}
        <div 
          className="glass relative rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 glass border-b border-white/10 px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  New Transcription
                </h2>
                <p className="text-sm text-gray-400">
                  Paste a TikTok or Instagram Reel URL
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-white focus:outline-none transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <TranscriptionForm />

            <div className="mt-6 glass rounded-xl p-4 border-white/5">
              <h3 className="text-sm font-medium text-white mb-2">How it works:</h3>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                <li>Paste a video URL</li>
                <li>AI transcribes the audio</li>
                <li>Get your transcript instantly</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

