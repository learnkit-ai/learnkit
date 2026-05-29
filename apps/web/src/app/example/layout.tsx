import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live example · LearnKit AI',
  description:
    'See <LearningPath /> render a real AI learning path in your browser - no backend, no LLM, fully deterministic.',
};

export default function ExampleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
