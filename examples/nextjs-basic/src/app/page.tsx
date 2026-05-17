import { AIGuide, LearningPath } from '@learnkit-ai/react';

export default function Home() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto' }}>
      <h1 style={{ fontSize: 36, letterSpacing: '-0.02em', marginBottom: 12 }}>
        Hello, LearnKit AI
      </h1>
      <p style={{ color: '#4A557A', marginBottom: 24, lineHeight: 1.5 }}>
        This is the minimal Next.js example. Three imports, one input, a full 30-day path.
      </p>

      <div style={{ marginBottom: 32 }}>
        <AIGuide
          message="Try changing the role, tools, or goal in src/app/page.tsx — the path updates on save."
        />
      </div>

      <LearningPath
        input={{
          role: 'Product Manager',
          tools: ['Claude', 'Cursor'],
          goal: 'Ship an internal research agent for my team',
          level: 'beginner',
        }}
        theme="warm"
      />
    </main>
  );
}
