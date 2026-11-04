<script lang="ts">
	import type { ApiPlan, Interval } from './types.js';
	import { monthsFree, planHighlights, priceLabel } from './format.js';
	import Badge from '../components/Badge.svelte';
	import Button from '../components/Button.svelte';
	import { Check } from '../icons.js';

	let {
		plans,
		interval = $bindable('month'),
		currentPlanKey,
		highlightKey = 'pro',
		onSelect,
		contactHref
	}: {
		plans: ApiPlan[];
		interval?: Interval;
		currentPlanKey?: string;
		/** Plan to mark as recommended. */
		highlightKey?: string;
		onSelect: (plan: ApiPlan, interval: Interval) => void;
		/** When set, shows an Enterprise card linking here. */
		contactHref?: string;
	} = $props();

	const saved = $derived(Math.max(0, ...plans.map(monthsFree)));
</script>

<div class="flex flex-col gap-8">
	<div class="flex items-center justify-center gap-3" role="group" aria-label="Billing interval">
		<button
			type="button"
			class="btn {interval === 'month' ? 'preset-filled-primary-600' : 'preset-tonal-primary'}"
			aria-pressed={interval === 'month'}
			onclick={() => (interval = 'month')}>Monthly</button
		>
		<button
			type="button"
			class="btn {interval === 'year' ? 'preset-filled-primary-600' : 'preset-tonal-primary'}"
			aria-pressed={interval === 'year'}
			onclick={() => (interval = 'year')}
		>
			Yearly
			{#if saved > 0}<Badge tone="success">{saved} months free</Badge>{/if}
		</button>
	</div>

	<div class="grid gap-4 md:grid-cols-2 {contactHref ? 'xl:grid-cols-5' : 'xl:grid-cols-4'}">
		{#each plans as plan (plan.key)}
			{@const isCurrent = plan.key === currentPlanKey}
			<article
				class="card flex flex-col gap-4 rounded-container p-6 {plan.key === highlightKey ? 'preset-outlined-primary-500 lift' : 'preset-outlined-surface-200-800'}"
				aria-labelledby="plan-{plan.key}"
			>
				<header class="flex items-center justify-between gap-2">
					<h3 id="plan-{plan.key}">{plan.name}</h3>
					{#if isCurrent}<Badge tone="primary">Current</Badge>{:else if plan.key === highlightKey}<Badge tone="tertiary">Popular</Badge>{/if}
				</header>
				<p class="font-display text-2xl font-bold">{priceLabel(plan, interval)}</p>
				<ul class="flex flex-col gap-2 text-sm">
					{#each planHighlights(plan) as line (line)}
						<li class="flex gap-2"><Check class="mt-0.5 size-4 shrink-0" aria-hidden="true" />{line}</li>
					{/each}
				</ul>
				<div class="mt-auto pt-2">
					<Button
						variant={plan.key === highlightKey ? 'primary' : 'outline'}
						disabled={isCurrent}
						onclick={() => onSelect(plan, interval)}
					>
						{#if isCurrent}Your plan{:else if plan.key === 'free'}Start free{:else}Choose {plan.name}{/if}
					</Button>
				</div>
			</article>
		{/each}
		{#if contactHref}
			<article class="card preset-outlined-surface-200-800 flex flex-col gap-4 rounded-container p-6">
				<h3>Enterprise</h3>
				<p class="font-display text-2xl font-bold">Contact us</p>
				<ul class="flex flex-col gap-2 text-sm">
					<li class="flex gap-2"><Check class="mt-0.5 size-4 shrink-0" aria-hidden="true" />SSO, audit logs, SLAs</li>
					<li class="flex gap-2"><Check class="mt-0.5 size-4 shrink-0" aria-hidden="true" />Private deployment</li>
					<li class="flex gap-2"><Check class="mt-0.5 size-4 shrink-0" aria-hidden="true" />Custom storage and retention</li>
				</ul>
				<div class="mt-auto pt-2"><Button variant="outline" href={contactHref}>Talk to us</Button></div>
			</article>
		{/if}
	</div>
</div>
