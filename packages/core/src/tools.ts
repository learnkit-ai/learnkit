export const SUPPORTED_TOOLS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'Copilot',
  'Midjourney',
  'Notion AI',
  'Perplexity',
  'Gemini',
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
};

export function normalizeTool(tool: string): SupportedTool | null {
  const key = tool.toLowerCase().trim();
  return TOOL_ALIASES[key] ?? null;
}

export function getSupportedTools(): string[] {
  return [...SUPPORTED_TOOLS];
}
