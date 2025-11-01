'use client'

import { useState } from 'react'
import { detectPlatform, getUrlError } from '@/lib/validators'

interface TranscriptionFormProps {
  onSuccess?: () => void
}

export default function TranscriptionForm({ onSuccess }: TranscriptionFormProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showMockResult, setShowMockResult] = useState(false)
  const [mockTranscript, setMockTranscript] = useState('')

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

    // Simulate processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock transcript based on platform
    const mockText = platform === 'tiktok' 
      ? "Hey everyone! Today I want to share three tips that completely changed my content strategy. First, always hook your audience in the first 3 seconds. Second, tell a story - people remember stories way better than facts. And third, always end with a call to action. Try these tips and let me know how they work for you!"
      : "What's up Instagram! Quick reel to show you this amazing product I've been using. It's seriously a game changer and I think you all need to check it out. Link in bio if you want to grab one for yourself. Thanks for watching!"

    setMockTranscript(mockText)
    setShowMockResult(true)
    setLoading(false)
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess()
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
            <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-2">
              Video URL
            </label>
            <input
              id="video-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok or Instagram Reel URL here..."
              disabled={loading}
              className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {detectPlatform(url) && !error && (
              <p className="mt-2 text-sm text-green-600">
                ✓ Detected: {detectPlatform(url) === 'tiktok' ? 'TikTok' : 'Instagram Reel'}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !url}
            className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <p className="text-xs text-gray-500 text-center">
            🎬 Supported: TikTok videos and Instagram Reels
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-sm font-semibold text-green-800">Transcription Complete!</h3>
            </div>
            <p className="text-sm text-green-700">
              Platform: {detectPlatform(url) === 'tiktok' ? 'TikTok' : 'Instagram'}
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Transcript:</h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {mockTranscript}
            </p>
          </div>

          <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Mock Mode:</strong> This is a fake transcript for testing. In Milestone 4, we'll connect to the real Whisper API!
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full rounded-md bg-gray-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
          >
            Transcribe Another Video
          </button>
        </div>
      )}
    </div>
  )
}

