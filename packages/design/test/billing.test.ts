import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes, formatCents, formatCount, limitLabel, monthsFree, planHighlights, priceLabel, usageRatio } from '../src/lib/billing/format.ts';
import { BillingError, createBillingClient } from '../src/lib/billing/client.ts';

const pro = { key: 'pro', name: 'Pro', seat_priced: false, prices: { month: 1000, year: 10000 }, limits: { monthly_ingest_limit: 100000, storage_byte_limit: 5368709120, workspace_limit: 10, api_key_limit: 20, retention_months: null } };
const free = { key: 'free', name: 'Free', seat_priced: false, prices: {}, limits: { monthly_ingest_limit: 10000, storage_byte_limit: 104857600, workspace_limit: 1, api_key_limit: 1, retention_months: 12 } };
const team = { ...pro, key: 'team', name: 'Team', seat_priced: true, prices: { month: 2500, year: 25000 } };

test('formats money, counts and bytes', () => {
	assert.equal(formatCents(300), '$3');
	assert.equal(formatCents(295), '$2.95');
	assert.equal(formatCount(10000), '10K');
	assert.equal(formatCount(500000), '500K');
	assert.equal(formatCount(1234), '1,234');
	assert.equal(formatCount(null), 'Unlimited');
	assert.equal(formatBytes(104857600), '100 MB');
	assert.equal(formatBytes(5368709120), '5 GB');
	assert.equal(formatBytes(1536), '1.5 KB');
});

test('annual is two months free and labels per seat', () => {
	assert.equal(monthsFree(pro), 2);
	assert.equal(monthsFree(free), 0);
	assert.equal(priceLabel(pro, 'year'), '$100 / yr');
	assert.equal(priceLabel(team, 'month'), '$25 per seat / mo');
	assert.equal(priceLabel(free, 'month'), 'Free');
});

test('plan highlights come from the limits', () => {
	assert.deepEqual(planHighlights(free), ['10K events / month', '100 MB storage', '1 workspace', '1 agent', '12-month memory window']);
	assert.ok(planHighlights(pro).includes('Indefinite memory retention'));
	assert.ok(planHighlights(team).includes('Shared workspaces and coordination'));
});

test('usage ratio caps at one and handles unlimited and zero limits', () => {
	assert.equal(usageRatio(50, 100), 0.5);
	assert.equal(usageRatio(500, 100), 1);
	assert.equal(usageRatio(5, null), null);
	assert.equal(usageRatio(0, 0), 1);
	assert.equal(limitLabel('monthly_ingests'), 'monthly events');
	assert.equal(limitLabel('some_new_code'), 'some new code');
});

function fakeFetch(responses: Record<string, { status?: number; body: unknown }>) {
	const calls: { url: string; init: RequestInit }[] = [];
	const impl = async (url: string, init: RequestInit = {}) => {
		calls.push({ url, init });
		const hit = responses[`${init.method ?? 'GET'} ${new URL(url).pathname}`];
		return new Response(JSON.stringify(hit.body), { status: hit.status ?? 200 });
	};
	return { impl: impl as unknown as typeof fetch, calls };
}

test('client sends plan and interval, never a price id, with a bearer token', async () => {
	const { impl, calls } = fakeFetch({ 'POST /v1/billing/checkout': { status: 201, body: { checkout_session: { url: 'https://checkout.stripe.test/x' } } } });
	const client = createBillingClient({ baseUrl: 'https://api.test/', getToken: async () => 'tok', fetch: impl });

	const url = await client.checkoutUrl({ ownerId: 'o1', plan: 'team', interval: 'year', quantity: 3 });

	assert.equal(url, 'https://checkout.stripe.test/x');
	assert.equal(calls[0].url, 'https://api.test/v1/billing/checkout');
	assert.equal((calls[0].init.headers as Headers).get('Authorization'), 'Bearer tok');
	const body = JSON.parse(calls[0].init.body as string);
	assert.deepEqual(body, { owner_id: 'o1', plan: 'team', interval: 'year', quantity: 3 });
	assert.ok(!('price_id' in body));
});

test('plans is public and status unwraps billing', async () => {
	const { impl, calls } = fakeFetch({
		'GET /v1/billing/plans': { body: { plans: [pro], intervals: ['month', 'year'], currency: 'usd' } },
		'GET /v1/billing/status': { body: { billing: { owner_id: 'o1', configured: true } } }
	});
	let tokens = 0;
	const client = createBillingClient({ baseUrl: 'https://api.test', getToken: async () => (tokens++, 'tok'), fetch: impl });

	assert.equal((await client.plans()).plans[0].key, 'pro');
	assert.equal(tokens, 0);
	assert.equal((calls[0].init.headers as Headers).has('Authorization'), false);
	assert.equal((await client.status('o 1')).owner_id, 'o1');
	assert.equal(calls[1].url, 'https://api.test/v1/billing/status?owner_id=o%201');
});

test('client turns API errors into BillingError with the server code', async () => {
	const { impl } = fakeFetch({ 'POST /v1/billing/checkout': { status: 422, body: { error: { code: 'subscription_exists', message: 'subscription_exists' } } } });
	const client = createBillingClient({ baseUrl: 'https://api.test', getToken: async () => 't', fetch: impl });

	await assert.rejects(client.checkoutUrl({ ownerId: 'o', plan: 'pro', interval: 'month' }), (error: unknown) => {
		assert.ok(error instanceof BillingError);
		assert.equal(error.code, 'subscription_exists');
		assert.equal(error.status, 422);
		return true;
	});
});
