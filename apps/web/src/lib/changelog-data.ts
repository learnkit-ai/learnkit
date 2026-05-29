export type ChangeKind = 'Added' | 'Changed' | 'Fixed' | 'Removed';

export interface ChangeEntry {
  kind: ChangeKind;
  text: string;
}

export interface ChangelogVersion {
  version: string;
  date: string | null;
  entries: ChangeEntry[];
}

export const CHANGELOG: ChangelogVersion[] = [
  {
    version: 'Unreleased',
    date: null,
    entries: [
      { kind: 'Added', text: 'Level picker (Beginner / Intermediate / Advanced) in the /demo flow - wired to generateLearningPath() to adjust lesson pacing' },
      { kind: 'Added', text: 'Optional company context textarea in /demo - passes companyContext to the engine to personalise project lesson summaries' },
      { kind: 'Added', text: 'Role-specific 4-week curricula for Marketer, Founder, Operations, and Researcher - all 8 supported roles now have custom content' },
      { kind: 'Added', text: 'ROADMAP.md - v0 done, v1 planned, v2 exploratory, explicit no-go list' },
      { kind: 'Added', text: '4 new blog posts: CSS theming deep-dive, role curriculum design decisions, companyContext field explainer, and SaaS embedding guide' },
      { kind: 'Added', text: 'Mobile hamburger nav - slide-down menu with all nav links, accessible and keyboard-friendly' },
      { kind: 'Added', text: '/changelog page - this page, derived from CHANGELOG.md' },
      { kind: 'Added', text: '@learnkit-ai/cli - npx @learnkit-ai/cli generate outputs a JSON or pretty-printed learning path with zero setup' },
      { kind: 'Changed', text: 'companyContext field now used in project lesson summaries - parsed for stack, pace, and team-size signals' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-05-12',
    entries: [
      { kind: 'Added', text: 'Custom 404 page - branded design with Nav, serif headline, and three CTA links' },
      { kind: 'Added', text: 'OG image - updated headline "Personalized AI paths for every role" and OSS-aligned description' },
      { kind: 'Added', text: 'Example page metadata via layout.tsx (page itself stays \'use client\')' },
      { kind: 'Fixed', text: 'Footer dead links - all href="#" replaced with real GitHub URLs (SECURITY.md, LICENSE, CONTRIBUTING.md)' },
      { kind: 'Fixed', text: '"Docs" footer link corrected to /docs (was pointing to /developers)' },
      { kind: 'Changed', text: 'Footer brand tagline updated to OSS messaging: "Open-source TypeScript engine for embedding personalized AI learning paths"' },
      { kind: 'Added', text: 'CodeBlock copy button - wired with navigator.clipboard.writeText; shows "copied!" with green colour for 1.8s' },
      { kind: 'Added', text: '/teams page - OSS-framed guide for embedding LearnKit AI across an org' },
      { kind: 'Added', text: '/docs page - full API reference with sticky sidebar and IntersectionObserver-based active-section highlighting' },
      { kind: 'Added', text: 'DocsSidebar client component with IntersectionObserver-based active section tracking' },
      { kind: 'Added', text: '6 blog posts across Pedagogy, Engineering, and Launches categories' },
      { kind: 'Added', text: 'tsup build for all packages - ESM + CJS + .d.ts output with "source" custom export condition' },
      { kind: 'Added', text: '21 React component tests - LearningPath, LessonCard, AIGuide, useLearnKit() using @testing-library/react + happy-dom' },
      { kind: 'Added', text: 'Per-role lesson curricula for Software Engineer, Product Manager, Designer, and Data Analyst' },
      { kind: 'Added', text: 'vitest.config.ts with resolve.alias in core and react packages - resolves workspace deps to TypeScript source without pre-build' },
      { kind: 'Changed', text: '/developers page - rewrote to show the real package API surface instead of fabricated REST endpoints' },
      { kind: 'Changed', text: 'UseItYourWay section - replaced pricing cards with OSS install/embed/self-host options' },
      { kind: 'Changed', text: 'Proof section - replaced fake testimonials with real OSS facts' },
      { kind: 'Fixed', text: 'getSupportedRoles() comment in docs now shows the actual return value' },
      { kind: 'Fixed', text: 'next-env.d.ts added to .gitignore' },
    ],
  },
  {
    version: '0.0.1',
    date: '2026-05-01',
    entries: [
      { kind: 'Added', text: 'packages/schemas - @learnkit-ai/schemas: Zod schemas and inferred TypeScript types' },
      { kind: 'Added', text: 'packages/core - @learnkit-ai/core: generateLearningPath(), getSupportedRoles(), getSupportedTools(), isRoleSupported()' },
      { kind: 'Added', text: 'packages/react - @learnkit-ai/react: <LearningPath />, <LessonCard />, <AIGuide />, useLearnKit()' },
      { kind: 'Added', text: 'apps/web - Next.js 15 App Router landing page, /demo, /docs, /roles, /tools, /blog, /example, /developers' },
      { kind: 'Added', text: 'examples/nextjs-basic - standalone Next.js integration example' },
      { kind: 'Added', text: 'GitHub Actions CI - install, lint, typecheck, test, build pipeline' },
      { kind: 'Added', text: '.agent/ - Agent Anatomy universal config with rules, commands, agents, tasks' },
      { kind: 'Added', text: 'Apache-2.0 license, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md' },
    ],
  },
];

export const KIND_COLORS: Record<ChangeKind, { bg: string; color: string }> = {
  Added: { bg: 'rgba(107,143,110,0.12)', color: '#3D7A41' },
  Changed: { bg: 'rgba(91,115,196,0.12)', color: '#3B5BBD' },
  Fixed: { bg: 'rgba(200,71,42,0.10)', color: '#C8472A' },
  Removed: { bg: 'rgba(120,80,80,0.12)', color: '#7A3535' },
};
