import OpenAI from 'openai'
import fs from 'fs'
import { cleanupAudioFile } from './video-processor'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Transcribes an audio file using OpenAI's Whisper API
 * @param audioPath - Path to the audio file (MP3)
 * @returns Transcribed text
 */
export async function transcribeAudio(audioPath: string): Promise<string> {
  try {
    console.log(`[Transcription] Starting transcription for: ${audioPath}`)

    // Check if file exists
    if (!fs.existsSync(audioPath)) {
      throw new Error(`Audio file not found: ${audioPath}`)
    }

    // Get file size for logging
    const stats = fs.statSync(audioPath)
    const fileSizeMB = stats.size / (1024 * 1024)
    console.log(`[Transcription] File size: ${fileSizeMB.toFixed(2)} MB`)

    // Create read stream from audio file
    const audioStream = fs.createReadStream(audioPath)

    // Call OpenAI Whisper API
    console.log('[Transcription] Calling Whisper API...')
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream,
      model: 'whisper-1',
      language: 'en', // You can make this dynamic or auto-detect
      response_format: 'text',
    })

    console.log('[Transcription] ✅ Transcription successful')
    console.log(`[Transcription] Length: ${transcription.length} characters`)

    // Clean up audio file after successful transcription
    cleanupAudioFile(audioPath)

    return transcription
  } catch (error: any) {
    console.error('[Transcription] ❌ Error:', error)

    // Clean up audio file even on error
    try {
      cleanupAudioFile(audioPath)
    } catch (cleanupError) {
      console.error('[Transcription] Cleanup error:', cleanupError)
    }

    // Provide more specific error messages
    if (error.code === 'ENOENT') {
      throw new Error('Audio file not found')
    }
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key')
    }
    if (error.status === 429) {
      throw new Error('OpenAI API rate limit exceeded')
    }

    throw new Error(`Transcription failed: ${error.message || error.toString()}`)
  }
}

/**
 * Estimate transcription cost (for logging/monitoring)
 * OpenAI charges $0.006 per minute
 */
export function estimateCost(durationSeconds: number): number {
  const minutes = durationSeconds / 60
  const costPerMinute = 0.006 // USD
  return minutes * costPerMinute
}

