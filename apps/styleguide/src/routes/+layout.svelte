<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	import {
		brands,
		Container,
		SiteFooter,
		SiteHeader,
		type BrandId
	} from '@sm-urb/design';

	let { children } = $props();

	const nav = [
		{ href: '/', label: 'Overview' },
		{ href: '/foundations', label: 'Foundations' },
		{ href: '/components', label: 'Components' },
		{ href: '/voice', label: 'Voice' }
	];

	const STORAGE_KEY = 'sm-urb-styleguide-brand';

	// Restore the last brand the reviewer chose. Read once at init so the write effect below never sees the default first.
	// Storage can be blocked or absent during prerender, so every access is guarded.
	function savedBrand(): BrandId {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			return saved === 'sm' ? 'sm' : 'urb';
		} catch {
			return 'urb';
		}
	}

	let brand = $state<BrandId>(savedBrand());

	// The theme is a data attribute on <html>. Skeleton's [data-theme] blocks do the rest.
	$effect(() => {
		document.documentElement.dataset.theme = brands[brand].theme;
		try {
			localStorage.setItem(STORAGE_KEY, brand);
		} catch {
			/* Storage unavailable: the toggle still works for this page view. */
		}
	});
</script>

<svelte:head>
	<title>{brands[brand].name} · Design language</title>
	<meta name="description" content="Shared design language for StructuredMerge and Ur Brain." />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<div class="preset-tonal-surface border-surface-200-800 border-b">
		<Container>
			<div class="flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
				<p class="eyebrow">Styleguide preview</p>
				<div class="flex gap-2" role="group" aria-label="Brand theme">
					{#each Object.values(brands) as b (b.id)}
						<button
							type="button"
							class="btn btn-sm {brand === b.id ? 'preset-filled-primary-500' : 'preset-outlined-primary-500'}"
							aria-pressed={brand === b.id}
							onclick={() => (brand = b.id)}
						>
							{b.name}
						</button>
					{/each}
				</div>
			</div>
		</Container>
	</div>

	<SiteHeader {brand} {nav} pathname={page.url.pathname} />

	<main class="flex-1 py-12">
		<Container>
			{@render children()}
		</Container>
	</main>

	<SiteFooter {brand} />
</div>
