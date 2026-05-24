export const SUPPORTED_TOOLS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'Copilot',
  'Midjourney',
  'Notion AI',
  'Perplexity',
  'Gemini',
  'Windsurf',
  'Replit',
  'Linear',
  'Figma AI',
  'v0',
] as const;

export type SupportedTool = (typeof SUPPORTED_TOOLS)[number];

const TOOL_ALIASES: Record<string, SupportedTool> = {
  claude: 'Claude',
  anthropic: 'Claude',
  chatgpt: 'ChatGPT',
  openai: 'ChatGPT',
  gpt: 'ChatGPT',
  cursor: 'Cursor',
  copilot: 'Copilot',
  'github copilot': 'Copilot',
  midjourney: 'Midjourney',
  mj: 'Midjourney',
  notion: 'Notion AI',
  'notion ai': 'Notion AI',
  perplexity: 'Perplexity',
  pplx: 'Perplexity',
  gemini: 'Gemini',
  google: 'Gemini',
  bard: 'Gemini',
  windsurf: 'Windsurf',
  codeium: 'Windsurf',
  replit: 'Replit',
  linear: 'Linear',
  'figma ai': 'Figma AI',
  figma: 'Figma AI',
  v0: 'v0',
  'vercel v0': 'v0',
};

export function normalizeTool(tool: string): SupportedTool | null {
  const key = tool.toLowerCase().trim();
  return TOOL_ALIASES[key] ?? null;
}

export function getSupportedTools(): string[] {
  return [...SUPPORTED_TOOLS];
}
