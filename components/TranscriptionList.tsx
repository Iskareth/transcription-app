import { Transcription } from '@/types/database'
import TranscriptionCard from './TranscriptionCard'
import Link from 'next/link'

interface TranscriptionListProps {
  transcriptions: Transcription[]
}

export default function TranscriptionList({ transcriptions }: TranscriptionListProps) {
  if (transcriptions.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No transcriptions yet</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating your first transcription.</p>
        <div className="mt-6">
          <Link
            href="/transcribe"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Transcription
          </Link>
        </div>
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

