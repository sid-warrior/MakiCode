'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';

interface Score {
  _id: string;
  wpm: number;
  accuracy: number;
  language: string;
  duration: number;
  timestamp: string;
}

interface DashboardClientProps {
  session: Session;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores');
      const data = await response.json();
      setScores(data.scores || []);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = session.user?.stats || {
    testsCompleted: 0,
    bestWpm: 0,
    avgAccuracy: 0,
  };

  return (
    <div className="min-h-screen font-mono bg-bg">
      {/* Header */}
      <header className="w-full py-6 px-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium text-main no-underline hover:opacity-80 transition-opacity">
            devtype
          </Link>
          <Link href="/" className="text-sm text-sub no-underline hover:text-text transition-colors">
            back to practice
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-10 py-8">
        {/* Profile */}
        <div className="flex items-center gap-4 mb-12">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user?.name || 'User'}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-3xl font-normal text-main">{session.user?.name}</h1>
            <p className="text-sub">{session.user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-16 mb-12">
          <div>
            <p className="text-sm text-sub mb-2">tests completed</p>
            <p className="text-5xl text-main font-normal">{stats.testsCompleted}</p>
          </div>
          <div>
            <p className="text-sm text-sub mb-2">best wpm</p>
            <p className="text-5xl text-main font-normal">{stats.bestWpm}</p>
          </div>
          <div>
            <p className="text-sm text-sub mb-2">avg accuracy</p>
            <p className="text-5xl text-main font-normal">{stats.avgAccuracy}%</p>
          </div>
        </div>

        {/* Recent Tests */}
        <h2 className="text-2xl font-normal text-text mb-6">recent tests</h2>

        {loading ? (
          <p className="text-sub">loading...</p>
        ) : scores.length === 0 ? (
          <div className="text-center py-12 bg-bg-sub rounded-xl border border-border">
            <p className="text-sub mb-4">no tests yet</p>
            <Link href="/" className="text-main no-underline hover:opacity-80 transition-opacity">
              start typing →
            </Link>
          </div>
        ) : (
          <div className="bg-bg-sub rounded-xl border border-border overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-sub text-sm text-left border-b border-border">
                  <th className="py-5 px-6 font-normal">date</th>
                  <th className="py-5 px-6 font-normal">wpm</th>
                  <th className="py-5 px-6 font-normal">accuracy</th>
                  <th className="py-5 px-6 font-normal">language</th>
                  <th className="py-5 px-6 font-normal">duration</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr 
                    key={score._id}
                    className="border-b border-border last:border-b-0 hover:bg-border/30 transition-colors"
                  >
                    <td className="py-5 px-6 text-sub">
                      {new Date(score.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-main font-medium">{score.wpm}</span>
                    </td>
                    <td className="py-5 px-6 text-text">{score.accuracy}%</td>
                    <td className="py-5 px-6 text-sub">{score.language}</td>
                    <td className="py-5 px-6 text-sub">{score.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
