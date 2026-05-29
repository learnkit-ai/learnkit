import {
  LessonContentSchema,
  LessonSchema,
  type Exercise,
  type Lesson,
  type LessonContent,
  type RubricItem,
} from '@learnkit-ai/schemas';

function buildBody(lesson: Lesson): string {
  const { title, summary, tool, kind, minutes } = lesson;

  if (kind === 'practicum') {
    return (
      `${summary}\n\n` +
      `This practicum is evaluated on the depth and honesty of your portfolio. ` +
      `Submit three artifacts that show a complete workflow - from initial prompt to final output - along with your own commentary on what worked, what you edited, and why. ` +
      `The goal is not a polished showcase but an accurate record of how you think with ${tool}.`
    );
  }

  if (kind === 'project') {
    return (
      `${summary}\n\n` +
      `Deliver a working output by the end of the week. Scope it so it is shareable - something a colleague could pick up and use without your explanation. ` +
      `Document the prompt that produced it, the edits you made, and the one thing you would change with more time. ` +
      `Projects in this curriculum are designed to take approximately ${minutes} minutes including iteration.`
    );
  }

  return (
    `${summary}\n\n` +
    `Work through this lesson by trying each step yourself before reading ahead. ` +
    `The lesson is scoped to ${minutes} minutes including hands-on practice with ${tool}. ` +
    `By the end you should be able to ${title.slice(0, 1).toLowerCase()}${title.slice(1)} in your own context, ` +
    `without referring back to these notes.`
  );
}

function buildExercises(lesson: Lesson): Exercise[] {
  const { tool, kind, title } = lesson;

  if (kind === 'practicum') {
    return [
      {
        prompt: `Draft an outline of the three portfolio artifacts you will submit. For each, describe the workflow it demonstrates, the tool used, and how you will evaluate its quality.`,
        expectedOutput: `A structured list of three artifacts, each with: title, tool, workflow description, and at least one measurable success criterion.`,
        rubricHint: `Each artifact should target a distinct skill from the course - overlapping coverage is a sign the scope is too narrow.`,
      },
      {
        prompt: `Write the commentary for your strongest artifact. Explain what you prompted, what the model returned, and what edits you made - and why.`,
        expectedOutput: `A 200–400 word annotation covering: initial prompt, model output, edits made, and a reflection on the gap between the first draft and the final output.`,
        rubricHint: `Strong commentary explains decisions, not just actions. "I changed X because Y" beats "I edited the output."`,
      },
    ];
  }

  if (kind === 'project') {
    return [
      {
        prompt: `Before starting the project, write a one-paragraph brief: what you are building, who it is for, and how you will know it is done.`,
        expectedOutput: `A project brief with: goal statement, intended audience, at least two success criteria, and a rough delivery timeline.`,
        rubricHint: `Success criteria should be specific enough to evaluate objectively - "it works" does not count.`,
      },
      {
        prompt: `After completing the project, write a 3-bullet retrospective: what worked, what you would do differently, and what you learned about using ${tool} for this type of task.`,
        expectedOutput: `Three concise bullet points covering retrospective observations. Each should reference a specific prompt decision or output - avoid vague statements like "it was useful."`,
        rubricHint: `Retrospectives that reference specific prompt decisions are stronger than general reflections.`,
      },
    ];
  }

  return [
    {
      prompt: `Apply the technique from "${title}" to a real task from your own work. Document the prompt you used and the output you got.`,
      expectedOutput: `A before/after record: the task description, the ${tool} prompt you wrote, the output you received, and a one-sentence verdict on whether it met your standard.`,
      rubricHint: `Use a real task, not a fabricated one - specificity makes the exercise useful to you and reviewable by others.`,
    },
    {
      prompt: `Identify one way the technique from this lesson could fail in your context. Write a prompt that deliberately tries to trigger that failure, then write a revised prompt that prevents it.`,
      expectedOutput: `A failure-mode description, a prompt that demonstrates it, the problematic output, a revised prompt, and the improved output.`,
      rubricHint: `Understanding failure modes is more transferable than demonstrating success - a reviewer can tell whether you actually tried to break it.`,
    },
  ];
}

function buildRubric(lesson: Lesson): RubricItem[] {
  const { kind, tool } = lesson;

  if (kind === 'practicum') {
    return [
      {
        criterion: 'Portfolio depth',
        excellent: `Three artifacts each demonstrate a distinct, non-trivial skill with full prompt-to-output documentation and honest commentary.`,
        acceptable: `Three artifacts are present but overlap in skill area, or lack full documentation of the prompt design.`,
        needsWork: `Fewer than three artifacts, or artifacts that are superficial demonstrations without evidence of real application.`,
      },
      {
        criterion: 'Reflection quality',
        excellent: `Commentary explains specific prompt decisions and their trade-offs, referencing techniques from the course.`,
        acceptable: `Commentary describes what was done but does not explain why decisions were made.`,
        needsWork: `Commentary is absent, purely descriptive, or limited to "it worked well."`,
      },
    ];
  }

  if (kind === 'project') {
    return [
      {
        criterion: 'Deliverable quality',
        excellent: `A real, shareable artifact that solves the stated problem and could be used by the intended audience immediately.`,
        acceptable: `A draft artifact that addresses the problem but requires significant editing before use.`,
        needsWork: `An incomplete artifact, or one that does not address the stated problem.`,
      },
      {
        criterion: 'Prompt design',
        excellent: `The prompt is structured, documented, and repeatable - someone else could run it and get consistent results.`,
        acceptable: `The prompt works but is not documented or is difficult to reproduce.`,
        needsWork: `Output was edited heavily to compensate for a weak prompt, without revisiting the prompt itself.`,
      },
    ];
  }

  return [
    {
      criterion: 'Technique application',
      excellent: `Applied the technique to a real task, with a documented ${tool} prompt and output that clearly demonstrates the concept from this lesson.`,
      acceptable: `Applied the technique but to a simplified or fabricated task that does not reflect real work.`,
      needsWork: `Described the technique without applying it, or produced output without showing the prompt that generated it.`,
    },
    {
      criterion: 'Failure analysis',
      excellent: `Identified a specific, realistic failure mode and produced a revised prompt that demonstrably addresses it.`,
      acceptable: `Identified a failure mode but the revised prompt only partially addresses it.`,
      needsWork: `No failure mode identified, or the analysis is too vague to be actionable.`,
    },
  ];
}

export function generateLessonContent(rawLesson: Lesson): LessonContent {
  const lesson = LessonSchema.parse(rawLesson);
  return LessonContentSchema.parse({
    lessonId: lesson.id,
    body: buildBody(lesson),
    exercises: buildExercises(lesson),
    rubric: buildRubric(lesson),
  });
}
