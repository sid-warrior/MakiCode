import Header from '@/components/Header';
import TypingTestContainer from '@/components/TypingTestContainer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <TypingTestContainer />
      </main>
    </div>
  );
}
