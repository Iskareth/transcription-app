import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Video Transcription
          </h1>
          <p className="text-xl text-gray-400">
            AI-powered transcripts for TikTok and Instagram Reels
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link
            href="/login"
            className="glass glass-hover px-8 py-4 rounded-xl text-white font-medium"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </main>
  )
}

