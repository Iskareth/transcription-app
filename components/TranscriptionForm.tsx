'use client'

import { useState, useEffect } from 'react'
import { detectPlatform, getUrlError } from '@/lib/validators'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface TranscriptionFormProps {
  onSuccess?: () => void
}

export default function TranscriptionForm({ onSuccess }: TranscriptionFormProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [transcriptionId, setTranscriptionId] = useState<string | null>(null)
  const [transcript, setTranscript] = useState('')
  const [processingStatus, setProcessingStatus] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  // Poll for status updates
  useEffect(() => {
    if (!transcriptionId) return

    const pollInterval = setInterval(async () => {
      const { data, error } = await supabase
        .from('transcriptions')
        .select('status, transcript')
        .eq('id', transcriptionId)
        .single()

      if (error) {
        console.error('Polling error:', error)
        return
      }

      if (data.status === 'completed') {
        setTranscript(data.transcript || '')
        setLoading(false)
        setProcessingStatus('Completed!')
        router.refresh()
        clearInterval(pollInterval)
      } else if (data.status === 'failed') {
        setError('Transcription failed. Please try again.')
        setLoading(false)
        clearInterval(pollInterval)
      }
    }, 3000) // Poll every 3 seconds

    return () => clearInterval(pollInterval)
  }, [transcriptionId, supabase, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setTranscript('')
    setTranscriptionId(null)

    // Validate URL
    const urlError = getUrlError(url)
    if (urlError) {
      setError(urlError)
      return
    }

    const platform = detectPlatform(url)
    
    setLoading(true)
    setProcessingStatus('Creating transcription record...')

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be logged in to create transcriptions')
        setLoading(false)
        return
      }

      // Create transcription record with status='processing'
      setProcessingStatus('Saving to database...')
      const { data, error: insertError } = await supabase
        .from('transcriptions')
        .insert({
          user_id: user.id,
          video_url: url,
          platform: platform!,
          status: 'processing',
        })
        .select()
        .single()

      if (insertError) throw insertError

      const newTranscriptionId = data.id
      setTranscriptionId(newTranscriptionId)

      // Call API to process video (downloads, converts, transcribes)
      setProcessingStatus('Downloading video...')
      
      // Call API in background - don't await
      fetch('/api/process-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcriptionId: newTranscriptionId,
          videoUrl: url,
        }),
      }).catch((err) => {
        console.error('API call error:', err)
        setError('Failed to start processing')
        setLoading(false)
      })

      // Status polling will handle the rest via useEffect
      setProcessingStatus('Processing video... This may take 30-60 seconds')
      
    } catch (err: any) {
      setError(err.message || 'Failed to create transcription')
      setLoading(false)
    }
  }

  function handleReset() {
    setUrl('')
    setError('')
    setTranscript('')
    setTranscriptionId(null)
    setProcessingStatus('')
  }

  return (
    <div className="space-y-6">
      {!transcript ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="video-url" className="block text-sm font-medium text-gray-300 mb-2">
              Video URL
            </label>
            <input
              id="video-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok or Instagram Reel URL..."
              disabled={loading}
              className="glass w-full rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {detectPlatform(url) && !error && (
              <p className="mt-2 text-sm text-green-400">
                ✓ Detected: {detectPlatform(url) === 'tiktok' ? 'TikTok' : 'Instagram Reel'}
              </p>
            )}
          </div>

          {error && (
            <div className="glass rounded-xl p-4 border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !url}
            className="glass glass-hover w-full flex justify-center items-center rounded-xl px-4 py-3 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {processingStatus || 'Processing...'}
              </>
            ) : (
              'Transcribe Video'
            )}
          </button>

          {processingStatus && (
            <div className="glass rounded-xl p-4 border-blue-500/20">
              <p className="text-sm text-gray-300">
                ℹ️ {processingStatus}
              </p>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center">
            🎬 Supported: TikTok videos and Instagram Reels
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="glass rounded-xl p-4 border-green-500/20">
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-sm font-semibold text-green-400">Transcription Complete!</h3>
            </div>
            <p className="text-sm text-gray-300">
              Platform: {detectPlatform(url) === 'tiktok' ? 'TikTok' : 'Instagram'}
            </p>
          </div>

          <div className="glass rounded-xl p-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Transcript:</h4>
            <p className="text-white leading-relaxed whitespace-pre-wrap">
              {transcript}
            </p>
          </div>

          <div className="glass rounded-xl p-4 border-green-500/20">
            <p className="text-sm text-gray-300">
              ✅ <strong className="text-white">Real Transcription:</strong> Powered by OpenAI Whisper!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(transcript)
              }}
              className="glass glass-hover flex-1 rounded-xl px-4 py-3 text-sm font-medium text-white"
            >
              📋 Copy
            </button>
            <button
              onClick={handleReset}
              className="glass glass-hover flex-1 rounded-xl px-4 py-3 text-sm font-medium text-white"
            >
              New Transcription
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

