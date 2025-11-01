'use client'

import { useState } from 'react'
import TranscribeModal from './TranscribeModal'

export default function NewTranscriptionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="glass glass-hover inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Transcription
      </button>

      <TranscribeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

