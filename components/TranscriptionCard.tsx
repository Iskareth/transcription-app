'use client'

import { Transcription } from '@/types/database'
import { useState } from 'react'
import TranscriptionModal from './TranscriptionModal'

interface TranscriptionCardProps {
  transcription: Transcription
}

export default function TranscriptionCard({ transcription }: TranscriptionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Format date to be more readable
  const formattedDate = new Date(transcription.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Get a snippet of the transcript (first 150 characters)
  const snippet = transcription.transcript 
    ? transcription.transcript.length > 150
      ? transcription.transcript.substring(0, 150) + '...'
      : transcription.transcript
    : 'No transcript available'

  // Platform badge styling
  const platformColor = transcription.platform === 'tiktok' 
    ? 'bg-pink-100 text-pink-800' 
    : 'bg-purple-100 text-purple-800'

  return (
    <>
      <div 
        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {transcription.title || 'Untitled Video'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${platformColor}`}>
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
          
          {transcription.status === 'completed' && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              ✓ Complete
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {snippet}
        </p>

        <div className="flex items-center justify-between">
          <a
            href={transcription.video_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
          >
            View original video
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <span className="text-sm font-medium text-gray-900 hover:text-indigo-600">
            View full transcript →
          </span>
        </div>
      </div>

      <TranscriptionModal 
        transcription={transcription}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

