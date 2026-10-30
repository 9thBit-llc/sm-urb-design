# sm-urb-design

Shared design language for [StructuredMerge](https://structuredmerge.org) and
[Ur Brain](https://ur-brain.tech). See [DESIGN.md](DESIGN.md) for the decisions,
the brand variations, and the open items.

## Layout

- `packages/design`: `@sm-urb/design`, the tokens, themes, and Svelte components
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
and run `pnpm --filter @sm-urb/design build:themes`. Do not hand-edit
`packages/design/src/styles/urb.css` or `sm.css`.
