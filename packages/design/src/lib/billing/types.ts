// Shapes returned by the Ur Brain billing API (see ur_brain /v1/billing/*).

export type Interval = 'month' | 'year';

export interface ApiPlan {
	key: string;
	name: string;
	seat_priced: boolean;
	/** Price in cents per interval. Free has none. */
	prices: Partial<Record<Interval, number>>;
	/** null means unlimited. */
	limits: Record<string, number | boolean | null>;
}

export interface ApiPlans {
	plans: ApiPlan[];
	intervals: Interval[];
	currency: string;
}

export interface LimitCheck {
	code: string;
	scope: string;
	allowed: boolean;
	usage?: number | string | null;
	limit?: number | null;
	message?: string;
}

export interface Entitlement {
	available: boolean;
	plan_key: string;
	plan_name: string;
	admin_comped?: boolean;
	billing_status: string;
	access: { write_allowed: boolean; reason: string | null; grace_until: string | null };
	period: { start: string; end: string };
	limits: Record<string, number | boolean | null>;
	usage: Record<string, number>;
	checks: LimitCheck[];
}

export interface Subscription {
	status: string;
	stripe_price_id?: string | null;
	current_period_end?: string | null;
	cancel_at_period_end?: boolean;
	quantity?: number;
}

export interface BillingStatus {
	owner_id: string;
	configured: boolean;
	stripe_customer_id?: string | null;
	subscription?: Subscription | null;
	entitlement?: Entitlement;
}
