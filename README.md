<div align="center">

# Zero-Jank Scroll

### Teach AI coding agents to build scroll experiences that feel premium—not fragile.

**Architecture selection · native scrolling · accessibility · runtime proof**

</div>

`zero-jank-scroll` is an installable Agent Skill for designing, implementing, reviewing, and repairing production-grade scroll-driven interfaces.

It is deliberately not a collection of flashy animation recipes. It teaches an agent to choose the least-complex correct architecture, preserve native scrolling, avoid main-thread and layout work, support reduced motion, and verify the result instead of declaring it “smooth.”

## Why this exists

AI-generated scroll sections often begin with:

- a hardcoded `300vh` or `400vh` track,
- a global `scroll` listener,
- repeated `getBoundingClientRect()` calls,
- percentage-to-step arithmetic,
- JavaScript pinning,
- large blur effects,
- width-only mobile fallbacks,
- no reduced-motion experience,
- and no runtime measurement.

Those implementations can look convincing in a desktop preview while becoming brittle, inaccessible, or janky in production.

Zero-Jank Scroll gives coding agents a repeatable workflow for doing better.

## What the skill does

- Classifies the interaction as **discrete**, **continuous**, or **cinematic**.
- Selects between CSS sticky positioning, IntersectionObserver, native CSS scroll timelines, Motion, and GSAP ScrollTrigger.
- Refactors arbitrary scroll tracks into semantic step-driven layouts.
- Prevents layout thrashing and scroll-state rerender storms.
- Handles sticky ancestors, mobile browser chrome, short viewports, zoom, nested scrollers, and content changes.
- Requires reduced-motion and keyboard-safe behavior.
- Audits source code with a dependency-free heuristic scanner.
- Requires browser evidence when runtime tools are available.

## Install

### Open Agent Skills CLI

```bash
npx skills add harshavarma02/zero-jank-scroll --skill zero-jank-scroll
```

### GitHub CLI

```bash
gh skill install harshavarma02/zero-jank-scroll zero-jank-scroll
```

### Direct project installation

Copy this directory into a supported project skill location:

```text
skills/zero-jank-scroll/
```

Common project locations include:

```text
.agents/skills/zero-jank-scroll/
.claude/skills/zero-jank-scroll/
.github/skills/zero-jank-scroll/
```

## Example prompts

```text
Build a sticky four-step capabilities section without scroll jank.
```

```text
Audit this landing page. Fast trackpad scrolling causes panels to skip and mobile feels laggy.
```

```text
Refactor this 400vh scroll section so adding a fifth step requires no percentage math.
```

```text
Should this interaction use IntersectionObserver, CSS scroll timelines, Motion, or GSAP ScrollTrigger?
```

```text
Review this PR specifically for scroll performance, reduced motion, and sticky-layout failures.
```

## Architecture rule in one table

| Interaction | Default |
|---|---|
| Discrete step activation | Semantic step elements + `IntersectionObserver` |
| Simple reveal | CSS transition + observer or view timeline enhancement |
| Continuous progress mapping | CSS scroll timeline when support permits |
| Existing Motion application | Motion values without React state per frame |
| Complex scrubbed choreography | GSAP ScrollTrigger |
| Pinning only | CSS `position: sticky` |
| Mobile or short viewport | Normal document flow or simplified motion |

The skill does not force one animation library onto every problem.

## Included

```text
skills/zero-jank-scroll/
├── SKILL.md
├── references/
│   ├── accessibility.md
│   ├── architecture-matrix.md
│   ├── frameworks.md
│   └── performance.md
└── scripts/
    └── audit-scroll-source.mjs

examples/
└── sticky-steps/
    └── index.html

evals/
├── quality-cases.md
└── trigger-cases.json
```

## Source audit

Run the included heuristic source scanner:

```bash
node skills/zero-jank-scroll/scripts/audit-scroll-source.mjs .
```

JSON output:

```bash
node skills/zero-jank-scroll/scripts/audit-scroll-source.mjs . --json
```

The scanner intentionally reports evidence and possible risks rather than pretending static analysis can prove runtime smoothness.

## Demo

Open `examples/sticky-steps/index.html` in a browser. It demonstrates:

- real scroll steps instead of an artificial `320vh` track,
- a CSS-sticky stage,
- one IntersectionObserver,
- click-to-scroll with `scrollIntoView()`,
- inactive panels made non-interactive,
- width-and-height responsive fallbacks,
- and reduced-motion behavior.

## Quality contract

A generated or repaired interaction is not complete until the agent reports:

1. the selected architecture and why,
2. the rejected alternatives and why,
3. accessibility behavior,
4. responsive fallback behavior,
5. files changed,
6. evidence collected,
7. remaining unverified risks.

“Looks smooth” is not evidence.

## Validate this repository

```bash
node scripts/validate.mjs
```

For GitHub's skill publishing flow:

```bash
gh skill publish --dry-run
```

## Roadmap

- Runtime trace analyzer for Chrome/Playwright
- React, Vue, Svelte, and Astro reference implementations
- Reproduction fixtures for common sticky failures
- Cross-browser test matrix
- Public benchmark comparing agent output with and without the skill

## Contributing

Real failure cases are more valuable than generic animation snippets. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Agent skills are operational instructions. Read [SECURITY.md](SECURITY.md) before installing third-party changes or executing bundled scripts.

## License

MIT
