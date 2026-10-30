<script lang="ts">
	import { FileDiff } from '../icons.js';

	let {
		added,
		updated,
		removed,
		unchanged
	}: { added: number; updated: number; removed: number; unchanged: number } = $props();

	const total = $derived(added + updated + removed + unchanged);
	const reembedded = $derived(added + updated);
	const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100);
</script>

<figure class="card preset-outlined-surface-200-800 rounded-container flex flex-col gap-4 p-6">
	<figcaption class="flex items-center gap-2 font-semibold">
		<FileDiff class="size-5" aria-hidden="true" />
		Only {reembedded} of {total} chunks need re-embedding
	</figcaption>

	<div class="flex h-4 w-full overflow-hidden rounded-base" role="img" aria-label="{added} added, {updated} updated, {removed} removed, {unchanged} unchanged">
		<div class="preset-filled-success-500" style="width: {pct(added)}%"></div>
		<div class="preset-filled-tertiary-500" style="width: {pct(updated)}%"></div>
		<div class="preset-filled-error-500" style="width: {pct(removed)}%"></div>
		<div class="preset-tonal-surface" style="width: {pct(unchanged)}%"></div>
	</div>

	<dl class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
		<div><dt class="opacity-70">Added</dt><dd class="font-semibold">{added}</dd></div>
		<div><dt class="opacity-70">Updated</dt><dd class="font-semibold">{updated}</dd></div>
		<div><dt class="opacity-70">Removed</dt><dd class="font-semibold">{removed}</dd></div>
		<div><dt class="opacity-70">Unchanged, skipped</dt><dd class="font-semibold">{unchanged}</dd></div>
	</dl>
</figure>
