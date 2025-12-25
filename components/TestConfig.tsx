'use client';

import { useState } from 'react';
import { useTypingStore } from '@/store/typingStore';
import { languages, Language } from '@/lib/snippets';

interface TestConfigProps {
  onNewSnippet: () => void;
}

const presetDurations = [15, 30, 60, 120];

export default function TestConfig({ onNewSnippet }: TestConfigProps) {
  const { duration, language, setDuration, setLanguage, isTestActive, resetTest } = useTypingStore();
  const [showCustom, setShowCustom] = useState(false);
  const [customTime, setCustomTime] = useState('');

  if (isTestActive) return null;

  const handleDurationChange = (d: number) => {
    setDuration(d);
    resetTest();
    setShowCustom(false);
  };

  const handleCustomSubmit = () => {
    let time = parseInt(customTime);
    if (isNaN(time) || time < 5) time = 5;
    if (time > 300) time = 300;
    setDuration(time);
    resetTest();
    setShowCustom(false);
    setCustomTime('');
  };

  const handleLanguageChange = (lang: Language | 'all') => {
    setLanguage(lang);
    onNewSnippet();
  };

  const isPreset = presetDurations.includes(duration);

  return (
    <div className="flex items-center justify-center gap-6 mb-10 font-mono text-sm flex-wrap">
      {/* Duration buttons */}
      <div className="flex gap-2 items-center">
        {presetDurations.map((d) => (
          <button
            key={d}
            onClick={() => handleDurationChange(d)}
            className={`px-4 py-2.5 rounded-lg border-none cursor-pointer font-mono text-sm transition-colors
              ${duration === d ? 'bg-bg-sub text-main' : 'bg-transparent text-sub hover:text-text hover:bg-bg-sub/50'}`}
          >
            {d}s
          </button>
        ))}
        
        {showCustom ? (
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              placeholder="sec"
              min={5}
              max={300}
              className="w-16 px-3 py-2.5 bg-bg-sub border border-border rounded-lg text-text font-mono text-sm text-center"
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              autoFocus
            />
            <button
              onClick={handleCustomSubmit}
              className="px-3.5 py-2.5 bg-main hover:bg-yellow-600 border-none rounded-lg cursor-pointer text-bg font-mono text-sm transition-colors"
            >
              ✓
            </button>
            <button
              onClick={() => setShowCustom(false)}
              className="px-3.5 py-2.5 bg-transparent hover:bg-bg-sub border-none rounded-lg cursor-pointer text-sub hover:text-text font-mono text-sm transition-colors"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCustom(true)}
            className={`px-4 py-2.5 rounded-lg border-none cursor-pointer font-mono text-sm transition-colors
              ${!isPreset ? 'bg-bg-sub text-main' : 'bg-transparent text-sub hover:text-text hover:bg-bg-sub/50'}`}
          >
            {!isPreset ? `${duration}s` : 'custom'}
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="w-0.5 h-7 bg-border rounded-sm" />

      {/* Language dropdown */}
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as Language | 'all')}
        className={`px-4 py-2.5 bg-bg-sub border border-border rounded-lg font-mono text-sm cursor-pointer
          ${language === 'all' ? 'text-sub' : 'text-main'}`}
      >
        <option value="all" className="bg-bg-sub text-sub">all languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang} className="bg-bg-sub text-text">
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
