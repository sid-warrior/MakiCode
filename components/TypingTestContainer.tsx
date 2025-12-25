'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { useTypingStore } from '@/store/typingStore';
import { getRandomSnippet, Language } from '@/lib/snippets';
import TestConfig from './TestConfig';
import TypingTest from './TypingTest';
import ResultsModal from './ResultsModal';

export default function TypingTestContainer() {
  const { setSnippet, resetTest, language, isTestActive } = useTypingStore();
  const [snippetsCompleted, setSnippetsCompleted] = useState(0);
  const languageRef = useRef(language);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const loadSnippetForLanguage = useCallback((lang: Language | 'all') => {
    const snippet = getRandomSnippet(lang);
    setSnippet(snippet.code);
  }, [setSnippet]);

  useEffect(() => {
    loadSnippetForLanguage(language);
  }, [language, loadSnippetForLanguage]);

  const handleSnippetComplete = useCallback(() => {
    if (isTestActive) {
      setSnippetsCompleted(prev => prev + 1);
      // Load next snippet without resetting stats
      const snippet = getRandomSnippet(languageRef.current);
      const store = useTypingStore.getState();
      store.setSnippet(snippet.code);
    }
  }, [isTestActive]);

  const handleRestart = () => {
    setSnippetsCompleted(0);
    resetTest();
    loadSnippetForLanguage(languageRef.current);
  };

  const handleConfigChange = useCallback(() => {
    setSnippetsCompleted(0);
    resetTest();
  }, [resetTest]);

  const handleExit = () => {
    setSnippetsCompleted(0);
    loadSnippetForLanguage(languageRef.current);
  };

  return (
    <div className="w-full relative">
      <TestConfig onNewSnippet={handleConfigChange} />
      <TypingTest onSnippetComplete={handleSnippetComplete} onExit={handleExit} />
      <ResultsModal onRestart={handleRestart} snippetsCompleted={snippetsCompleted} />
    </div>
  );
}
