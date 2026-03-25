import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-bold mb-6 animate-fade-in">
          Welcome to the Future 🚀
        </h1>
        <p className="text-2xl mb-10 text-gray-600 dark:text-gray-400">
          A beautiful multi-page SPA built with React Router + Tailwind
        </p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setCount(count + 1)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-semibold hover:scale-110 transition-all active:scale-95"
          >
            Click Me! ({count})
          </button>
          <a
            href="#about-section"
            className="px-8 py-4 border-2 border-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-xl font-semibold transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}