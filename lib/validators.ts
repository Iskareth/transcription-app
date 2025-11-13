/**
 * Validates if a URL is from TikTok
 */
export function isTikTokUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('tiktok.com')
  } catch {
    return false
  }
}

/**
 * Validates if a URL is from Instagram
 */
export function isInstagramUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('instagram.com') && url.includes('/reel')
  } catch {
    return false
  }
}

/**
 * Validates if a URL is from YouTube Shorts
 */
export function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be'))
      && url.includes('/shorts')
  } catch {
    return false
  }
}

/**
 * Detects the platform from a URL
 */
export function detectPlatform(url: string): 'tiktok' | 'instagram' | 'youtube' | null {
  if (isTikTokUrl(url)) return 'tiktok'
  if (isInstagramUrl(url)) return 'instagram'
  if (isYouTubeUrl(url)) return 'youtube'
  return null
}

/**
 * Validates if a URL is a valid TikTok, Instagram Reel, or YouTube Shorts URL
 */
export function isValidVideoUrl(url: string): boolean {
  return isTikTokUrl(url) || isInstagramUrl(url) || isYouTubeUrl(url)
}

/**
 * Returns a user-friendly error message for invalid URLs
 */
export function getUrlError(url: string): string | null {
  if (!url.trim()) {
    return 'Please enter a URL'
  }

  try {
    new URL(url)
  } catch {
    return 'Please enter a valid URL'
  }

  if (!isValidVideoUrl(url)) {
    return 'Please enter a TikTok, Instagram Reel, or YouTube Shorts URL'
  }

  return null
}

