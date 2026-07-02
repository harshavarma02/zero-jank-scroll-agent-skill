#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const requiredFiles = [
  "README.md",
  "LICENSE",
  "CITATION.cff",
  "skills/zero-jank-scroll/SKILL.md",
  "skills/zero-jank-scroll/references/architecture-matrix.md",
  "skills/zero-jank-scroll/references/performance.md",
  "skills/zero-jank-scroll/references/accessibility.md",
  "skills/zero-jank-scroll/references/frameworks.md",
  "skills/zero-jank-scroll/scripts/audit-scroll-source.mjs",
  "examples/sticky-steps/index.html",
  "examples/scroll-comparison/before-laggy/index.html",
  "examples/scroll-comparison/after-fixed/index.html",
  "docs/index.html",
  "docs/demo/index.html",
  "docs/benchmark/index.html",
  "docs/sitemap.xml",
  ".github/workflows/pages.yml",
  "evals/trigger-cases.json"
];

for (const relative of requiredFiles) {
  try { await fs.access(path.join(root, relative)); }
  catch { errors.push(`Missing required file: ${relative}`); }
}

const skillPath = path.join(root, "skills", "zero-jank-scroll", "SKILL.md");
let skill = "";
try { skill = await fs.readFile(skillPath, "utf8"); }
catch { errors.push("Unable to read SKILL.md"); }

if (skill) {
  const lines = skill.split("\n");
  if (lines.length > 500) errors.push(`SKILL.md has ${lines.length} lines; keep it at or below 500.`);
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) errors.push("SKILL.md has no valid opening YAML frontmatter.");
  else {
    const yaml = frontmatter[1];
    if (!/^name:\s*zero-jank-scroll\s*$/m.test(yaml)) errors.push("Frontmatter name must be `zero-jank-scroll`.");
    if (!/^description:\s*\S.+$/m.test(yaml)) errors.push("Frontmatter must contain a non-empty description.");
  }
  for (const match of skill.matchAll(/\]\(([^)]+\.md)\)/g)) {
    const referenced = path.resolve(path.dirname(skillPath), match[1]);
    try { await fs.access(referenced); }
    catch { errors.push(`Broken Markdown reference in SKILL.md: ${match[1]}`); }
  }
}

const readme = await fs.readFile(path.join(root, "README.md"), "utf8").catch(() => "");
if (!readme.includes("harshavarma02/zero-jank-scroll-agent-skill")) errors.push("README does not contain the current repository slug.");
if (readme.includes("varmaharsha360/zero-jank-scroll")) errors.push("README still contains the obsolete repository owner/path.");
if (readme.includes("gh skill install")) errors.push("README contains an unsupported `gh skill install` command.");

const after = await fs.readFile(path.join(root, "examples/scroll-comparison/after-fixed/index.html"), "utf8").catch(() => "");
if (!after.includes("syncToActivationLine")) errors.push("Fixed demo is missing top-line synchronization.");
if (after.includes("rootMargin:'-42%")) errors.push("Fixed demo still uses center activation.");
if (/addEventListener\s*\(\s*["']scroll["']/.test(after)) errors.push("Fixed demo contains a native scroll listener.");

const before = await fs.readFile(path.join(root, "examples/scroll-comparison/before-laggy/index.html"), "utf8").catch(() => "");
if (!/addEventListener\s*\(\s*["']scroll["']/.test(before)) errors.push("Before demo no longer contains the intended fragile scroll listener.");

try {
  const cases = JSON.parse(await fs.readFile(path.join(root, "evals", "trigger-cases.json"), "utf8"));
  if (!Array.isArray(cases.shouldTrigger) || cases.shouldTrigger.length < 5) errors.push("Trigger evals need at least five shouldTrigger cases.");
  if (!Array.isArray(cases.shouldNotTrigger) || cases.shouldNotTrigger.length < 5) errors.push("Trigger evals need at least five shouldNotTrigger cases.");
} catch (error) { errors.push(`Invalid trigger-cases.json: ${error.message}`); }

if (errors.length) {
  console.error("Validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Validation passed.");
