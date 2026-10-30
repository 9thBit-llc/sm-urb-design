<script lang="ts">
	import { brands, Button, Callout, Card, Eyebrow, Section, Stamp, Stat, voice } from '@9thbit-llc/sm-urb-design';
</script>

<div class="flex flex-col gap-16">
	<section class="flex flex-col gap-6">
		<Eyebrow>Shared design language</Eyebrow>
		<h1>One system. Two personalities.</h1>
		<p class="max-w-2xl text-lg opacity-80">
			StructuredMerge and Ur Brain share the foundations: type, spacing, radius, motion, focus, icons, and components. Each brand changes
			its palette, its shape, and its voice. Use the switch above to see both.
		</p>
		<div class="flex flex-wrap gap-3">
			<Button href="/foundations">Foundations</Button>
			<Button variant="outline" href="/components">Components</Button>
			<Button variant="ghost" href="/voice">Voice</Button>
		</div>
	</section>

	<Section eyebrow="How it's built" title="Layers, from the bottom up">
		<div class="grid gap-4 md:grid-cols-3">
			<Card title="1. Tokens">
				<p>Palettes, radii, and fonts are Skeleton <code>@theme</code> variables. Each brand is one <code>[data-theme]</code> block.</p>
			</Card>
			<Card title="2. Base">
				<p>Shared typography, focus, and the eyebrow and lift utilities, so both sites look like one family.</p>
			</Card>
			<Card title="3. Components">
				<p>Our wrappers over Skeleton (built on Zag.js accessibility primitives) and Lucide icons. No component knows its brand.</p>
			</Card>
		</div>
	</Section>

	<Section eyebrow="Brands" title="Complementary, not identical">
		<div class="grid gap-4 md:grid-cols-2">
			<Card title={brands.urb.name}>
				<p class="text-lg">"{voice.urb.tagline}"</p>
				<p>Violet from the logo, a chartreuse "now" highlight, pixel eyebrows, hard offset shadows, rounded corners.</p>
				{#snippet footer()}<Stamp>Time-aware memory</Stamp>{/snippet}
			</Card>
			<Card title={brands.sm.name}>
				<p class="text-lg">"{voice.sm.tagline}"</p>
				<p>Teal from the existing site, violet as the complement, squarer shapes, hairline rules, and mono-forward type.</p>
				{#snippet footer()}<span class="eyebrow">Spec-first merge</span>{/snippet}
			</Card>
		</div>
	</Section>

	<Section eyebrow="Status" title="Where this stands">
		<div class="grid gap-4 sm:grid-cols-3">
			<Stat label="Components" value="17" hint="Our wrappers, shown on the Components page" />
			<Stat label="Brands" value="2" hint="URB and SM themes" />
			<Stat label="Sites on it" value="0" hint="Adoption is the next step" />
		</div>
		<Callout tone="tip" title="Next step">
			Wire <code>@9thbit-llc/sm-urb-design</code> into structuredmerge.org and ur-brain.tech, replacing their hand-written CSS one page at a time.
		</Callout>
	</Section>
</div>
