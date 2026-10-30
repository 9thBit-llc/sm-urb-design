<script lang="ts">
	import type { Snippet } from 'svelte';

	// A sticker-style flourish for the 90s nod. Use sparingly: once per page, at most.
	let { children }: { children: Snippet } = $props();
</script>

<span class="preset-filled-tertiary-500 lift rounded-base inline-block -rotate-2 px-3 py-1 font-[var(--sm-urb-font-pixel)] text-xs tracking-[0.08em] uppercase">
	{@render children()}
</span>
