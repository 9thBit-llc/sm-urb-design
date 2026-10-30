<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';

	// Skeleton preset classes stay literal here so Tailwind generates them.
	const variants: Record<Variant, string> = {
		primary: 'btn preset-filled-primary-600 lift',
		secondary: 'btn preset-filled-secondary-600 lift',
		tertiary: 'btn preset-filled-tertiary-500 lift',
		outline: 'btn preset-outlined-primary-500',
		ghost: 'btn preset-tonal-primary'
	};

	let {
		variant = 'primary',
		href,
		children,
		...rest
	}: {
		variant?: Variant;
		href?: string;
		children: Snippet;
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes = $props();
</script>

{#if href}
	<a class={variants[variant]} {href} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button type="button" class={variants[variant]} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
