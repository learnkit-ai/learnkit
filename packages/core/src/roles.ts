export const SUPPORTED_ROLES = [
  'Product Manager',
  'Software Engineer',
  'Designer',
  'Data Analyst',
  'Marketer',
  'Founder',
  'Operations',
  'Researcher',
] as const;

export type SupportedRole = (typeof SUPPORTED_ROLES)[number];

const ROLE_ALIASES: Record<string, SupportedRole> = {
  pm: 'Product Manager',
  'product manager': 'Product Manager',
  'product-manager': 'Product Manager',
  swe: 'Software Engineer',
  engineer: 'Software Engineer',
  'software engineer': 'Software Engineer',
  'software-engineer': 'Software Engineer',
  developer: 'Software Engineer',
  designer: 'Designer',
  ux: 'Designer',
  analyst: 'Data Analyst',
  'data analyst': 'Data Analyst',
  'data-analyst': 'Data Analyst',
  marketer: 'Marketer',
  marketing: 'Marketer',
  founder: 'Founder',
  ceo: 'Founder',
  ops: 'Operations',
  operations: 'Operations',
  researcher: 'Researcher',
  research: 'Researcher',
};

export function normalizeRole(role: string): SupportedRole {
  const key = role.toLowerCase().trim();
  return ROLE_ALIASES[key] ?? 'Software Engineer';
}

export function getSupportedRoles(): string[] {
  return [...SUPPORTED_ROLES];
}

export function isRoleSupported(role: string): boolean {
  return role.toLowerCase().trim() in ROLE_ALIASES;
}
