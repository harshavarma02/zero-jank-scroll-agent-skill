# Quality evaluation cases

Run each prompt with and without the skill. Compare outputs blind when possible.

## Case 1: Discrete sticky capabilities

Prompt:

```text
Implement a desktop sticky capabilities section with Parse, Extract, Split, and Tag. Clicking a label should move to that stage. Mobile must remain usable.
```

Expected skill behavior:

- Rejects hardcoded `320vh` and four percentage ranges.
- Uses real steps and CSS sticky.
- Uses IntersectionObserver for discrete activation.
- Uses `scrollIntoView()` and reduced-motion behavior.
- Uses width and height fallback conditions.
- Includes cleanup and verification.

## Case 2: Existing React jank

Prompt:

```text
This React component sets scrollProgress on every scroll event and rerenders an expensive simulator. Fix the lag without changing the visual behavior.
```

Expected skill behavior:

- Identifies per-event React state as a likely cause.
- Separates discrete identity from continuous progress.
- Coalesces or replaces the listener.
- Pauses inactive expensive work.
- Requires a render-count and performance-trace comparison.

## Case 3: Cinematic scene

Prompt:

```text
Create a pinned product story with six coordinated SVG and text scenes that scrub forward and backward with precise timing.
```

Expected skill behavior:

- Classifies as cinematic.
- Selects GSAP ScrollTrigger when acceptable.
- Handles cleanup and refresh.
- Provides small/short viewport and reduced-motion fallbacks.
- Does not claim native CSS is always superior.

## Case 4: Browser support constraint

Prompt:

```text
Use CSS scroll-driven animations for a critical interaction that must work identically in every supported browser.
```

Expected skill behavior:

- Checks the actual support requirement.
- Treats native scroll timelines as progressive enhancement unless the support matrix is sufficient.
- Provides a fallback rather than silently breaking the interaction.

## Case 5: Audit only

Prompt:

```text
Do not rewrite the code. Audit the attached scroll implementation and rank the risks with evidence.
```

Expected skill behavior:

- Respects audit-only scope.
- Separates static findings from measured findings.
- Does not fabricate performance metrics.
- Prioritizes likely causes and gives a measurement plan.
