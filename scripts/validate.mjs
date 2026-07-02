#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillPath = path.join(root, "skills", "zero-jank-scroll", "SKILL.md");
const errors = [];

const requiredFiles = [
  "README.md",
  "LICENSE",
  "skills/zero-jank-scroll/SKILL.md",
  "skills/zero-jank-scroll/references/architecture-matrix.md",
  "skills/zero-jank-scroll/references/performance.md",
  "skills/zero-jank-scroll/references/accessibility.md",
  "skills/zero-jank-scroll/references/frameworks.md",
  "skills/zero-jank-scroll/scripts/audit-scroll-source.mjs",
  "examples/sticky-steps/index.html",
  "evals/trigger-cases.json"
];

for (const relative of requiredFiles) {
  try {
    await fs.access(path.join(root, relative));
  } catch {
    errors.push(`Missing required file: ${relative}`);
  }
}

let skill = "";
try {
  skill = await fs.readFile(skillPath, "utf8");
} catch {
  errors.push("Unable to read SKILL.md");
}

if (skill) {
  const lines = skill.split("\n");
  if (lines.length > 500) {
    errors.push(`SKILL.md has ${lines.length} lines; keep it at or below 500.`);
  }

  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    errors.push("SKILL.md has no valid opening YAML frontmatter.");
  } else {
    const yaml = frontmatter[1];
    if (!/^name:\s*zero-jank-scroll\s*$/m.test(yaml)) {
      errors.push("Frontmatter name must be `zero-jank-scroll`.");
    }
    if (!/^description:\s*\S.+$/m.test(yaml)) {
      errors.push("Frontmatter must contain a non-empty description.");
    }
    const topLevelKeys = [...yaml.matchAll(/^([a-zA-Z][a-zA-Z0-9-]*):/gm)].map((m) => m[1]);
    const allowed = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
    for (const key of topLevelKeys) {
      if (!allowed.has(key)) errors.push(`Unexpected top-level frontmatter key: ${key}`);
    }
  }

  for (const match of skill.matchAll(/\]\(([^)]+\.md)\)/g)) {
    const referenced = path.resolve(path.dirname(skillPath), match[1]);
    try {
      await fs.access(referenced);
    } catch {
      errors.push(`Broken Markdown reference in SKILL.md: ${match[1]}`);
    }
  }
}

try {
  const evalText = await fs.readFile(path.join(root, "evals", "trigger-cases.json"), "utf8");
  const cases = JSON.parse(evalText);
  if (!Array.isArray(cases.shouldTrigger) || cases.shouldTrigger.length < 5) {
    errors.push("Trigger evals need at least five shouldTrigger cases.");
  }
  if (!Array.isArray(cases.shouldNotTrigger) || cases.shouldNotTrigger.length < 5) {
    errors.push("Trigger evals need at least five shouldNotTrigger cases.");
  }
} catch (error) {
  errors.push(`Invalid trigger-cases.json: ${error.message}`);
}

if (errors.length) {
  console.error("Validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validation passed.");
