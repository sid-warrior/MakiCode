import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Score } from '@/models/Score';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('language');
    const limit = parseInt(searchParams.get('limit') || '50');

    await dbConnect();

    // Build query
    const query: any = {};
    if (language && language !== 'all') {
      query.language = language;
    }

    // Get top scores - sort by weighted score (WPM * accuracy/100)
    // This way both WPM and accuracy matter
    // Since WPM is calculated from correct chars only, this is fair
    const topScores = await Score.aggregate([
      { $match: query },
      {
        $addFields: {
          // Calculate weighted score: WPM * (accuracy/100)
          // e.g., 100 WPM with 90% accuracy = 90 score
          // e.g., 80 WPM with 100% accuracy = 80 score
          weightedScore: { $multiply: ['$wpm', { $divide: ['$accuracy', 100] }] }
        }
      },
      { $sort: { weightedScore: -1, timestamp: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }
    ]);

    // Format response
    const leaderboard = topScores.map((score: any, index: number) => ({
      rank: index + 1,
      name: score.user?.name || 'Anonymous',
      image: score.user?.image,
      wpm: score.wpm,
      accuracy: score.accuracy,
      weightedScore: Math.round(score.weightedScore),
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
