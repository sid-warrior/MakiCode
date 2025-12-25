'use client';

import { useTypingStore } from '@/store/typingStore';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface ResultsModalProps {
  onRestart: () => void;
  snippetsCompleted: number;
}

export default function ResultsModal({ onRestart, snippetsCompleted }: ResultsModalProps) {
  const { isTestComplete, wpm, accuracy, language, duration } = useTypingStore();
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isTestComplete) return;
    
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onRestart();
      }
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isTestComplete, onRestart]);

  const handleSaveScore = async () => {
    if (!session || saved) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wpm, accuracy, language, duration }),
      });

      if (response.ok) {
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving score:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isTestComplete) return null;

  return (
    <div 
      onClick={onRestart}
      className="fixed inset-0 bg-bg flex items-center justify-center z-50 cursor-pointer font-mono"
    >
      <div onClick={(e) => e.stopPropagation()} className="text-center">
        {/* Main Stats */}
        <div className="flex gap-24 justify-center mb-12">
          <div className="text-left">
            <p className="text-base text-sub mb-2">wpm</p>
            <p className="text-8xl text-main font-normal leading-none">{wpm}</p>
          </div>
          <div className="text-left">
            <p className="text-base text-sub mb-2">accuracy</p>
            <p className="text-8xl text-main font-normal leading-none">{accuracy}%</p>
          </div>
        </div>

        {/* Info */}
        <div className="flex gap-5 justify-center mb-12 text-sm text-sub">
          <span>{duration}s</span>
          <span>•</span>
          <span>{language === 'all' ? 'mixed' : language}</span>
          {snippetsCompleted > 0 && (
            <>
              <span>•</span>
              <span>{snippetsCompleted + 1} snippets</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-5 justify-center">
          {session && !saved && (
            <button
              onClick={handleSaveScore}
              disabled={isSaving}
              className="px-8 py-4 bg-transparent hover:bg-bg-sub border-2 border-sub rounded-lg text-base text-text hover:text-main cursor-pointer font-mono transition-colors"
            >
              {isSaving ? 'saving...' : 'save score'}
            </button>
          )}
          
          {saved && (
            <span className="text-main px-8 py-4 text-base">
              ✓ saved to leaderboard
            </span>
          )}

          <button
            onClick={onRestart}
            className="px-8 py-4 bg-main hover:bg-yellow-600 border-none rounded-lg text-base font-medium text-bg cursor-pointer font-mono transition-colors"
          >
            next test
          </button>
        </div>

        {!session && (
          <p className="text-sub text-sm mt-8">
            login to save your scores to the leaderboard
          </p>
        )}

        <p className="text-sub/50 text-xs mt-12">
          press enter or click anywhere to continue
        </p>
      </div>
    </div>
  );
}
