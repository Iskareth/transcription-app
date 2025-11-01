'use client'

import { useState } from 'react'
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
  const [showMockResult, setShowMockResult] = useState(false)
  const [mockTranscript, setMockTranscript] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setShowMockResult(false)

    // Validate URL
    const urlError = getUrlError(url)
    if (urlError) {
      setError(urlError)
      return
    }

    const platform = detectPlatform(url)
    
    setLoading(true)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be logged in to create transcriptions')
        setLoading(false)
        return
      }

      // Simulate processing delay (2 seconds) - will be real API in Milestone 4
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock transcript based on platform (will be real Whisper API in Milestone 4)
      const mockText = platform === 'tiktok' 
        ? "Hey everyone! Today I want to share three tips that completely changed my content strategy. First, always hook your audience in the first 3 seconds. Second, tell a story - people remember stories way better than facts. And third, always end with a call to action. Try these tips and let me know how they work for you!"
        : "What's up Instagram! Quick reel to show you this amazing product I've been using. It's seriously a game changer and I think you all need to check it out. Link in bio if you want to grab one for yourself. Thanks for watching!"

      // Auto-generate title from transcript (first 50 characters)
      const autoTitle = mockText.substring(0, 50).trim() + '...'

      // Save to Supabase
      const { data, error: insertError } = await supabase
        .from('transcriptions')
        .insert({
          user_id: user.id,
          video_url: url,
          platform: platform!,
          title: autoTitle,
          transcript: mockText,
          status: 'completed',
          duration_seconds: platform === 'tiktok' ? 45 : 32, // Mock duration
        })
        .select()
        .single()

      if (insertError) throw insertError

      setMockTranscript(mockText)
      setShowMockResult(true)
      
      // Refresh the page to show new transcription in list
      router.refresh()
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create transcription')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setUrl('')
    setError('')
    setShowMockResult(false)
    setMockTranscript('')
  }

  return (
    <div className="space-y-6">
      {!showMockResult ? (
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
                Processing...
              </>
            ) : (
              'Transcribe Video'
            )}
          </button>

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
              {mockTranscript}
            </p>
          </div>

          <div className="glass rounded-xl p-4 border-blue-500/20">
            <p className="text-sm text-gray-300">
              💡 <strong className="text-white">Mock Mode:</strong> Real transcription coming in Milestone 4!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(mockTranscript)
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

