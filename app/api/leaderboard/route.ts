import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Score } from '@/models/Score';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('language');
    const limit = parseInt(searchParams.get('limit') || '50');

    await dbConnect();

    // Build query
    const query = language && language !== 'all' ? { language } : {};

    // Get top scores
    const topScores = await Score.find(query)
      .sort({ wpm: -1, timestamp: -1 })
      .limit(limit)
      .populate('userId', 'name image');

    // Format response
    const leaderboard = topScores.map((score: any, index: number) => ({
      rank: index + 1,
      name: score.userId?.name || 'Anonymous',
      image: score.userId?.image,
      wpm: score.wpm,
      accuracy: score.accuracy,
      language: score.language,
      duration: score.duration,
      timestamp: score.timestamp,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
