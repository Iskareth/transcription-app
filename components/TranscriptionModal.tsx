'use client'

import { Transcription } from '@/types/database'
import { useEffect } from 'react'

interface TranscriptionModalProps {
  transcription: Transcription
  isOpen: boolean
  onClose: () => void
}

export default function TranscriptionModal({ transcription, isOpen, onClose }: TranscriptionModalProps) {
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

  const formattedDate = new Date(transcription.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const platformColor = transcription.platform === 'tiktok' 
    ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' 
    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
      
      {/* Modal */}
      <div 
        className="glass relative rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="sticky top-0 glass border-b border-white/10 px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {transcription.title || 'Untitled Video'}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${platformColor}`}>
                    {transcription.platform === 'tiktok' ? 'TikTok' : 'Instagram'}
                  </span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                  {transcription.duration_seconds && (
                    <>
                      <span>•</span>
                      <span>{transcription.duration_seconds}s</span>
                    </>
                  )}
                </div>
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
          <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Full Transcript:</h3>
              <p className="text-white leading-relaxed whitespace-pre-wrap">
                {transcription.transcript || 'No transcript available'}
              </p>
            </div>

            {/* Video URL */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Original Video:</h3>
              <a
                href={transcription.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors break-all flex items-center gap-2"
              >
                {transcription.video_url}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 glass border-t border-white/10 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={() => {
                if (transcription.transcript) {
                  navigator.clipboard.writeText(transcription.transcript)
                }
              }}
              className="glass glass-hover px-4 py-2 text-sm font-medium text-white rounded-lg"
            >
              Copy Transcript
            </button>
            <button
              onClick={onClose}
              className="glass glass-hover px-4 py-2 text-sm font-medium text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

