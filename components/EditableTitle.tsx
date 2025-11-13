'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface EditableTitleProps {
  transcriptionId: string
  initialTitle: string | null
  className?: string
  onSave?: (newTitle: string) => void
}

export default function EditableTitle({
  transcriptionId,
  initialTitle,
  className = '',
  onSave
}: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle || 'Untitled Video')
  const [originalTitle, setOriginalTitle] = useState(initialTitle || 'Untitled Video')
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Check if title has been changed
  const hasChanged = title !== originalTitle

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isEditing) {
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!hasChanged || isSaving) return

    setIsSaving(true)

    try {
      const { error } = await supabase
        .from('transcriptions')
        .update({
          title: title,
          updated_at: new Date().toISOString()
        })
        .eq('id', transcriptionId)

      if (error) throw error

      // Update the original title to the new value
      setOriginalTitle(title)
      setIsEditing(false)

      // Refresh the page data
      router.refresh()

      // Call onSave callback if provided
      if (onSave) {
        onSave(title)
      }
    } catch (error) {
      console.error('Failed to update title:', error)
      // Revert to original title on error
      setTitle(originalTitle)
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setTitle(originalTitle)
      setIsEditing(false)
    }
  }

  const handleBlur = () => {
    // Don't auto-save on blur, just exit edit mode if no changes
    if (!hasChanged) {
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center gap-2 group w-full">
      {isEditing ? (
        <>
          <div className="flex items-center gap-2 flex-1">
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onClick={(e) => e.stopPropagation()}
              className={`${className} bg-transparent border-none focus:outline-none opacity-70 w-full`}
              disabled={isSaving}
            />
          </div>
          {hasChanged && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleSave()
              }}
              disabled={isSaving}
              className="text-green-400 hover:text-green-300 transition-colors disabled:opacity-50 flex-shrink-0"
              title="Save title"
            >
              {isSaving ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}
        </>
      ) : (
        <div
          onClick={handleClick}
          className={`${className} cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2`}
          title="Click to edit title"
        >
          <span>{title}</span>
          <svg
            className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      )}
    </div>
  )
}
