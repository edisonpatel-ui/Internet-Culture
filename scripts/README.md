## Content Validation

Run before publishing new articles:

  npm run validate

Checks for:
- Duplicate slugs
- Missing titles
- Missing summaries
- Missing sources (warning)
- Broken internal relatedSlugs
- Invalid categories

Exit code 0 = all checks passed. Exit code 1 = errors found.
