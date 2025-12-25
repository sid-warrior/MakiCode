'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

  const recentScores = scores.slice(0, 10);
  const avgWpm = scores.length > 0 
    ? Math.round(scores.reduce((acc, s) => acc + s.wpm, 0) / scores.length)
    : 0;

  const bestPerLanguage = scores.reduce((acc, s) => {
    if (!acc[s.language] || s.wpm > acc[s.language]) {
      acc[s.language] = s.wpm;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = [...recentScores].reverse().map((s, i) => ({
    test: i + 1,
    wpm: s.wpm,
    accuracy: s.accuracy,
    date: new Date(s.timestamp).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen font-mono bg-bg">
      {/* Header */}
      <header className="w-full py-4 md:py-6 px-4 md:px-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-medium text-main no-underline hover:opacity-80 transition-opacity">
            devtype
          </Link>
          <Link href="/" className="text-xs md:text-sm text-sub no-underline hover:text-text transition-colors">
            back to practice
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-10 py-4 md:py-8">
        {/* Profile */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user?.name || 'User'}
              width={48}
              height={48}
              className="rounded-full md:w-16 md:h-16"
            />
          )}
          <div>
            <h1 className="text-xl md:text-3xl font-normal text-main">{session.user?.name}</h1>
            <p className="text-sub text-xs md:text-base">{session.user?.email}</p>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
          <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border">
            <p className="text-xs md:text-sm text-sub mb-1 md:mb-2">tests</p>
            <p className="text-2xl md:text-4xl text-main font-normal">{stats.testsCompleted}</p>
          </div>
          <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border">
            <p className="text-xs md:text-sm text-sub mb-1 md:mb-2">best wpm</p>
            <p className="text-2xl md:text-4xl text-main font-normal">{stats.bestWpm}</p>
          </div>
          <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border">
            <p className="text-xs md:text-sm text-sub mb-1 md:mb-2">avg wpm</p>
            <p className="text-2xl md:text-4xl text-main font-normal">{avgWpm}</p>
          </div>
          <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border">
            <p className="text-xs md:text-sm text-sub mb-1 md:mb-2">accuracy</p>
            <p className="text-2xl md:text-4xl text-main font-normal">{stats.avgAccuracy}%</p>
          </div>
        </div>

        {/* Charts Row */}
        {scores.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
            {/* WPM Chart */}
            <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border">
              <h3 className="text-base md:text-lg text-text mb-3 md:mb-4">wpm over time</h3>
              <div className="h-36 md:h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e2b714" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#e2b714" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="test" stroke="#646669" fontSize={10} />
                    <YAxis stroke="#646669" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#2c2e31', 
                        border: '1px solid #3d3d3d',
                        borderRadius: '8px',
                        color: '#d1d0c5',
                        fontSize: '12px',
                      }}
                    />
                    <Area type="monotone" dataKey="wpm" stroke="#e2b714" fill="url(#wpmGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Accuracy Chart */}
            <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border">
              <h3 className="text-base md:text-lg text-text mb-3 md:mb-4">accuracy over time</h3>
              <div className="h-36 md:h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="test" stroke="#646669" fontSize={10} />
                    <YAxis stroke="#646669" fontSize={10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#2c2e31', 
                        border: '1px solid #3d3d3d',
                        borderRadius: '8px',
                        color: '#d1d0c5',
                        fontSize: '12px',
                      }}
                    />
                    <Line type="monotone" dataKey="accuracy" stroke="#4ade80" strokeWidth={2} dot={{ fill: '#4ade80', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Best Per Language */}
        {Object.keys(bestPerLanguage).length > 0 && (
          <div className="bg-bg-sub rounded-xl p-4 md:p-6 border border-border mb-6 md:mb-10">
            <h3 className="text-base md:text-lg text-text mb-3 md:mb-4">best wpm per language</h3>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {Object.entries(bestPerLanguage).map(([lang, wpm]) => (
                <div key={lang} className="flex items-center gap-2 md:gap-3 bg-bg rounded-lg px-3 md:px-4 py-2 md:py-3">
                  <span className="text-sub text-xs md:text-base">{lang}</span>
                  <span className="text-main font-medium text-sm md:text-base">{wpm}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Tests */}
        <h2 className="text-xl md:text-2xl font-normal text-text mb-4 md:mb-6">recent tests</h2>

        {loading ? (
          <p className="text-sub">loading...</p>
        ) : scores.length === 0 ? (
          <div className="text-center py-8 md:py-12 bg-bg-sub rounded-xl border border-border">
            <p className="text-sub mb-4">no tests yet</p>
            <Link href="/" className="text-main no-underline hover:opacity-80 transition-opacity">
              start typing →
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {scores.slice(0, 10).map((score) => (
                <div 
                  key={score._id}
                  className="bg-bg-sub rounded-xl p-4 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sub text-xs">
                      {new Date(score.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-main font-medium text-lg">{score.wpm} wpm</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-sub">
                    <span>{score.accuracy}% acc</span>
                    <span>{score.language}</span>
                    <span>{score.duration}s</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-bg-sub rounded-xl border border-border overflow-hidden">
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
                  {scores.slice(0, 10).map((score) => (
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
          </>
        )}
      </main>
    </div>
  );
}
