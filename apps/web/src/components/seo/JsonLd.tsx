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
    'Open-source adaptive 30-day AI learning paths for Claude, Cursor, ChatGPT and 40+ tools. Project-based. Reviewed by the AI Guide.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: 'Free and open source under Apache-2.0.',
  },
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  codeRepository: 'https://github.com/learnkit-ai/learnkit',
  isAccessibleForFree: true,
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
        text: 'LearnKit AI is free and open source under Apache-2.0. There is no paid tier, no usage fee, and no commercial restriction. Install the packages from npm, self-host the marketing site, or embed the React components in your own product — all without paying anyone.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I embed LearnKit AI in my own product?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Apache-2.0 license permits commercial use, modification, and distribution. The <AIGuide /> React component embeds in three lines of code. No attribution required beyond keeping the license file.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I self-host LearnKit AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clone the repo, run pnpm install and pnpm dev. The marketing site is a Next.js 15 App Router app — deploy it to Vercel, Netlify, Cloudflare Pages, or any Node host. The packages can be consumed from npm or installed directly from the workspace.',
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
