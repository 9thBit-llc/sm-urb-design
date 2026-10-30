<script lang="ts">
	import Wordmark from './Wordmark.svelte';
	import type { BrandId } from '../brands.js';

	interface NavItem {
		href: string;
		label: string;
	}

	let { brand, nav, pathname }: { brand: BrandId; nav: NavItem[]; pathname: string } = $props();

	function isActive(href: string) {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<header class="border-surface-200-800 bg-surface-50-950/80 sticky top-0 z-10 border-b backdrop-blur-md">
	<div class="mx-auto flex w-[calc(100%-2rem)] max-w-[1280px] flex-wrap items-center justify-between gap-4 py-3">
		<Wordmark {brand} />
		<nav aria-label="Primary navigation" class="flex flex-wrap gap-1">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					class="rounded-base px-3 py-2 text-sm font-semibold no-underline {isActive(item.href)
						? 'preset-tonal-primary'
						: 'opacity-75 hover:opacity-100'}"
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
