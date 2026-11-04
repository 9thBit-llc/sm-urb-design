<script lang="ts">
	import { Callout, CurrentPlan, Eyebrow, PricingTable } from '@9thbit-llc/sm-urb-design';
	import type { ApiPlan, BillingStatus, Interval } from '@9thbit-llc/sm-urb-design';

	// Fixture mirroring GET /v1/billing/plans (prices in cents, limits from catalog.yml).
	const limits = (ingest: number, storage: number, ws: number, keys: number, retention: number | null) => ({
		monthly_ingest_limit: ingest,
		storage_byte_limit: storage,
		workspace_limit: ws,
		api_key_limit: keys,
		retention_months: retention
	});
	const plans: ApiPlan[] = [
		{ key: 'free', name: 'Free', seat_priced: false, prices: {}, limits: limits(10_000, 104_857_600, 1, 1, 12) },
		{ key: 'personal', name: 'Personal', seat_priced: false, prices: { month: 300, year: 3000 }, limits: limits(25_000, 1_073_741_824, 3, 5, null) },
		{ key: 'pro', name: 'Pro', seat_priced: false, prices: { month: 1000, year: 10_000 }, limits: limits(100_000, 5_368_709_120, 10, 20, null) },
		{ key: 'team', name: 'Team', seat_priced: true, prices: { month: 2500, year: 25_000 }, limits: limits(500_000, 26_843_545_600, 50, 100, null) }
	];
	let interval = $state<Interval>('month');
	let chosen = $state('');

	const nearLimit: BillingStatus = {
		owner_id: 'owner-1',
		configured: true,
		stripe_customer_id: null,
		entitlement: {
			available: true, plan_key: 'free', plan_name: 'Free', billing_status: 'free',
			access: { write_allowed: true, reason: null, grace_until: null },
			period: { start: '2026-11-01T00:00:00Z', end: '2026-12-01T00:00:00Z' },
			limits: limits(10_000, 104_857_600, 1, 1, 12),
			usage: { monthly_ingest_count: 10_000, storage_bytes: 92_000_000, document_count: 180, active_memory_count: 4200, workspace_count: 1, api_key_count: 1 },
			checks: [{ code: 'monthly_ingests', scope: 'ingest', allowed: false, usage: 10_000, limit: 10_000 }]
		}
	};
	const pastDue: BillingStatus = {
		owner_id: 'owner-2', configured: true, stripe_customer_id: 'cus_x',
		subscription: { status: 'past_due', current_period_end: '2026-11-20T00:00:00Z', cancel_at_period_end: false },
		entitlement: {
			available: true, plan_key: 'pro', plan_name: 'Pro', billing_status: 'past_due',
			access: { write_allowed: true, reason: 'past_due_grace', grace_until: '2026-11-27T00:00:00Z' },
			period: { start: '2026-10-20T00:00:00Z', end: '2026-11-20T00:00:00Z' },
			limits: limits(100_000, 5_368_709_120, 10, 20, null),
			usage: { monthly_ingest_count: 31_000, storage_bytes: 810_000_000, document_count: 900, active_memory_count: 52_000, workspace_count: 4, api_key_count: 6 },
			checks: []
		}
	};
</script>

<div class="flex flex-col gap-12">
	<section class="flex flex-col gap-4">
		<Eyebrow>Billing</Eyebrow>
		<h1>Pricing and account billing</h1>
		<p class="max-w-2xl opacity-80">
			These components read the plan catalog from the API (<code>GET /v1/billing/plans</code>) and call Checkout and the Customer Portal through a small client. Prices shown here are
			display only: the server picks the Stripe price from the plan and interval.
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2>PricingTable</h2>
		<PricingTable {plans} bind:interval currentPlanKey="free" contactHref="mailto:hello@example.com" onSelect={(plan, i) => (chosen = `${plan.key} / ${i}`)} />
		{#if chosen}<Callout tone="success" title="onSelect called">{chosen}</Callout>{/if}
	</section>

	<section class="flex flex-col gap-4">
		<h2>CurrentPlan: Free, at the event limit</h2>
		<CurrentPlan billing={nearLimit} onManage={() => {}} onUpgrade={() => {}} />
	</section>

	<section class="flex flex-col gap-4">
		<h2>CurrentPlan: Pro, payment failed</h2>
		<CurrentPlan billing={pastDue} onManage={() => {}} onUpgrade={() => {}} />
	</section>
</div>
