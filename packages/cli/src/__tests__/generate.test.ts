import { describe, expect, it } from 'vitest';
import { generateLearningPath, getSupportedRoles, getSupportedTools } from '@learnkit-ai/core';

describe('CLI integration - generateLearningPath', () => {
  it('generates a valid path for all supported roles', () => {
    const roles = getSupportedRoles();
    const tools = getSupportedTools();
    for (const role of roles) {
      const path = generateLearningPath({
        role,
        tools: [tools[0]!],
        goal: 'ship something useful',
        level: 'beginner',
      });
      expect(path.weeks).toHaveLength(4);
      expect(path.totalMinutes).toBeGreaterThan(0);
    }
  });

  it('outputs valid JSON-serialisable structure', () => {
    const path = generateLearningPath({
      role: 'Software Engineer',
      tools: ['Claude', 'Cursor'],
      goal: 'ship a research agent',
      level: 'intermediate',
      companyContext: 'TypeScript/React team, ships weekly',
    });
    expect(() => JSON.stringify(path)).not.toThrow();
    const parsed = JSON.parse(JSON.stringify(path)) as typeof path;
    expect(parsed.id).toBe(path.id);
  });

  it('company context appears in project lesson summaries', () => {
    const path = generateLearningPath({
      role: 'Product Manager',
      tools: ['Claude'],
      goal: 'improve discovery process',
      level: 'beginner',
      companyContext: 'Python stack, 15-person team',
    });
    const projects = path.weeks.flatMap((w) => w.lessons.filter((l) => l.kind === 'project'));
    const combined = projects.map((p) => p.summary).join(' ');
    expect(combined).toMatch(/python|15-person/i);
  });
});
