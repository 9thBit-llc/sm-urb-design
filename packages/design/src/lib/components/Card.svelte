<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children, footer }: { title?: string; children: Snippet; footer?: Snippet } = $props();
</script>

<article class="card preset-outlined-surface-200-800 lift flex flex-col gap-3 rounded-container p-6">
	{#if title}
		<h3>{title}</h3>
	{/if}
	<div class="flex flex-col gap-3 opacity-90">{@render children()}</div>
	{#if footer}
		<footer class="mt-auto pt-2">{@render footer()}</footer>
	{/if}
</article>
