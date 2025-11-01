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
    ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' 
    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'

  return (
    <>
      <div 
        className="glass glass-hover rounded-xl p-6 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              {transcription.title || 'Untitled Video'}
            </h3>
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
          
          {transcription.status === 'completed' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              ✓
            </span>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {snippet}
        </p>

        <div className="flex items-center justify-between text-sm">
          <a
            href={transcription.video_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View original
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <span className="text-gray-400 hover:text-white transition-colors">
            View transcript →
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

