<script lang="ts">
	let {
		id,
		label,
		value = $bindable(''),
		hint,
		error,
		placeholder,
		type = 'text'
	}: {
		id: string;
		label: string;
		value?: string;
		hint?: string;
		error?: string;
		placeholder?: string;
		type?: string;
	} = $props();

	const hintId = $derived(`${id}-hint`);
</script>

<div class="flex flex-col gap-1.5">
	<label class="font-semibold" for={id}>{label}</label>
	<input
		{id}
		{type}
		{placeholder}
		bind:value
		class="input preset-outlined-surface-400-600 rounded-base px-3 py-2"
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={hint || error ? hintId : undefined}
	/>
	{#if error}
		<p id={hintId} class="text-sm text-error-600">{error}</p>
	{:else if hint}
		<p id={hintId} class="text-sm opacity-70">{hint}</p>
	{/if}
</div>
