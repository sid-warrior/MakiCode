'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface UserStats {
  testsCompleted: number;
  bestWpm: number;
  avgAccuracy: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      // Get stats from session
      const userStats = (session.user as any).stats;
      if (userStats) {
        setStats(userStats);
      }
      setLoading(false);
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-text">Loading...</div>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Profile Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl text-text mb-2">Dashboard</h1>
            <p className="text-sub">Welcome back, {session.user?.name}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Tests Completed */}
            <div className="bg-bg-sub border border-border rounded-lg p-6">
              <p className="text-sub text-sm mb-2">Tests Completed</p>
              <p className="text-4xl text-main font-mono font-bold">
                {stats?.testsCompleted || 0}
              </p>
            </div>

            {/* Best WPM */}
            <div className="bg-bg-sub border border-border rounded-lg p-6">
              <p className="text-sub text-sm mb-2">Best WPM</p>
              <p className="text-4xl text-main font-mono font-bold">
                {stats?.bestWpm || 0}
              </p>
            </div>

            {/* Average Accuracy */}
            <div className="bg-bg-sub border border-border rounded-lg p-6">
              <p className="text-sub text-sm mb-2">Avg Accuracy</p>
              <p className="text-4xl text-main font-mono font-bold">
                {stats?.avgAccuracy?.toFixed(1) || 0}%
              </p>
            </div>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-bg-sub border border-border rounded-lg p-8 text-center">
            <p className="text-text mb-2">📊 Charts and detailed analytics coming soon</p>
            <p className="text-sub text-sm">Keep practicing to improve your stats!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
