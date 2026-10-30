<script lang="ts">
	import type { Snippet } from 'svelte';

	type Tone = 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error';

	const tones: Record<Tone, string> = {
		neutral: 'badge preset-tonal-surface',
		primary: 'badge preset-tonal-primary',
		secondary: 'badge preset-tonal-secondary',
		tertiary: 'badge preset-tonal-tertiary',
		success: 'badge preset-tonal-success',
		warning: 'badge preset-tonal-warning',
		error: 'badge preset-tonal-error'
	};

	let { tone = 'neutral', children }: { tone?: Tone; children: Snippet } = $props();
</script>

<span class={tones[tone]}>{@render children()}</span>
