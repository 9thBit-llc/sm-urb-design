<script lang="ts">
	import { brands, type BrandId } from '../brands.js';

	let { brand }: { brand: BrandId } = $props();
	const current = $derived(brands[brand]);
</script>

<footer class="border-surface-200-800 mt-auto border-t">
	<div class="mx-auto flex w-[calc(100%-2rem)] max-w-[1280px] flex-col gap-3 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-col gap-1">
			<p class="font-display font-semibold">{current.name}</p>
			<p class="opacity-70">{current.blurb}</p>
		</div>
		<p class="opacity-70">
			A <a href="https://9thbit.net">9thBit, LLC</a> project.
		</p>
	</div>
</footer>
