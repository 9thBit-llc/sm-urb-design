<script lang="ts">
	import { ArrowRight, Brain, Clock, GitMerge, History, Search, Section, ShieldCheck, Sparkles } from '@9thbit-llc/sm-urb-design';

	const iconRow: { name: string; icon: typeof ArrowRight }[] = [
		{ name: 'ArrowRight', icon: ArrowRight },
		{ name: 'Brain', icon: Brain },
		{ name: 'Clock', icon: Clock },
		{ name: 'GitMerge', icon: GitMerge },
		{ name: 'History', icon: History },
		{ name: 'Search', icon: Search },
		{ name: 'ShieldCheck', icon: ShieldCheck },
		{ name: 'Sparkles', icon: Sparkles }
	];

	// Each ramp is written out in full so Tailwind generates every class.
	const ramps = {
		primary: ['bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500', 'bg-primary-600', 'bg-primary-700', 'bg-primary-800', 'bg-primary-900', 'bg-primary-950'],
		secondary: ['bg-secondary-50', 'bg-secondary-100', 'bg-secondary-200', 'bg-secondary-300', 'bg-secondary-400', 'bg-secondary-500', 'bg-secondary-600', 'bg-secondary-700', 'bg-secondary-800', 'bg-secondary-900', 'bg-secondary-950'],
		tertiary: ['bg-tertiary-50', 'bg-tertiary-100', 'bg-tertiary-200', 'bg-tertiary-300', 'bg-tertiary-400', 'bg-tertiary-500', 'bg-tertiary-600', 'bg-tertiary-700', 'bg-tertiary-800', 'bg-tertiary-900', 'bg-tertiary-950'],
		surface: ['bg-surface-50', 'bg-surface-100', 'bg-surface-200', 'bg-surface-300', 'bg-surface-400', 'bg-surface-500', 'bg-surface-600', 'bg-surface-700', 'bg-surface-800', 'bg-surface-900', 'bg-surface-950']
	};

	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
</script>

<div class="flex flex-col gap-16">
	<Section eyebrow="Color" title="Four ramps, two brands">
		<p class="max-w-2xl opacity-80">
			Primary is the brand accent. Secondary is the complement. Tertiary is the highlight for "now", review, and conflict. Surface is the warm paper
			both brands share. Each brand swaps the first three; surface stays put.
		</p>
		{#each Object.entries(ramps) as [family, classes] (family)}
			<div class="flex flex-col gap-2">
				<p class="eyebrow">{family}</p>
				<div class="grid grid-cols-11 overflow-hidden rounded-base">
					{#each classes as cls, i (cls)}
						<div class="{cls} flex h-16 items-end p-1 text-[0.65rem] font-semibold" title={cls}>
							{shades[i]}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</Section>

	<Section eyebrow="Type" title="Display, body, pixel, mono">
		<div class="flex flex-col gap-4">
			<h1>Memory that knows what changed.</h1>
			<h2>Stable merges, stable outputs.</h2>
			<h3>Subsection heading at 1.3rem</h3>
			<p class="max-w-2xl">
				Body text uses the theme's base face at a comfortable measure. Links are underlined and get the anchor color. Inline <code>code</code> uses
				the mono face. Long lines stop at about 65 characters so they stay readable.
			</p>
			<p class="eyebrow">Eyebrow: pixel face, uppercase</p>
			<pre class="card preset-tonal-surface rounded-container p-4 text-sm"><code>merge --contract spec.abnf --stable-ids</code></pre>
		</div>
	</Section>

	<Section eyebrow="Shape" title="Radius, lift, focus">
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="preset-filled-primary-500 lift rounded-base p-6">rounded-base</div>
			<div class="preset-filled-secondary-500 lift rounded-container p-6">rounded-container</div>
			<div class="preset-outlined-primary-500 rounded-container p-6">Tab to see the focus ring</div>
		</div>
		<p class="opacity-80">
			URB lifts with a hard offset shadow and rounds generously. SM uses a hairline and tighter corners. The <code>lift</code> utility reads
			<code>--sm-urb-shadow-lift</code>, so each brand gets its own elevation without a code change.
		</p>
	</Section>

	<Section eyebrow="Icons" title="Lucide, one set">
		<p class="opacity-80">Every icon is from Lucide (ISC). Icons inherit the text color and take <code>size-*</code> classes.</p>
		<div class="grid grid-cols-4 gap-4 sm:grid-cols-8">
			{#each iconRow as { name, icon: Icon } (name)}
				<div class="card preset-tonal-surface rounded-container flex flex-col items-center gap-2 p-4 text-xs">
					<Icon class="size-6" aria-hidden="true" />
					<span>{name}</span>
				</div>
			{/each}
		</div>
	</Section>
</div>
