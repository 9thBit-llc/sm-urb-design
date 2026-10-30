<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Info, TriangleAlert, Sparkles, Check } from '../icons.js';

	type Tone = 'info' | 'tip' | 'warning' | 'success';

	const tones: Record<Tone, { classes: string; icon: typeof Info }> = {
		info: { classes: 'preset-tonal-primary', icon: Info },
		tip: { classes: 'preset-tonal-tertiary', icon: Sparkles },
		warning: { classes: 'preset-tonal-warning', icon: TriangleAlert },
		success: { classes: 'preset-tonal-success', icon: Check }
	};

	let { tone = 'info', title, children }: { tone?: Tone; title?: string; children: Snippet } = $props();
	const current = $derived(tones[tone]);
	const Icon = $derived(current.icon);
</script>

<aside class="card flex gap-4 rounded-container p-5 {current.classes}" role="note">
	<Icon class="mt-1 size-5 shrink-0" aria-hidden="true" />
	<div class="flex flex-col gap-1">
		{#if title}
			<p class="font-semibold">{title}</p>
		{/if}
		<div class="opacity-90">{@render children()}</div>
	</div>
</aside>
