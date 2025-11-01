'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface DeleteTranscriptionButtonProps {
  transcriptionId: string
  onDelete?: () => void
}

export default function DeleteTranscriptionButton({ transcriptionId, onDelete }: DeleteTranscriptionButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    setLoading(true)

    try {
      const { error } = await supabase
        .from('transcriptions')
        .delete()
        .eq('id', transcriptionId)

      if (error) throw error

      // Refresh the page to update the list
      router.refresh()
      
      // Call onDelete callback if provided
      if (onDelete) {
        onDelete()
      }
    } catch (error: any) {
      console.error('Error deleting transcription:', error)
      alert('Failed to delete transcription')
    } finally {
      setLoading(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="glass glass-hover px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border-red-500/30 disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={loading}
          className="glass glass-hover px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        setShowConfirm(true)
      }}
      className="glass glass-hover px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-red-400 transition-colors"
    >
      Delete
    </button>
  )
}

