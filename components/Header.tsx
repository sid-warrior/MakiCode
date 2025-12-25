'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full py-6 px-10 font-mono">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-medium text-main no-underline hover:opacity-80 transition-opacity">
          devtype
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link href="/leaderboard" className="text-sm text-sub no-underline hover:text-text transition-colors">
            leaderboard
          </Link>
          
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm text-sub no-underline hover:text-text transition-colors">
                {session.user?.name || 'profile'}
              </Link>
              <button 
                onClick={() => signOut()}
                className="text-sm text-sub bg-transparent border-none cursor-pointer font-mono hover:text-text transition-colors"
              >
                logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="px-5 py-2.5 text-sm font-medium text-bg bg-main hover:bg-yellow-600 rounded-lg cursor-pointer font-mono border-none transition-colors"
            >
              login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
