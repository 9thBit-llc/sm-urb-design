<script lang="ts">
	import { History } from '../icons.js';

	interface Entry {
		version: string;
		at: string;
		summary: string;
	}

	let { entries, current }: { entries: Entry[]; current?: string } = $props();
</script>

<ol class="flex flex-col gap-5">
	{#each entries as entry (entry.version)}
		<li class="grid grid-cols-[auto_1fr] gap-4">
			<span
				class="rounded-base mt-1 grid size-8 place-items-center {entry.version === current
					? 'preset-filled-tertiary-500'
					: 'preset-tonal-surface'}"
			>
				<History class="size-4" aria-hidden="true" />
			</span>
			<div class="flex flex-col gap-1">
				<p class="flex flex-wrap items-center gap-2 text-sm">
					<span class="font-semibold">{entry.version}</span>
					<time class="opacity-70" datetime={entry.at}>{entry.at}</time>
					{#if entry.version === current}
						<span class="eyebrow">now</span>
					{/if}
				</p>
				<p class="opacity-90">{entry.summary}</p>
			</div>
		</li>
	{/each}
</ol>
