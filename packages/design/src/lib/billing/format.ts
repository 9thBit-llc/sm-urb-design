import type { ApiPlan, Interval } from './types.js';

export function formatCents(cents: number, currency = 'usd'): string {
	const whole = cents % 100 === 0;
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: whole ? 0 : 2,
		maximumFractionDigits: 2
	}).format(cents / 100);
}

export function formatCount(value: number | null | undefined): string {
	if (value == null) return 'Unlimited';
	if (value >= 1_000_000 && value % 1_000_000 === 0) return `${value / 1_000_000}M`;
	if (value >= 1_000 && value % 1_000 === 0) return `${value / 1_000}K`;
	return new Intl.NumberFormat('en-US').format(value);
}

export function formatBytes(value: number | null | undefined): string {
	if (value == null) return 'Unlimited';
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];
	let size = value;
	let unit = 0;
	while (size >= 1024 && unit < units.length - 1) {
		size /= 1024;
		unit += 1;
	}
	const text = size >= 10 || Number.isInteger(size) ? Math.round(size).toString() : size.toFixed(1);
	return `${text} ${units[unit]}`;
}

/** Whole months of the monthly price saved by paying yearly (10x monthly = 2). */
export function monthsFree(plan: ApiPlan): number {
	const { month, year } = plan.prices;
	if (!month || !year) return 0;
	return Math.max(0, Math.round(12 - year / month));
}

/** Price shown for an interval, for display only. Checkout resolves the real price on the server. */
export function priceLabel(plan: ApiPlan, interval: Interval, currency = 'usd'): string {
	const cents = plan.prices[interval];
	if (cents == null) return 'Free';
	return `${formatCents(cents, currency)}${plan.seat_priced ? ' per seat' : ''} / ${interval === 'month' ? 'mo' : 'yr'}`;
}

function num(plan: ApiPlan, key: string): number | null | undefined {
	const value = plan.limits[key];
	return typeof value === 'boolean' ? undefined : value;
}

function plural(count: number, noun: string): string {
	return `${count} ${noun}${count === 1 ? '' : 's'}`;
}

/** Feature bullets for a plan card, derived from the same catalog the server enforces. */
export function planHighlights(plan: ApiPlan): string[] {
	const lines: string[] = [];
	const ingests = num(plan, 'monthly_ingest_limit');
	if (ingests !== undefined) lines.push(`${formatCount(ingests)} events / month`);
	const storage = num(plan, 'storage_byte_limit');
	if (storage !== undefined) lines.push(`${formatBytes(storage)} storage`);
	const workspaces = num(plan, 'workspace_limit');
	if (workspaces != null) lines.push(plural(workspaces, 'workspace'));
	const keys = num(plan, 'api_key_limit');
	if (keys != null) lines.push(plural(keys, 'agent'));
	if (plan.seat_priced) lines.push('Shared workspaces and coordination');
	const retention = num(plan, 'retention_months');
	lines.push(retention == null ? 'Indefinite memory retention' : `${retention}-month memory window`);
	return lines;
}

const LIMIT_LABELS: Record<string, string> = {
	documents: 'documents',
	monthly_ingests: 'monthly events',
	monthly_embedding_calls: 'monthly embedding calls',
	monthly_embedding_input_tokens: 'monthly embedding tokens',
	monthly_embedding_output_values: 'monthly embedding output',
	api_keys: 'agents (API keys)',
	storage_bytes: 'storage',
	subscription_write_access: 'subscription'
};

export function limitLabel(code: string): string {
	return LIMIT_LABELS[code] ?? code.replaceAll('_', ' ');
}

/** 0 to 1, or null when unlimited. */
export function usageRatio(used: number, limit: number | null | undefined): number | null {
	if (limit == null) return null;
	if (limit <= 0) return 1;
	return Math.min(1, used / limit);
}
