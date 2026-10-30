<script lang="ts">
	let { label, value, hint }: { label: string; value: string; hint?: string } = $props();
</script>

<div class="card preset-tonal-surface rounded-container flex flex-col gap-1 p-5">
	<p class="eyebrow">{label}</p>
	<p class="font-display text-3xl font-bold">{value}</p>
	{#if hint}
		<p class="text-sm opacity-70">{hint}</p>
	{/if}
</div>
