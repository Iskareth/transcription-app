import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

interface AudioExtractionResult {
  audioPath: string
  duration: number
}

/**
 * Downloads a video from TikTok/Instagram and extracts audio as MP3
 * Uses yt-dlp for downloading and ffmpeg for audio extraction
 */
export async function downloadAndExtractAudio(
  videoUrl: string
): Promise<AudioExtractionResult> {
  // Create temporary directory for processing
  const tempDir = path.join(os.tmpdir(), `transcription-${Date.now()}`)
  fs.mkdirSync(tempDir, { recursive: true })

  const videoPath = path.join(tempDir, 'video.mp4')
  const audioPath = path.join(tempDir, 'audio.mp3')

  try {
    console.log(`[Video Processor] Temp directory: ${tempDir}`)
    console.log(`[Video Processor] Downloading video from: ${videoUrl}`)

    // Download video using yt-dlp
    // The -f flag selects the best format
    // The -o flag specifies output filename
    const ytDlpPath = '/Users/isak/Library/Python/3.9/bin/yt-dlp'
    const downloadCommand = `${ytDlpPath} -f "best[height<=720]" -o "${videoPath}" "${videoUrl}"`
    
    console.log(`[Video Processor] Running: yt-dlp download...`)
    await execAsync(downloadCommand, { maxBuffer: 50 * 1024 * 1024 })
    console.log(`[Video Processor] ✅ Video downloaded`)

    // Check if video file exists
    if (!fs.existsSync(videoPath)) {
      throw new Error('Video download failed - file not found')
    }

    // Extract audio using ffmpeg
    console.log(`[Video Processor] Extracting audio to MP3...`)
    const ffmpegCommand = `ffmpeg -i "${videoPath}" -vn -ar 16000 -ac 1 -b:a 128k "${audioPath}"`
    
    await execAsync(ffmpegCommand)
    console.log(`[Video Processor] ✅ Audio extracted`)

    // Check if audio file exists
    if (!fs.existsSync(audioPath)) {
      throw new Error('Audio extraction failed - file not found')
    }

    // Get audio duration using ffprobe
    console.log(`[Video Processor] Getting audio duration...`)
    const durationCommand = `ffprobe -i "${audioPath}" -show_entries format=duration -v quiet -of csv="p=0"`
    const { stdout } = await execAsync(durationCommand)
    const duration = parseFloat(stdout.trim())
    console.log(`[Video Processor] Duration: ${duration}s`)

    // Clean up video file (keep audio for transcription)
    fs.unlinkSync(videoPath)
    console.log(`[Video Processor] Cleaned up video file`)

    return {
      audioPath,
      duration,
    }
  } catch (error: any) {
    // Clean up on error
    console.error(`[Video Processor] Error:`, error)
    
    try {
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath)
      if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath)
      fs.rmdirSync(tempDir, { recursive: true })
    } catch (cleanupError) {
      console.error('[Video Processor] Cleanup error:', cleanupError)
    }

    throw new Error(`Video processing failed: ${error.message}`)
  }
}

/**
 * Cleanup function to delete temporary audio file after transcription
 */
export function cleanupAudioFile(audioPath: string): void {
  try {
    const tempDir = path.dirname(audioPath)
    
    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath)
      console.log(`[Video Processor] Deleted audio file: ${audioPath}`)
    }
    
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true })
      console.log(`[Video Processor] Deleted temp directory: ${tempDir}`)
    }
  } catch (error) {
    console.error('[Video Processor] Cleanup error:', error)
    // Don't throw - cleanup errors shouldn't break the flow
  }
}

