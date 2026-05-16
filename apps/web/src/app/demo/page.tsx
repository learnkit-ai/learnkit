import type { Metadata } from 'next';
import { DemoFlow } from '@/components/demo/DemoFlow';

export const metadata: Metadata = {
  title: 'Build your path · LearnKit AI',
  description:
    'A 90-second demo: tell the AI Guide your role, your stack, and your goal. Get a 30-day path you can ship.',
};

export default function DemoPage() {
  return <DemoFlow />;
}
