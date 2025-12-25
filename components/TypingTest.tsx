'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTypingStore } from '@/store/typingStore';

interface TypingTestProps {
  onSnippetComplete: () => void;
  onExit: () => void;
}

export default function TypingTest({ onSnippetComplete, onExit }: TypingTestProps) {
  const {
    currentSnippet,
    userInput,
    isTestActive,
    isTestComplete,
    isPaused,
    timeRemaining,
    updateInput,
    tick,
    startTest,
    pauseTest,
    resumeTest,
    resetTest,
  } = useTypingStore();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isTestActive && !isPaused && timeRemaining > 0) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [isTestActive, isPaused, timeRemaining, tick]);

  useEffect(() => {
    if (isTestActive && !isPaused && userInput.length === currentSnippet.length && currentSnippet.length > 0) {
      onSnippetComplete();
    }
  }, [userInput, currentSnippet, isTestActive, isPaused, onSnippetComplete]);

  const focusInput = useCallback(() => {
    if (!isPaused) inputRef.current?.focus();
  }, [isPaused]);

  useEffect(() => {
    focusInput();
  }, [focusInput, currentSnippet, isPaused]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTestActive) {
        resetTest();
        onExit();
      }
      if (e.key === ' ' && isPaused) {
        e.preventDefault();
        resumeTest();
        focusInput();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isTestActive, isPaused, resetTest, resumeTest, onExit, focusInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isTestComplete || isPaused) return;
    if (!isTestActive) startTest();

    if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = userInput + '\n';
      if (newValue.length <= currentSnippet.length) updateInput(newValue);
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = userInput + '    ';
      if (newValue.length <= currentSnippet.length) updateInput(newValue);
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (userInput.length > 0) updateInput(userInput.slice(0, -1));
      return;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isTestComplete || isPaused) return;
    if (!isTestActive) startTest();
    const newValue = e.target.value;
    if (newValue.length <= currentSnippet.length) updateInput(newValue);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-10 font-mono">
      {/* Timer and Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className={`text-6xl ${isPaused ? 'text-sub' : 'text-main'}`}>
          {timeRemaining}
        </div>

        {isTestActive && (
          <div className="flex gap-3">
            <button
              onClick={() => isPaused ? (resumeTest(), focusInput()) : pauseTest()}
              className="px-6 py-3 bg-bg-sub hover:bg-border border border-border rounded-lg text-sm text-text hover:text-main cursor-pointer font-mono transition-colors"
            >
              {isPaused ? '▶ resume' : '⏸ pause'}
            </button>
            <button
              onClick={() => { resetTest(); onExit(); }}
              className="px-6 py-3 bg-transparent hover:bg-red-900/30 border border-border rounded-lg text-sm text-sub hover:text-error cursor-pointer font-mono transition-colors"
            >
              ✕ exit
            </button>
          </div>
        )}
      </div>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-bg/95 flex items-center justify-center z-50 font-mono">
          <div className="text-center">
            <p className="text-5xl text-main mb-6">⏸ paused</p>
            <p className="text-sub text-base mb-8">
              time remaining: {timeRemaining}s
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { resumeTest(); focusInput(); }}
                className="px-8 py-3.5 bg-main hover:bg-yellow-600 border-none rounded-lg text-base font-medium text-bg cursor-pointer font-mono transition-colors"
              >
                ▶ resume
              </button>
              <button
                onClick={() => { resetTest(); onExit(); }}
                className="px-8 py-3.5 bg-transparent hover:bg-bg-sub border border-border rounded-lg text-base text-sub hover:text-text cursor-pointer font-mono transition-colors"
              >
                ✕ exit test
              </button>
            </div>
            <p className="text-sub/50 text-xs mt-8">
              press space to resume • esc to exit
            </p>
          </div>
        </div>
      )}

      {/* Code Box */}
      <div
        onClick={focusInput}
        className="bg-bg-sub rounded-xl p-8 min-h-[300px] cursor-text border border-border relative"
      >
        <pre className="font-mono text-base leading-loose m-0 whitespace-pre-wrap break-words">
          {currentSnippet.split('').map((char, i) => {
            const isTyped = i < userInput.length;
            const isCorrect = isTyped && userInput[i] === char;
            const isIncorrect = isTyped && userInput[i] !== char;
            const isCurrent = i === userInput.length;
            
            let colorClass = 'text-sub/70';
            if (isCorrect) colorClass = 'text-text';
            if (isIncorrect) colorClass = 'text-error';
            
            return (
              <span key={i} className={`${colorClass} ${isCurrent && !isPaused ? 'caret' : ''}`}>
                {char}
              </span>
            );
          })}
        </pre>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isTestComplete || isPaused}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="absolute top-0 left-0 w-full h-full opacity-0 resize-none cursor-text"
        />
      </div>

      {!isTestActive && !isTestComplete && (
        <p className="text-center mt-6 text-sm text-sub font-mono">
          click and start typing • esc to exit • pause anytime
        </p>
      )}
    </div>
  );
}
