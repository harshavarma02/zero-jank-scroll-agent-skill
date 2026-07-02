# Security

Agent skills are operational text. Their instructions and scripts can influence what an AI agent reads, changes, or executes.

## Trust model

This repository follows these rules:

- Bundled scripts must be readable, local, and dependency-free unless a dependency is essential and documented.
- Scripts must not download or execute remote code.
- Scripts must not read secrets, credentials, browser profiles, or unrelated home-directory files.
- The skill must not instruct an agent to disable security controls for convenience.
- External contributions that change executable files require extra review.

## Before installation

Inspect:

```bash
gh skill preview harshavarma02/zero-jank-scroll zero-jank-scroll
```

Review the file tree and executable scripts before installing.

## Reporting

Open a private security advisory in the GitHub repository for vulnerabilities or malicious-instruction concerns. Do not include secrets in an issue.
