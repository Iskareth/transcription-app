'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface TagManagerProps {
  transcriptionId: string
  initialTags: string[] | null
  compact?: boolean // For displaying in cards vs modal
}

export default function TagManager({
  transcriptionId,
  initialTags,
  compact = false
}: TagManagerProps) {
  const [tags, setTags] = useState<string[]>(initialTags || [])
  const [isAdding, setIsAdding] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Sync local state with prop changes (fixes modal/card sync issue)
  useEffect(() => {
    setTags(initialTags || [])
  }, [initialTags])

  // Fetch all existing tags for autocomplete
  const fetchAllTags = async () => {
    const { data } = await supabase
      .from('transcriptions')
      .select('tags')
      .not('tags', 'is', null)

    if (data) {
      // Flatten all tags and get unique values
      const uniqueTags = Array.from(
        new Set(data.flatMap((item) => item.tags || []))
      ).sort()
      setAllTags(uniqueTags)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchAllTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Focus input when entering add mode
  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAdding])

  // Update suggestions based on input
  useEffect(() => {
    if (newTag.trim()) {
      const filtered = allTags
        .filter((tag) =>
          tag.toLowerCase().includes(newTag.toLowerCase()) &&
          !tags.includes(tag)
        )
        .slice(0, 5) // Show max 5 suggestions
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [newTag, allTags, tags])

  const saveTags = async (updatedTags: string[]) => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('transcriptions')
        .update({
          tags: updatedTags.length > 0 ? updatedTags : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', transcriptionId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Failed to update tags:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const addTag = async (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const updatedTags = [...tags, trimmedTag]
      setTags(updatedTags)
      await saveTags(updatedTags)

      // Refetch all tags to update autocomplete suggestions across all instances
      await fetchAllTags()
    }
    setNewTag('')
    setIsAdding(false)
  }

  const removeTag = async (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    await saveTags(updatedTags)

    // Refetch all tags to update autocomplete suggestions
    await fetchAllTags()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(newTag)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setNewTag('')
      setIsAdding(false)
    }
  }

  const tagColors = [
    'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'bg-green-500/20 text-green-400 border-green-500/30',
    'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    'bg-orange-500/20 text-orange-400 border-orange-500/30',
  ]

  // Generate consistent color for each tag based on its name
  const getTagColor = (tag: string) => {
    const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return tagColors[hash % tagColors.length]
  }

  return (
    <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {/* Existing tags */}
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getTagColor(tag)} ${compact ? '' : 'text-sm'}`}
        >
          <span>{tag}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              removeTag(tag)
            }}
            className="hover:opacity-70 transition-opacity"
            disabled={isSaving}
            title="Remove tag"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}

      {/* Add tag button or input */}
      {isAdding ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!newTag.trim()) {
                setIsAdding(false)
              }
            }}
            placeholder="Add tag..."
            className={`glass px-2.5 py-1 rounded-lg ${compact ? 'text-xs' : 'text-sm'} text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[120px]`}
            disabled={isSaving}
          />

          {/* Autocomplete suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 mt-1 glass rounded-lg border border-white/10 shadow-lg z-10 min-w-[150px] overflow-hidden">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={(e) => {
                    e.stopPropagation()
                    addTag(suggestion)
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsAdding(true)
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-400 border border-dashed border-gray-500 hover:border-gray-400 hover:text-gray-300 transition-colors`}
          disabled={isSaving}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add tag</span>
        </button>
      )}

      {/* Loading indicator */}
      {isSaving && (
        <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </div>
  )
}
