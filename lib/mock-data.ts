import { Transcription } from '@/types/database'

// Mock transcriptions for testing UI
export const mockTranscriptions: Transcription[] = [
  {
    id: '1',
    user_id: 'mock-user-id',
    video_url: 'https://www.tiktok.com/@user/video/1234567890',
    platform: 'tiktok',
    title: 'Marketing Tips for Small Business',
    transcript: "Hey everyone! Today I want to share three tips that completely changed my content strategy. First, always hook your audience in the first 3 seconds - people scroll fast, so you need to grab attention immediately. Second, tell a story - people remember stories way better than facts and figures. And third, always end with a call to action. Whether it's asking them to follow, comment, or check out your link, give them a next step. Try these tips and let me know how they work for you!",
    audio_url: null,
    duration_seconds: 45,
    status: 'completed',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    user_id: 'mock-user-id',
    video_url: 'https://www.instagram.com/reel/ABC123XYZ/',
    platform: 'instagram',
    title: 'Product Review: Game Changer',
    transcript: "What's up Instagram! Quick reel to show you this amazing product I've been using for the past month. It's seriously a game changer and has saved me so much time. The quality is incredible, way better than what I was using before. If you're looking for something like this, I highly recommend checking it out. Link in bio if you want to grab one for yourself. Thanks for watching and don't forget to follow for more reviews!",
    audio_url: null,
    duration_seconds: 32,
    status: 'completed',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    user_id: 'mock-user-id',
    video_url: 'https://www.tiktok.com/@creator/video/9876543210',
    platform: 'tiktok',
    title: 'Day in the Life Vlog',
    transcript: "Good morning everyone! Taking you through a day in my life as a content creator. Started the day with some coffee and emails, then jumped into filming three new videos. It's not as glamorous as it looks - lots of editing, reshoots, and planning. But I love what I do! The creative freedom is incredible and connecting with you all makes it so worth it. Let me know if you want more behind-the-scenes content like this!",
    audio_url: null,
    duration_seconds: 58,
    status: 'completed',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    user_id: 'mock-user-id',
    video_url: 'https://www.instagram.com/reel/DEF456UVW/',
    platform: 'instagram',
    title: null,
    transcript: "This is why you should never skip leg day. Trust me on this one. Your future self will thank you. Also, proper form is everything - don't sacrifice form for weight. Start light, master the movement, then gradually increase. That's how you build real strength and avoid injuries. Stay consistent, stay safe, and keep pushing!",
    audio_url: null,
    duration_seconds: 28,
    status: 'completed',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    user_id: 'mock-user-id',
    video_url: 'https://www.tiktok.com/@foodie/video/5555555555',
    platform: 'tiktok',
    title: 'Easy 5-Minute Breakfast Recipe',
    transcript: "Okay this is the easiest breakfast hack ever. You literally need three ingredients. Eggs, bread, and cheese. That's it. Toast your bread, scramble your eggs with a little cheese, stack it up, and boom - you've got yourself a gourmet breakfast sandwich in under 5 minutes. Perfect for busy mornings when you don't have time but still want something good. You're welcome!",
    audio_url: null,
    duration_seconds: 38,
    status: 'completed',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

