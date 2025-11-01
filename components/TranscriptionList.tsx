import { Transcription } from '@/types/database'
import TranscriptionCard from './TranscriptionCard'
import Link from 'next/link'

interface TranscriptionListProps {
  transcriptions: Transcription[]
}

export default function TranscriptionList({ transcriptions }: TranscriptionListProps) {
  if (transcriptions.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-4 text-sm font-medium text-white">No transcriptions yet</h3>
        <p className="mt-1 text-sm text-gray-400">Create your first transcription to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transcriptions.map((transcription) => (
        <TranscriptionCard key={transcription.id} transcription={transcription} />
      ))}
    </div>
  )
}

