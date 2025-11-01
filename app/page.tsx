import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          Video Transcription Tool
        </h1>
        <p className="text-center text-gray-600">
          Transcribe TikTok and Instagram Reels with AI
        </p>
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </Link>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            🎉 Next.js 14 with TypeScript and Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  )
}

