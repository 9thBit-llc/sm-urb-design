<script lang="ts">
	import { brands, type BrandId } from '../brands.js';

	let { brand, href = '/' }: { brand: BrandId; href?: string } = $props();
	const current = $derived(brands[brand]);
</script>

<a class="inline-flex items-center gap-3 font-display font-bold no-underline" {href} aria-label="{current.name} home">
	<span class="preset-filled-primary-500 lift rounded-base grid size-9 place-items-center text-xs font-bold tracking-tight">
		{current.mark}
	</span>
	<span class="text-lg tracking-tight">{current.name}</span>
</a>
