import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import TranscriptionList from '@/components/TranscriptionList'
import NewTranscriptionButton from '@/components/NewTranscriptionButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Fetch real transcriptions from Supabase
  const { data: transcriptions, error: fetchError } = await supabase
    .from('transcriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (fetchError) {
    console.error('Error fetching transcriptions:', fetchError)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome, {user.email}
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="mb-6">
          <NewTranscriptionButton />
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Your Transcriptions
          </h2>
          <TranscriptionList transcriptions={transcriptions || []} />
        </div>
      </div>
    </div>
  )
}

