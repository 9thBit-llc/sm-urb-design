<script lang="ts">
	import type { Snippet } from 'svelte';

	let { wide = false, children }: { wide?: boolean; children: Snippet } = $props();
</script>

<!-- Two fixed widths. Class strings stay literal so Tailwind can scan them. -->
<div class={wide ? 'mx-auto w-[calc(100%-2rem)] max-w-[1280px]' : 'mx-auto w-[calc(100%-2rem)] max-w-[1080px]'}>
	{@render children()}
</div>
