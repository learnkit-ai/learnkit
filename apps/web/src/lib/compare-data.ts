export const SITE_URL = 'https://learnkit-ai.com';

export interface ComparePoint {
  dimension: string;
  a: string;
  b: string;
}

export interface ComparisonPage {
  slug: string;
  toolA: string;
  toolB: string;
  role: string;
  tagline: string;
  intro: string;
  verdict: string;
  points: ComparePoint[];
  keywords: string[];
}

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: 'claude-vs-chatgpt-for-engineers',
    toolA: 'Claude',
    toolB: 'ChatGPT',
    role: 'Software Engineer',
    tagline: 'Claude vs ChatGPT for Software Engineers',
    intro:
      'Both Claude and ChatGPT can write, review, and explain code — but they make different trade-offs that matter when you are shipping production software. This comparison covers the dimensions engineers actually care about.',
    verdict:
      'Claude tends to be stronger for large-codebase reasoning, structured output, and following constrained system prompts without drift. ChatGPT wins on ecosystem breadth, Code Interpreter for exploratory data work, and the GPT Store for pre-built task-specific models. Most senior engineers use both with purpose-built prompts rather than picking one.',
    points: [
      {
        dimension: 'Long-context code review',
        a: 'Handles large files and multi-file diffs well. Consistent instruction-following across long contexts.',
        b: 'Strong on shorter diffs. Can lose instruction fidelity in very long contexts.',
      },
      {
        dimension: 'Structured JSON output',
        a: 'Highly reliable with explicit schema instructions. Rarely invents fields or omits required keys.',
        b: 'Reliable with the JSON mode API. Verbose system prompts needed for complex schemas.',
      },
      {
        dimension: 'Exploratory data analysis',
        a: 'No native code execution. Must paste results back in.',
        b: 'Code Interpreter runs Python directly and returns charts and computed values in the same turn.',
      },
      {
        dimension: 'Tool use / function calling',
        a: 'Excellent. Clear tool-use reasoning with low hallucination on tool arguments.',
        b: 'Excellent. Well-tested in production with a large ecosystem of integrations.',
      },
      {
        dimension: 'System prompt adherence',
        a: 'Very strong. Hard constraints in the system prompt are almost always respected across a session.',
        b: 'Good but can soften constraints in long conversations. Requires more explicit re-anchoring.',
      },
    ],
    keywords: [
      'claude vs chatgpt for engineers',
      'claude vs chatgpt coding',
      'best ai for software engineers',
      'claude chatgpt comparison code',
    ],
  },
  {
    slug: 'cursor-vs-copilot-for-engineers',
    toolA: 'Cursor',
    toolB: 'Copilot',
    role: 'Software Engineer',
    tagline: 'Cursor vs GitHub Copilot for Software Engineers',
    intro:
      'Cursor and GitHub Copilot both put AI inside your editor — but they are built on different premises about what AI-assisted development looks like. Copilot optimizes for autocomplete flow; Cursor optimizes for multi-file reasoning and agent-driven edits.',
    verdict:
      'Cursor is the stronger choice for engineers who want to hand off multi-file tasks, run agents, and iterate on the codebase as a whole. Copilot is better embedded in GitHub workflows, has lower friction for teams that standardize on VSCode, and its Chat and PR Review features integrate directly with your GitHub Actions and pull request cycle.',
    points: [
      {
        dimension: 'Autocomplete quality',
        a: 'Tab completion powered by the same underlying models, with full codebase context. Fast and context-aware.',
        b: 'Industry-leading autocomplete trained on GitHub\'s corpus. Very accurate for common patterns.',
      },
      {
        dimension: 'Multi-file edits',
        a: 'Composer can plan and execute changes across multiple files in a single session with explicit diff review.',
        b: 'Copilot Edits supports multi-file changes but is more conservative in scope.',
      },
      {
        dimension: 'Codebase indexing',
        a: 'Full repo index available to all prompts. Ask about any file without opening it.',
        b: 'Workspace context in Chat. Requires @workspace prefix to pull in broader context.',
      },
      {
        dimension: 'GitHub integration',
        a: 'No native GitHub integration. Stays in the editor.',
        b: 'PR review, Copilot Workspace for issues-to-PRs, and Actions integration built in.',
      },
      {
        dimension: 'Agent mode',
        a: 'Cursor Agent can run terminal commands, search the web, and iterate without returning control to you.',
        b: 'Copilot agent is maturing. Best for smaller, well-scoped tasks.',
      },
    ],
    keywords: [
      'cursor vs copilot',
      'cursor vs github copilot',
      'best ai code editor',
      'cursor copilot comparison',
    ],
  },
  {
    slug: 'claude-vs-gemini-for-analysts',
    toolA: 'Claude',
    toolB: 'Gemini',
    role: 'Data Analyst',
    tagline: 'Claude vs Gemini for Data Analysts',
    intro:
      'Data analysts need AI that handles long documents, reasons carefully about numbers, and integrates with the tools you already use. Claude and Gemini take different approaches to each of these.',
    verdict:
      'Claude is stronger for careful, citation-honest analysis of long documents and complex datasets pasted into the context. Gemini wins on Google Workspace integration — if your org runs on Sheets, Docs, and BigQuery, Gemini in Workspace is already embedded in your workflow. For standalone analysis work, Claude\'s document reasoning is more reliable.',
    points: [
      {
        dimension: 'Long-document analysis',
        a: 'Excellent. Can handle large PDFs and multi-document analysis with consistent extraction.',
        b: 'Strong long context (up to 1M tokens). Best for very large corpora where the full document must be in context.',
      },
      {
        dimension: 'Google Workspace integration',
        a: 'No native integration. Must copy content into Claude.',
        b: 'Native in Docs, Sheets, Gmail, and BigQuery. Runs without leaving your tools.',
      },
      {
        dimension: 'Numeric reasoning',
        a: 'Conservative and accurate. Flags uncertainty instead of inventing numbers.',
        b: 'Good but occasionally more confident than warranted. Verify calculated outputs.',
      },
      {
        dimension: 'SQL and data pipelines',
        a: 'Strong SQL generation with good schema awareness. Pairs well with pasted schema definitions.',
        b: 'Strong SQL, with a specific advantage in BigQuery syntax via direct Workspace integration.',
      },
      {
        dimension: 'Hallucination rate on facts',
        a: 'Lower than average. Prefers to say "I don\'t know" over inventing a citation.',
        b: 'Good with Google Search grounding enabled. Without grounding, factual errors are possible.',
      },
    ],
    keywords: [
      'claude vs gemini for data analysts',
      'claude vs gemini comparison',
      'best ai for data analysis',
      'gemini claude analyst',
    ],
  },
  {
    slug: 'claude-vs-chatgpt-for-marketers',
    toolA: 'Claude',
    toolB: 'ChatGPT',
    role: 'Marketer',
    tagline: 'Claude vs ChatGPT for Marketers',
    intro:
      'Marketers need AI that writes in a consistent brand voice, handles long briefs, and produces content that does not read like every other AI-generated campaign. Claude and ChatGPT make different bets on how to get there.',
    verdict:
      'Claude is stronger for brand voice consistency and long-form content that follows tight editorial constraints. ChatGPT wins on DALL-E image generation, the GPT Store for specialist marketing workflows, and Browsing for real-time research. Most marketing teams use both: Claude for writing inside guardrails, ChatGPT for ideation, image generation, and research.',
    points: [
      {
        dimension: 'Brand voice consistency',
        a: 'Excellent at internalising style guides and maintaining them across long documents.',
        b: 'Good but requires more frequent re-anchoring in long sessions.',
      },
      {
        dimension: 'Email and ad copy',
        a: 'Strong. Very good at following character limits, tone, and CTA constraints without reminders.',
        b: 'Strong. Wide training on marketing formats. GPT Store has specialist marketing GPTs.',
      },
      {
        dimension: 'Real-time research',
        a: 'No native browsing. Best with pasted content.',
        b: 'Browsing via ChatGPT Plus. Good for competitive research and news synthesis.',
      },
      {
        dimension: 'Image generation',
        a: 'No image generation.',
        b: 'DALL-E 3 integrated. Good for campaign concept images and social assets.',
      },
      {
        dimension: 'Content repurposing at scale',
        a: 'Very strong at following a repurposing template consistently across many assets.',
        b: 'Strong, with the advantage of custom GPTs for repeatable repurposing workflows.',
      },
    ],
    keywords: [
      'claude vs chatgpt for marketing',
      'best ai for marketers',
      'claude chatgpt marketing comparison',
      'ai content marketing tools',
    ],
  },
  {
    slug: 'windsurf-vs-cursor-for-engineers',
    toolA: 'Windsurf',
    toolB: 'Cursor',
    role: 'Software Engineer',
    tagline: 'Windsurf vs Cursor for Software Engineers',
    intro:
      'Both Windsurf and Cursor are AI-first IDEs built on VS Code\'s foundation — but they have different philosophies. Windsurf\'s Cascade model is trained for multi-step autonomous reasoning; Cursor\'s strength is in the explicitness of Composer and deep codebase indexing.',
    verdict:
      'Windsurf\'s Cascade is more autonomous and better at planning multi-step changes without hand-holding. Cursor gives you more control over every step — better for engineers who want to review before applying. The best choice comes down to your trust level: high-trust autonomous agent or explicit pair-programmer. Most teams that switch from Copilot land on Cursor for familiarity, then graduate some engineers to Windsurf for larger refactors.',
    points: [
      {
        dimension: 'Autonomous task completion',
        a: 'Cascade can plan and execute complex multi-step changes with less back-and-forth.',
        b: 'Composer is strong but requires more explicit direction at each step.',
      },
      {
        dimension: 'Codebase understanding',
        a: 'Deep repo indexing. Cascade can reference any file without being told.',
        b: 'Full repo index. Similar depth with slightly different chunking strategy.',
      },
      {
        dimension: 'Diff review and control',
        a: 'Diffs are shown but Cascade may apply multiple changes in one pass.',
        b: 'Each change is staged for review before applying. More explicit control.',
      },
      {
        dimension: 'Ecosystem and plugins',
        a: 'Newer ecosystem. Most VS Code extensions work but some edge cases exist.',
        b: 'Larger extension compatibility and user community.',
      },
      {
        dimension: 'Pricing',
        a: 'Free tier available. Pro plan comparable to Cursor.',
        b: 'Free tier available. Pro plan comparable to Windsurf.',
      },
    ],
    keywords: [
      'windsurf vs cursor',
      'windsurf cursor comparison',
      'best ai ide 2025',
      'windsurf cascade vs cursor composer',
    ],
  },
];
