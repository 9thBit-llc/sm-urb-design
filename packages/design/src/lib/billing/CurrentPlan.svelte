<script lang="ts">
	import type { BillingStatus } from './types.js';
	import { limitLabel } from './format.js';
	import Badge from '../components/Badge.svelte';
	import Button from '../components/Button.svelte';
	import Callout from '../components/Callout.svelte';
	import UsageMeter from './UsageMeter.svelte';

	let {
		billing,
		onManage,
		onUpgrade
	}: {
		billing: BillingStatus;
		/** Opens the Stripe Customer Portal. */
		onManage: () => void;
		onUpgrade: () => void;
	} = $props();

	const entitlement = $derived(billing.entitlement);
	const subscription = $derived(billing.subscription);
	const tones: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
		active: 'success',
		trialing: 'success',
		admin_comped: 'success',
		past_due: 'warning',
		free: 'neutral',
		canceled: 'neutral'
	};
	const blocked = $derived((entitlement?.checks ?? []).filter((check) => !check.allowed));
	const date = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' }) : null);
	const paid = $derived(entitlement != null && entitlement.plan_key !== 'free');
	const meters = $derived(
		entitlement
			? [
					{ label: 'Events this period', used: entitlement.usage.monthly_ingest_count, limit: entitlement.limits.monthly_ingest_limit, unit: 'count' as const },
					{ label: 'Storage', used: entitlement.usage.storage_bytes, limit: entitlement.limits.storage_byte_limit, unit: 'bytes' as const },
					{ label: 'Documents', used: entitlement.usage.document_count, limit: entitlement.limits.document_limit, unit: 'count' as const },
					{ label: 'Memories', used: entitlement.usage.active_memory_count, limit: entitlement.limits.active_memory_limit, unit: 'count' as const },
					{ label: 'Workspaces', used: entitlement.usage.workspace_count, limit: entitlement.limits.workspace_limit, unit: 'count' as const },
					{ label: 'Agents (API keys)', used: entitlement.usage.api_key_count, limit: entitlement.limits.api_key_limit, unit: 'count' as const }
				].map((meter) => ({ ...meter, used: Number(meter.used ?? 0), limit: meter.limit as number | null | undefined }))
			: []
	);
</script>

<section class="card preset-outlined-surface-200-800 flex flex-col gap-5 rounded-container p-6" aria-labelledby="current-plan">
	{#if !billing.configured}
		<Callout tone="info" title="Billing is not set up here">Plans are shown for reference. Paid upgrades are unavailable until billing is configured.</Callout>
	{/if}
	<header class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex items-center gap-3">
			<h2 id="current-plan">{entitlement?.plan_name ?? 'Free'}</h2>
			{#if entitlement}<Badge tone={tones[entitlement.billing_status] ?? 'warning'}>{entitlement.billing_status.replaceAll('_', ' ')}</Badge>{/if}
		</div>
		<div class="flex flex-wrap gap-3">
			{#if billing.stripe_customer_id}<Button variant="outline" onclick={onManage}>Manage billing</Button>{/if}
			{#if !paid}<Button onclick={onUpgrade}>Upgrade</Button>{/if}
		</div>
	</header>

	{#if subscription?.current_period_end && paid}
		<p class="text-sm opacity-80">
			{subscription.cancel_at_period_end ? 'Ends' : 'Renews'}
			{date(subscription.current_period_end)}{#if subscription.quantity && subscription.quantity > 1}, {subscription.quantity} seats{/if}
		</p>
	{/if}

	{#if entitlement?.access.reason === 'past_due_grace'}
		<Callout tone="warning" title="Payment failed">
			Update your payment method by {date(entitlement.access.grace_until)} to keep your plan. <button type="button" class="underline" onclick={onManage}>Update payment method</button>
		</Callout>
	{/if}

	{#if blocked.length > 0}
		<Callout tone="warning" title="You have reached a limit">
			New ingests are paused: {blocked.map((check) => limitLabel(check.code)).join(', ')}.
			{#if !paid}<button type="button" class="underline" onclick={onUpgrade}>See plans</button>{/if}
		</Callout>
	{/if}

	<div class="grid gap-4 sm:grid-cols-2">
		{#each meters as meter (meter.label)}
			<UsageMeter {...meter} />
		{/each}
	</div>
</section>
