// Voice and microcopy. Both brands are fun and smart; the difference is where the joke lands.
// URB plays with memory and time. SM plays with precision and the sharp edge of a merge conflict.
// These strings are drafts for the operator to approve before public launch.

export const voice = {
	urb: {
		/** Hero line; the operator's own tagline idea. */
		tagline: 'Remember the 90s? Me too.',
		/** Supporting line for the hero. Carries the time-aware posture. */
		support: 'Ur Brain remembers what changed, when it changed, and what it meant then.',
		empty: 'Nothing remembered yet. Give it something worth keeping.',
		ingestDone: 'Caught up. Only the changes got re-embedded.',
		notFound: 'That memory has aged out, or never existed. Both happen.'
	},
	sm: {
		tagline: 'Merge the structure. Keep the meaning.',
		support: 'Stable IDs, explicit conflicts, and the same output every time you run it.',
		empty: 'No conflicts. Every merge decision is recorded and reproducible.',
		ingestDone: 'Merged. Each chunk has a stable ID and a content hash.',
		notFound: 'No such fixture. Check the conformance corpus for the current set.'
	}
} as const;
