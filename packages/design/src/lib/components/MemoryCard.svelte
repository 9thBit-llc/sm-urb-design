<script lang="ts">
	import { Clock } from '../icons.js';
	import Badge from './Badge.svelte';

	type State = 'current' | 'superseded' | 'aged';

	interface Memory {
		title: string;
		scope: string;
		state: State;
		updatedAt: string;
		source: string;
	}

	let { memory }: { memory: Memory } = $props();

	const stateTone: Record<State, 'success' | 'neutral' | 'warning'> = {
		current: 'success',
		superseded: 'neutral',
		aged: 'warning'
	};
</script>

<article class="card preset-outlined-surface-200-800 lift rounded-container flex flex-col gap-3 p-5">
	<div class="flex flex-wrap items-center gap-2">
		<Badge tone={stateTone[memory.state]}>{memory.state}</Badge>
		<Badge tone="neutral">{memory.scope}</Badge>
	</div>
	<h3 class="text-lg">{memory.title}</h3>
	<p class="flex items-center gap-2 text-sm opacity-70">
		<Clock class="size-4" aria-hidden="true" />
		<time datetime={memory.updatedAt}>{memory.updatedAt}</time>
		<span aria-hidden="true">·</span>
		<span>{memory.source}</span>
	</p>
</article>
