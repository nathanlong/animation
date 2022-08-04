# Animation Playground

https://nathan-long.com/animation/

This is a throwaway demo site built to test different animation techniques,
experiments, and stacks.

## Hosting

This is hosted on Github Pages via a [git worktree
setup](https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html)

## Scripts

- `npm run clean` - Scrubs the `_site` directory without removing `.git`
  information
- `npm run deploy` - Runs the clean script, then generates a timestamp commit
  for deployment to the `gh-pages` branch
