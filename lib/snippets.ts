import snippetsData from '@/data/snippets.json';

export type Language = 'typescript' | 'javascript' | 'python' | 'rust' | 'go' | 'java' | 'cpp';

export const languages: Language[] = ['typescript', 'javascript', 'python', 'rust', 'go', 'java', 'cpp'];

const snippets: Record<Language, string[]> = snippetsData as Record<Language, string[]>;

export function getRandomSnippet(language?: Language | 'all' | string): { code: string; language: Language } {
  // Determine which language to use
  let lang: Language;
  
  if (!language || language === 'all') {
    // Pick a random language
    lang = languages[Math.floor(Math.random() * languages.length)];
  } else if (languages.includes(language as Language)) {
    lang = language as Language;
  } else {
    // Fallback to random
    lang = languages[Math.floor(Math.random() * languages.length)];
  }
  
  const langSnippets = snippets[lang];
  if (!langSnippets || langSnippets.length === 0) {
    // Fallback
    return { code: 'const hello = "world";', language: 'typescript' };
  }
  
  const code = langSnippets[Math.floor(Math.random() * langSnippets.length)];
  
  return { code, language: lang };
}

export function getAllSnippets(): Record<Language, string[]> {
  return snippets;
}

export function getSnippetCount(): number {
  return Object.values(snippets).reduce((acc, arr) => acc + arr.length, 0);
}
