# Design language: StructuredMerge and Ur Brain

One design system, two brand personalities. Both sites are 9thBit projects and
share the foundations (type scale, spacing, radius logic, motion, focus,
icons, components). Each brand changes its palette, its shape, and its voice.

## Stack decision

| Option | Verdict |
| --- | --- |
| **Skeleton 5 + Tailwind v4** (chosen) | Our preferred stack. Zag.js accessibility primitives, a Svelte 5 component set (Tabs, Dialog, Menu, Tooltip, Accordion, and more), and a theme model that is plain CSS variables under `[data-theme]`. Tailwind v4 is current. Skeleton 5.0.1 is new (Aug 2026), so expect API churn; we pin it. |
| shadcn-svelte 1.7 | Copy-into-repo components on bits-ui. Strong, but it owns code we would then maintain per site, which fights a shared package. |
| bits-ui 2.20 | Headless primitives only. Excellent as a foundation, but we would style everything ourselves. Skeleton already builds on Zag, a close cousin. |
| flowbite-svelte 1.33 | Tailwind-first and rich, but its own README warns APIs change often, and its last push was Apr 2026. |
| carbon-components-svelte 0.113 | Very mature, but the IBM enterprise look is the opposite of the fun voice we want. |
| svelte-material-ui 9.0.6 | Mature and accessible, but Material is a strong house style, and it is Sass-heavy. |
| daisyUI 5.7 | Excellent theming (35 themes) and a good fit for CSS-only components. It has no interactive behavior, so overlays and tabs would need another layer anyway. |

Icons: **Lucide** via `@lucide/svelte` (ISC), the current package name. The older
`lucide-svelte` package is superseded.

Framework: **SvelteKit 3** (current line, released Oct 2026) with
`adapter-static`, deployed as static files to Cloudflare Pages like the
existing sites. Kit 2 stopped receiving releases in Aug 2026.

Fonts (all open source, self-hosted through Fontsource): Inter (body, both
brands), Space Grotesk (URB display), Silkscreen (URB pixel eyebrows),
JetBrains Mono (code).

## Structure

```
sm-urb-design/
  packages/design/        @sm-urb/design  tokens, themes, base layer, components
    scripts/generate-themes.mjs   source of truth for both brand palettes
    src/styles/fonts.css          shared font loading
    src/styles/base.css           shared typography, focus, eyebrow, lift
    src/styles/urb.css            generated: Ur Brain theme
    src/styles/sm.css             generated: StructuredMerge theme
    src/lib/                      components, brands, voice, icons
  apps/styleguide/        @sm-urb/styleguide  living catalog and test bench
```

Sites depend on `@sm-urb/design`. A site imports the shared styles in this order:
Tailwind, Skeleton, `fonts.css`, `base.css`, then its brand theme. It then sets
`data-theme` on `<html>` (`urb` or `sm`). No component knows its brand.

## Brand variations

| Token | Ur Brain (`urb`) | StructuredMerge (`sm`) |
| --- | --- | --- |
| Primary | Violet (from the logo), hue 292 | Teal (from the existing site), hue 185 |
| Secondary | Teal, the complement | Violet, echoing the merge diagram |
| Tertiary | Chartreuse, the "now" highlight | Amber, for review and conflict |
| Surface | Shared warm paper | Shared warm paper |
| Radius | 0.5rem base, 1rem containers | 0.25rem base, 0.5rem containers |
| Display face | Space Grotesk | Inter |
| Eyebrow | Silkscreen (pixel) | JetBrains Mono |
| Elevation (`lift`) | Hard 5px offset shadow | 1px hairline |
| Heading tracking | -0.02em | -0.03em |

Surface stays identical on purpose: that shared paper is what makes the two
sites read as one family.

## Voice

- **Both:** fun and smart. Say the clever thing once, then get out of the way.
- **Ur Brain:** the joke is memory and time. Tagline: "Remember the 90s? Me too."
  The "Stamp" component is the one 90s flourish, used once per page at most.
- **StructuredMerge:** the joke is precision. A conflict is a feature, not a
  failure. Tagline: "Merge the structure. Keep the meaning."

Microcopy drafts live in `packages/design/src/lib/voice.ts`. They need operator
approval before anything ships publicly.

## Components

Ours (`@sm-urb/design`): Button, Badge, Callout, Card, CodeBlock, Container,
Eyebrow, IngestDelta, MemoryCard, Section, SiteFooter, SiteHeader, Stamp, Stat,
TextField, VersionTimeline, Wordmark.

From Skeleton, used directly: Tabs (Dialog, Tooltip, Menu, and the rest are
available when a site needs them).

The styleguide (`apps/styleguide`) shows every component in its states and
both brand palettes. Run it with `pnpm dev`; build it with `pnpm build:styleguide`.

## Accessibility

- Focus is always visible (`:focus-visible` in `base.css`). Never remove it.
- Overlays and tabs come from Zag.js through Skeleton, so keyboard handling is not hand-rolled.
- Icons are decorative (`aria-hidden`) unless a label is provided.

## Open items

- **Contrast audit.** The generated ramps are tuned by eye. Run a WCAG check on
  every text-on-surface pairing for both themes before public launch.
- **Dark mode toggle.** Skeleton follows `prefers-color-scheme`. A visible toggle
  needs a `dark` custom variant and is not built yet.
- **TypeScript 7.** npm has TypeScript 7.0.2, but `svelte-check` supports only
  TypeScript 5 and 6, so the package stays on 6.x until `svelte-check` catches up.
- **Site adoption.** Neither site imports the package yet.
- **Domain.** `ur-brain.io` is purchased and unused. The brand is not yet
  decided for it.
