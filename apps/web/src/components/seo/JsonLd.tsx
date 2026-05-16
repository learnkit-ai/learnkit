import { SITE_URL } from '@/lib/seo-data';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LearnKit AI',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: 'Open-source TypeScript engine and React component for embedding personalized, role-aware AI learning paths inside SaaS products.',
  sameAs: ['https://github.com/learnkit-ai/learnkit'],
} as const;

export const SOFTWARE_APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LearnKit AI',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  description:
    'Adaptive 30-day AI learning paths for Claude, Cursor, ChatGPT and 40+ tools. Project-based. Reviewed by the AI Guide.',
  offers: [
    { '@type': 'Offer', name: 'Learner', price: '24', priceCurrency: 'USD', category: 'subscription' },
    { '@type': 'Offer', name: 'Team', price: '18', priceCurrency: 'USD', category: 'subscription' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '240',
  },
} as const;

export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is LearnKit AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnKit AI is an open-source AI workbench and learning platform. It generates 30-day, role-aware learning paths for tools like Claude, Cursor, ChatGPT, Copilot, Midjourney and 40+ others. Users learn by building real projects at work, reviewed by the AI Guide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AI tools does LearnKit AI cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnKit covers 40+ tools including Claude (Anthropic), Cursor, ChatGPT (OpenAI), GitHub Copilot, Midjourney, Notion AI, Perplexity, and Google Gemini, with dedicated tracks for each.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is LearnKit AI open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. LearnKit AI is licensed under Apache-2.0. The TypeScript engine, React components, and SDKs are all open source. The repository is at github.com/learnkit-ai/learnkit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does LearnKit AI cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnKit AI has three plans: Learner ($24/month for individuals), Team ($18 per seat per month with SSO and SCIM), and API (usage-based pay-as-you-go for embedding LearnKit in your own product).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I embed LearnKit AI in my own product?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. LearnKit AI provides Apache-2.0 SDKs for JavaScript and TypeScript, plus a REST API. The <AIGuide /> React component embeds in three lines of code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is LearnKit AI different from a video course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LearnKit AI is project-based, not video-based. Every lesson ends with a real prompt, agent, or workflow you build in the workbench, which the AI Guide reviews. You graduate with a portfolio of shipped projects, not certificates of completion.',
      },
    },
  ],
} as const;
