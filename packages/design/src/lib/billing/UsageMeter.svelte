<script lang="ts">
	import { formatBytes, formatCount, usageRatio } from './format.js';

	let {
		label,
		used,
		limit,
		unit = 'count'
	}: { label: string; used: number; limit: number | null | undefined; unit?: 'count' | 'bytes' } = $props();

	const ratio = $derived(usageRatio(used, limit));
	const format = $derived(unit === 'bytes' ? formatBytes : formatCount);
	// Literal class names so Tailwind generates them.
	const tone = $derived(ratio == null ? 'bg-primary-500' : ratio >= 1 ? 'bg-error-500' : ratio >= 0.8 ? 'bg-warning-500' : 'bg-primary-500');
</script>

<div class="flex flex-col gap-1">
	<div class="flex justify-between gap-2 text-sm">
		<span>{label}</span>
		<span class="opacity-80">{format(used)} of {limit == null ? 'unlimited' : format(limit)}</span>
	</div>
	<div
		class="h-2 w-full overflow-hidden rounded-full bg-surface-200-800"
		role="progressbar"
		aria-label={label}
		aria-valuemin={0}
		aria-valuemax={limit ?? undefined}
		aria-valuenow={used}
		aria-valuetext={limit == null ? `${format(used)}, no limit` : `${format(used)} of ${format(limit)}`}
	>
		<div class="h-full {tone}" style:width="{Math.round((ratio ?? 0) * 100)}%"></div>
	</div>
</div>
