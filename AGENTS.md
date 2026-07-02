# Repository guidance

## Purpose

This repository maintains the `zero-jank-scroll` Agent Skill. Changes must improve an agent's ability to build, review, or repair scroll-driven web interfaces.

## Non-negotiables

- Keep `skills/zero-jank-scroll/SKILL.md` below 500 lines.
- Put deep explanations in `references/`, one link away from `SKILL.md`.
- Do not add a framework or animation library as the universal default.
- Preserve native scrolling unless a documented product requirement makes that impossible.
- Do not claim performance without runtime evidence.
- Every new rule needs either:
  - a real failure mode,
  - an official platform constraint,
  - a reproducible example,
  - or an evaluation case.
- Do not add executable scripts that download or execute remote code.
- Run `node scripts/validate.mjs` before submitting a change.

## Writing style

Use imperative, testable instructions. Prefer decision rules, failure modes, and exit criteria over inspirational prose.
