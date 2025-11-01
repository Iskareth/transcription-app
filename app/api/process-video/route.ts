import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { downloadAndExtractAudio } from '@/lib/video-processor'
import { transcribeAudio } from '@/lib/transcription'

export async function POST(request: NextRequest) {
  // Parse request body once at the top
  const body = await request.json()
  const { transcriptionId, videoUrl } = body

  if (!transcriptionId || !videoUrl) {
    return NextResponse.json(
      { error: 'Missing transcriptionId or videoUrl' },
      { status: 400 }
    )
  }

  try {

    console.log(`[Process Video] Starting for transcription: ${transcriptionId}`)
    console.log(`[Process Video] Video URL: ${videoUrl}`)

    // Get Supabase client
    const supabase = await createClient()

    // Update status to processing
    await supabase
      .from('transcriptions')
      .update({ status: 'processing' })
      .eq('id', transcriptionId)

    // Step 1: Download video and extract audio to MP3
    console.log('[Process Video] Step 1: Downloading video and extracting audio...')
    const { audioPath, duration } = await downloadAndExtractAudio(videoUrl)
    console.log(`[Process Video] Audio extracted: ${audioPath} (${duration}s)`)

    // Step 2: Transcribe audio using OpenAI Whisper
    console.log('[Process Video] Step 2: Transcribing audio...')
    const transcript = await transcribeAudio(audioPath)
    console.log(`[Process Video] Transcription complete: ${transcript.substring(0, 100)}...`)

    // Step 3: Auto-generate title from transcript (first 50 characters)
    const autoTitle = transcript.substring(0, 50).trim() + '...'

    // Step 4: Update database with results
    console.log('[Process Video] Step 3: Saving to database...')
    const { error: updateError } = await supabase
      .from('transcriptions')
      .update({
        transcript,
        title: autoTitle,
        duration_seconds: Math.round(duration),
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', transcriptionId)

    if (updateError) {
      throw new Error(`Failed to update transcription: ${updateError.message}`)
    }

    console.log('[Process Video] ✅ Complete!')

    return NextResponse.json({
      success: true,
      transcriptionId,
      transcript,
      duration,
    })
  } catch (error: any) {
    console.error('[Process Video] ❌ Error:', error)

    // Try to update status to failed in database
    try {
      if (transcriptionId) {
        const supabase = await createClient()
        await supabase
          .from('transcriptions')
          .update({ status: 'failed' })
          .eq('id', transcriptionId)
      }
    } catch (dbError) {
      console.error('[Process Video] Failed to update error status:', dbError)
    }

    return NextResponse.json(
      {
        error: error.message || 'Failed to process video',
        details: error.toString(),
      },
      { status: 500 }
    )
  }
}

