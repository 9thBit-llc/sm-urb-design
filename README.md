# sm-urb-design

Shared design language for [StructuredMerge](https://structuredmerge.org) and
[Ur Brain](https://ur-brain.tech). See [DESIGN.md](DESIGN.md) for the decisions,
the brand variations, and the open items.

## Layout

- `packages/design`: `@9thbit-llc/sm-urb-design`, the tokens, themes, and Svelte components
  that the sites depend on.
- `apps/styleguide`: a SvelteKit catalog of every component in both brands. It is
  the test bench for mock and test implementations.

## Develop

```bash
pnpm install
pnpm dev                 # styleguide at http://localhost:5173
pnpm build               # builds the design package
pnpm build:styleguide    # builds the package, then the static styleguide into apps/styleguide/build
```

Brand palettes are generated. Edit `packages/design/scripts/generate-themes.mjs`
and run `pnpm --filter @9thbit-llc/sm-urb-design build:themes`. Do not hand-edit
`packages/design/src/styles/urb.css` or `sm.css`.

## Publish and consume

`@9thbit-llc/sm-urb-design` is published to GitHub Packages, the same way
`@9thbit-llc/palmyra` is. Sites depend on a semver range, never on a local path.

- Publish: run the **Publish @9thbit-llc/sm-urb-design** workflow manually (`workflow_dispatch`),
  after bumping `packages/design/package.json` `version`. Use `dry_run: true` to verify first.
  The workflow needs the `GH_PACKAGES_TOKEN` secret with `package:write`.
- Consume: add `@9thbit-llc/sm-urb-design` as a dependency, plus the same `.npmrc` this repo has.
  Set `NODE_AUTH_TOKEN` wherever the site installs (local shell, CI, Cloudflare Pages build env).
- Import the styles in this order: Tailwind, Skeleton, then `…/styles/fonts.css`, `…/styles/base.css`,
  and one brand file (`…/styles/urb.css` or `…/styles/sm.css`).
