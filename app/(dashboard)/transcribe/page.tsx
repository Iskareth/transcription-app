import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import TranscriptionForm from '@/components/TranscriptionForm'

export default async function TranscribePage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="text-sm text-indigo-600 hover:text-indigo-500 mb-4 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">New Transcription</h1>
          <p className="mt-2 text-sm text-gray-600">
            Paste a TikTok, Instagram Reel, or YouTube Shorts URL to get an AI-generated transcript
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <TranscriptionForm />
        </div>

        <div className="mt-6 rounded-md bg-gray-50 p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">How it works:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Paste a TikTok, Instagram Reel, or YouTube Shorts URL (max 3 minutes)</li>
            <li>We download and convert the video to audio</li>
            <li>AI transcribes the audio using OpenAI Whisper</li>
            <li>You get the transcript in seconds!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

