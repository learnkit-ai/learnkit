import { parseArgs } from 'node:util';
import { generateLearningPath, getSupportedRoles, getSupportedTools } from '@learnkit-ai/core';

const HELP = `
@learnkit-ai/cli - generate AI learning paths from the terminal

Usage:
  npx @learnkit-ai/cli generate [options]
  npx @learnkit-ai/cli roles
  npx @learnkit-ai/cli tools

Commands:
  generate          Generate a learning path and print it
  roles             List all supported roles
  tools             List all supported tools

Options for generate:
  --role            Learner role (required)  e.g. "Product Manager"
  --tools           Comma-separated tools    e.g. "Claude,Cursor"
  --goal            Learning goal (required) e.g. "ship a research agent"
  --level           beginner | intermediate | advanced  (default: beginner)
  --company-context Optional context string  e.g. "React team, ships weekly"
  --output          pretty | json            (default: pretty)
  -h, --help        Show this help

Examples:
  npx @learnkit-ai/cli generate --role "Product Manager" --tools "Claude,Cursor" --goal "ship an internal research agent"
  npx @learnkit-ai/cli generate --role "Software Engineer" --tools "Cursor" --goal "automate code review" --level advanced --output json
  npx @learnkit-ai/cli roles
`;

function fatal(msg: string): never {
  process.stderr.write(`error: ${msg}\n`);
  process.exit(1);
}

function prettyPrint(json: object): void {
  process.stdout.write(JSON.stringify(json, null, 2) + '\n');
}

function cmdGenerate(argv: string[]): void {
  const { values } = parseArgs({
    args: argv,
    options: {
      role: { type: 'string' },
      tools: { type: 'string' },
      goal: { type: 'string' },
      level: { type: 'string', default: 'beginner' },
      'company-context': { type: 'string' },
      output: { type: 'string', default: 'pretty' },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: false,
  });

  if (values.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }

  const role = typeof values.role === 'string' ? values.role : null;
  const goal = typeof values.goal === 'string' ? values.goal : null;
  const rawLevel = typeof values.level === 'string' ? values.level : 'beginner';
  const rawTools = typeof values.tools === 'string' ? values.tools : null;
  const rawCtx = typeof values['company-context'] === 'string' ? values['company-context'] : null;

  if (!role) fatal('--role is required');
  if (!goal) fatal('--goal is required');

  if (!['beginner', 'intermediate', 'advanced'].includes(rawLevel)) {
    fatal(`--level must be beginner, intermediate, or advanced (got: "${rawLevel}")`);
  }

  const toolList = rawTools
    ? rawTools.split(',').map((t) => t.trim()).filter(Boolean)
    : ['Claude'];

  const input = {
    role,
    tools: toolList,
    goal,
    level: rawLevel as 'beginner' | 'intermediate' | 'advanced',
    ...(rawCtx ? { companyContext: rawCtx } : {}),
  };

  let path;
  try {
    path = generateLearningPath(input);
  } catch (err) {
    fatal(err instanceof Error ? err.message : String(err));
  }

  const outputMode = values.output ?? 'pretty';

  if (outputMode === 'json') {
    process.stdout.write(JSON.stringify(path) + '\n');
    return;
  }

  // Pretty-print
  const hr = '─'.repeat(60);
  process.stdout.write(`\n  LearnKit AI - 30-day learning path\n`);
  process.stdout.write(`  Role: ${path.input.role}  ·  Level: ${path.input.level}  ·  ${path.totalMinutes} min total\n`);
  process.stdout.write(`  Goal: ${path.input.goal}\n`);
  if (path.input.companyContext) {
    process.stdout.write(`  Context: ${path.input.companyContext}\n`);
  }
  process.stdout.write(`\n`);

  for (const week of path.weeks) {
    process.stdout.write(`  ${hr}\n`);
    process.stdout.write(`  Week ${week.index} - ${week.title}\n`);
    process.stdout.write(`  ${hr}\n`);
    for (const lesson of week.lessons) {
      const kindTag = lesson.kind === 'project' ? '[PROJECT]' : lesson.kind === 'practicum' ? '[PRACTICUM]' : '[LESSON]';
      process.stdout.write(`\n  Day ${lesson.day}  ${kindTag}  ${lesson.minutes}m  (${lesson.tool})\n`);
      process.stdout.write(`  ${lesson.title}\n`);
      process.stdout.write(`  ${lesson.summary}\n`);
    }
    process.stdout.write(`\n`);
  }
}

function cmdRoles(): void {
  const roles = getSupportedRoles();
  process.stdout.write('\nSupported roles:\n');
  for (const r of roles) {
    process.stdout.write(`  • ${r}\n`);
  }
  process.stdout.write('\n');
}

function cmdTools(): void {
  const tools = getSupportedTools();
  process.stdout.write('\nSupported tools:\n');
  for (const t of tools) {
    process.stdout.write(`  • ${t}\n`);
  }
  process.stdout.write('\n');
}

function main(): void {
  const [, , cmd, ...rest] = process.argv;

  if (!cmd || cmd === '--help' || cmd === '-h') {
    process.stdout.write(HELP);
    process.exit(0);
  }

  switch (cmd) {
    case 'generate':
      cmdGenerate(rest);
      break;
    case 'roles':
      cmdRoles();
      break;
    case 'tools':
      cmdTools();
      break;
    default:
      fatal(`unknown command "${cmd}". Run --help for usage.`);
  }
}

main();
