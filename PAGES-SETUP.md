# GitHub Pages and indexing setup

The repository includes a static site in `docs/` and `.github/workflows/pages.yml`.

## Enable Pages once

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push the updated repository or manually run the `deploy-pages` workflow.

Expected site:

```text
https://harshavarma02.github.io/zero-jank-scroll-agent-skill/
```

## After the first successful deployment

1. Open the live URLs and verify canonical links.
2. Submit this sitemap in Google Search Console and Bing Webmaster Tools:

```text
https://harshavarma02.github.io/zero-jank-scroll-agent-skill/sitemap.xml
```

3. Add the repository topics listed in the README-related project notes.
4. Replace or supplement the source demo with the final before/after video after recording.

A project Pages path cannot define the host-level `robots.txt` for `harshavarma02.github.io`. Add host-level crawler rules only if you later use a custom domain or root user Pages site.
