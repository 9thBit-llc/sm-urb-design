// Per-brand identity: the only data a site needs to pick its flavor.
// Components read this for names and voice; colors and shape come from the theme CSS.

export type BrandId = 'urb' | 'sm';

export interface Brand {
	id: BrandId;
	name: string;
	/** Two-letter mark shown in the wordmark. */
	mark: string;
	/** One-line positioning used in headers and meta descriptions. */
	tagline: string;
	/** Short sentence for footers and about blurbs. */
	blurb: string;
	/** Theme name passed to `data-theme`. Matches the `[data-theme]` block in styles/<id>.css. */
	theme: BrandId;
}

export const brands: Record<BrandId, Brand> = {
	urb: {
		id: 'urb',
		name: 'Ur Brain',
		mark: 'UB',
		tagline: 'Remember the 90s? Me too.',
		blurb: 'Durable, time-aware memory for AI agents. It knows what changed and when.',
		theme: 'urb'
	},
	sm: {
		id: 'sm',
		name: 'StructuredMerge',
		mark: 'SM',
		tagline: 'Merge the structure. Keep the meaning.',
		blurb: 'Deterministic structural merge and canonical ingestion, with reviewable conflicts.',
		theme: 'sm'
	}
};
