<div align="center">

# Zero-Jank Scroll Agent Skill

### Build and audit smooth sticky scroll, scrollytelling, parallax, and scroll-driven web interfaces—without fragile `400vh` tracks or per-frame framework rerenders.

[![Validate](https://github.com/harshavarma02/zero-jank-scroll-agent-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/harshavarma02/zero-jank-scroll-agent-skill/actions/workflows/validate.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-SKILL.md-111111.svg)](skills/zero-jank-scroll/SKILL.md)

[Live site](https://harshavarma02.github.io/zero-jank-scroll-agent-skill/) · [Before/after demo](https://harshavarma02.github.io/zero-jank-scroll-agent-skill/demo/) · [Architecture benchmark](https://harshavarma02.github.io/zero-jank-scroll-agent-skill/benchmark/)

</div>

**Zero-Jank Scroll** is an open-source `SKILL.md` package for AI coding agents. It helps agents design, implement, review, and repair production-grade scroll animations, sticky sections, scrollytelling experiences, parallax effects, active-section navigation, and scroll-linked interfaces.

The skill teaches the agent to choose between CSS `position: sticky`, `IntersectionObserver`, CSS scroll-driven animations, Motion, and GSAP ScrollTrigger based on the interaction—not based on hype or a one-library-fits-all rule.

## The problem it solves

AI-generated scroll sections commonly ship with:

- a hardcoded `300vh` or `400vh` scroll track,
- a global unthrottled `scroll` listener,
- repeated `getBoundingClientRect()` calls,
- percentage-to-step arithmetic,
- JavaScript pinning,
- per-frame React/Vue/Svelte state updates,
- paint-heavy blur and shadow transitions,
- width-only responsive fallbacks,
- and no reduced-motion or keyboard-safe behavior.

These patterns may look polished in a desktop preview while becoming laggy, skipped, brittle, inaccessible, or difficult to maintain in production.

## Install

List the available skills first:

```bash
npx skills add harshavarma02/zero-jank-scroll-agent-skill --list
```

Install Zero-Jank Scroll:

```bash
npx skills add harshavarma02/zero-jank-scroll-agent-skill --skill zero-jank-scroll
```

Install it globally for selected supported agents:

```bash
npx skills add harshavarma02/zero-jank-scroll-agent-skill \
  --skill zero-jank-scroll \
  --global \
  --agent claude-code \
  --agent codex
```

You can also copy this directory into a project-supported skills location:

```text
skills/zero-jank-scroll/
```

## Example prompts

```text
Build a sticky four-step capabilities section. Change the right panel only when the next left-side heading reaches the sticky top line.
```

```text
Audit this React landing page. Fast trackpad scrolling causes panels to skip and the simulator rerenders continuously.
```

```text
Refactor this 400vh section so adding a fifth step requires no percentage math or hardcoded section height.
```

```text
Choose between IntersectionObserver, CSS scroll timelines, Motion useScroll, and GSAP ScrollTrigger for this interaction, then justify the decision.
```

```text
Review this pull request for sticky containment failures, reduced motion, mobile viewport behavior, layout thrashing, and inactive animation loops.
```

## Architecture decision table

| Interaction | Default architecture |
|---|---|
| Discrete step activation | Semantic step elements + one `IntersectionObserver` |
| Sticky visual persistence | CSS `position: sticky` |
| Click-to-step navigation | `scrollIntoView()` on real target elements |
| Simple reveal | CSS transition + observer |
| Continuous progress mapping | CSS scroll/view timeline when support requirements permit |
| Existing Motion application | Motion values without per-frame component state |
| Complex scrubbed choreography | GSAP ScrollTrigger |
| Narrow or short viewport | Normal document flow or simplified motion |

## Before/after comparison

The comparison uses the same content and visual concept in both versions.

### Before: fragile implementation

- Hardcoded `400vh` track
- Global unthrottled scroll listener
- Repeated layout reads and writes
- Percentage-based state switching
- Manual `window.scrollTo()` coordinate calculations
- Paint-heavy `filter: blur()` and `transition: all`
- Artificial track retained on mobile

### After: production-oriented implementation

- Real semantic steps create scroll distance
- CSS owns sticky positioning
- One top-aligned `IntersectionObserver`
- The state changes only when the next left-side control reaches the sticky top line
- Real elements are navigated with `scrollIntoView()`
- Only `opacity` and `transform` drive panel transitions
- Width, height, zoom, keyboard, and reduced-motion fallbacks
- Inactive panels are `inert` and `aria-hidden`

Open:

```text
examples/scroll-comparison/before-laggy/index.html
examples/scroll-comparison/after-fixed/index.html
```

## Source audit

Run the dependency-free heuristic scanner:

```bash
node skills/zero-jank-scroll/scripts/audit-scroll-source.mjs .
```

JSON output:

```bash
node skills/zero-jank-scroll/scripts/audit-scroll-source.mjs . --json
```

The scanner reports possible source-level risks. It does not pretend static analysis can prove runtime smoothness.

## Repository structure

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
├── sticky-steps/
│   └── index.html
└── scroll-comparison/
    ├── before-laggy/
    ├── after-fixed/
    └── README.md

docs/
├── index.html
├── demo/
├── benchmark/
├── guides/
└── sitemap.xml
```

## Quality contract

A generated or repaired interaction is not complete until the agent reports:

1. the interaction class,
2. the selected architecture and why,
3. rejected alternatives and why,
4. accessibility and reduced-motion behavior,
5. responsive fallback behavior,
6. lifecycle and cleanup behavior,
7. runtime evidence collected,
8. and remaining unverified risks.

> “Looks smooth” is not evidence.

## Validate

```bash
node scripts/validate.mjs
```

## Useful guides

- [How to fix scroll jank](https://harshavarma02.github.io/zero-jank-scroll-agent-skill/guides/fix-scroll-jank/)
- [IntersectionObserver vs scroll listener](https://harshavarma02.github.io/zero-jank-scroll-agent-skill/guides/intersection-observer-vs-scroll-listener/)
- [Why CSS position: sticky stops working](https://harshavarma02.github.io/zero-jank-scroll-agent-skill/guides/css-sticky-not-working/)

## Contributing

Real failure cases, traces, browser-specific reproductions, framework lifecycle fixes, and evaluation prompts are more valuable than generic animation snippets. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Agent skills are operational instructions. Review [SECURITY.md](SECURITY.md) and inspect bundled scripts before installing third-party changes.

## Author

Created and maintained by **Harsha Varma** (`@harshavarma02`).

## License

MIT
