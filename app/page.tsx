import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center p-8 py-20">
        <div className="max-w-5xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
              Transcribe Any Short Video in 60 Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Paste a TikTok, Instagram Reel, or YouTube Shorts link. Get an accurate AI transcript instantly.
              Powered by OpenAI Whisper. No complicated setup. No learning curve. Just transcripts.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/login"
              className="glass glass-hover px-8 py-4 rounded-xl text-white font-medium text-lg"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              From Video Link to Text in 3 Steps
            </h2>
            <p className="text-lg text-gray-400">
              No technical knowledge required. Works every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto glass rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">1</div>
                <h3 className="text-xl font-semibold text-white">Paste URL</h3>
                <p className="text-gray-400">
                  Copy any TikTok, Instagram Reel, or YouTube Shorts link
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto glass rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">2</div>
                <h3 className="text-xl font-semibold text-white">AI Processing</h3>
                <p className="text-gray-400">
                  Our AI transcribes the audio using advanced speech recognition
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto glass rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">3</div>
                <h3 className="text-xl font-semibold text-white">Get Transcript</h3>
                <p className="text-gray-400">
                  View, edit, organize with tags, and copy your transcript instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why This Tool Exists
            </h2>
            <p className="text-lg text-gray-400">
              Most transcription tools are bloated with features you'll never use. We built the opposite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="glass rounded-xl p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">No Complexity</h3>
                <p className="text-gray-400">Paste URL. Get transcript. That's the entire workflow. No learning curve.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-xl p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Best-in-Class AI</h3>
                <p className="text-gray-400">OpenAI Whisper. The same AI used by industry leaders. No proprietary models.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-xl p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast Results</h3>
                <p className="text-gray-400">Most transcripts ready in under 60 seconds. No queues, no delays.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass rounded-xl p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Simple Organization</h3>
                <p className="text-gray-400">Optional tags to organize your transcripts. Use them or don't. Your choice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Start Transcribing Your Videos Right Now
            </h2>
            <p className="text-xl text-gray-400">
              Free to start. Paste your first link and see results in under 60 seconds.
            </p>
            <div className="pt-4">
              <Link
                href="/login"
                className="glass glass-hover px-10 py-5 rounded-xl text-white font-medium text-lg inline-block"
              >
                Get Your First Transcript Free →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

