import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
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

        <div className="rounded-lg bg-white p-8 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🎉 Authentication Working!
          </h2>
          <p className="text-gray-600">
            You are successfully signed in. This is a protected page that only authenticated users can see.
          </p>
          <div className="mt-6 rounded-md bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <strong>Next steps:</strong> We'll add the transcription form and list here in the next milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

