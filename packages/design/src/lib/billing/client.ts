import type { ApiPlans, BillingStatus, Interval } from './types.js';

export class BillingError extends Error {
	code: string;
	status: number;

	constructor(code: string, status: number, message: string) {
		super(message);
		this.name = 'BillingError';
		this.code = code;
		this.status = status;
	}
}

export interface BillingClientOptions {
	/** API origin, e.g. https://api.example.com (no trailing slash needed). */
	baseUrl: string;
	/** Returns a fresh short-lived access token (WorkOS) for signed-in calls. */
	getToken: () => Promise<string>;
	fetch?: typeof fetch;
}

export interface CheckoutRequest {
	ownerId: string;
	plan: string;
	interval: Interval;
	/** Seats, only for seat-priced plans. */
	quantity?: number;
	email?: string;
}

/**
 * Browser client for the billing API. It never sends a Stripe price id: the
 * server resolves the price from plan and interval. Checkout and the portal
 * return Stripe-hosted URLs; the caller navigates to them.
 */
export function createBillingClient(options: BillingClientOptions) {
	const base = options.baseUrl.replace(/\/+$/, '');
	const doFetch = options.fetch ?? globalThis.fetch.bind(globalThis);

	async function request<T>(path: string, init: RequestInit = {}, authed = true): Promise<T> {
		const headers = new Headers(init.headers);
		if (init.body) headers.set('Content-Type', 'application/json');
		if (authed) headers.set('Authorization', `Bearer ${await options.getToken()}`);
		const response = await doFetch(`${base}${path}`, { ...init, headers });
		const text = await response.text();
		const body = text ? JSON.parse(text) : {};
		if (!response.ok) {
			const error = body?.error ?? {};
			throw new BillingError(error.code ?? 'request_failed', response.status, error.message ?? `Request failed (${response.status})`);
		}
		return body as T;
	}

	return {
		/** Public, no sign-in needed. Safe to call at build time or on the pricing page. */
		plans: () => request<ApiPlans>('/v1/billing/plans', {}, false),

		async status(ownerId: string): Promise<BillingStatus> {
			const body = await request<{ billing: BillingStatus }>(`/v1/billing/status?owner_id=${encodeURIComponent(ownerId)}`);
			return body.billing;
		},

		async checkoutUrl(input: CheckoutRequest): Promise<string> {
			const body = await request<{ checkout_session: { url: string } }>('/v1/billing/checkout', {
				method: 'POST',
				body: JSON.stringify({
					owner_id: input.ownerId,
					plan: input.plan,
					interval: input.interval,
					...(input.quantity ? { quantity: input.quantity } : {}),
					...(input.email ? { email: input.email } : {})
				})
			});
			return body.checkout_session.url;
		},

		async portalUrl(ownerId: string): Promise<string> {
			const body = await request<{ portal_session: { url: string } }>('/v1/billing/portal', {
				method: 'POST',
				body: JSON.stringify({ owner_id: ownerId })
			});
			return body.portal_session.url;
		}
	};
}

export type BillingClient = ReturnType<typeof createBillingClient>;
