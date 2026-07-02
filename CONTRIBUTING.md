# Contributing

Contributions are welcome when they make the skill more correct, testable, or useful in real projects.

## Valuable contributions

- A minimal reproduction of a scroll or sticky failure
- A browser-specific edge case with evidence
- A framework adapter that preserves the core architecture rules
- A new evaluation case
- A correction based on an official browser or library source
- A safer or more measurable verification method

## Usually not valuable

- Another list of animation libraries
- Unmeasured claims such as “GPU accelerated means fast”
- Replacing native scrolling with a smooth-scroll dependency by default
- Decorative snippets without failure handling
- Rules that apply to one framework but are presented as universal

## Pull request requirements

1. Explain the failure or gap.
2. Include a reproduction, evaluation prompt, or source.
3. State what changed in agent behavior.
4. Run:

```bash
node scripts/validate.mjs
```

5. Keep the core `SKILL.md` concise. Move detailed material into `references/`.
