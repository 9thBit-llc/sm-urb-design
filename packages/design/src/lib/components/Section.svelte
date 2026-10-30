<script lang="ts">
	import type { Snippet } from 'svelte';
	import Eyebrow from './Eyebrow.svelte';

	let {
		eyebrow,
		title,
		lede,
		children
	}: { eyebrow?: string; title?: string; lede?: string; children: Snippet } = $props();
</script>

<section class="flex flex-col gap-6">
	{#if eyebrow || title || lede}
		<header class="flex max-w-3xl flex-col gap-3">
			{#if eyebrow}
				<Eyebrow>{eyebrow}</Eyebrow>
			{/if}
			{#if title}
				<h2>{title}</h2>
			{/if}
			{#if lede}
				<p class="text-lg opacity-80">{lede}</p>
			{/if}
		</header>
	{/if}
	{@render children()}
</section>
