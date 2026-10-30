<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import {
		Badge,
		Button,
		Callout,
		Card,
		CodeBlock,
		Container,
		Eyebrow,
		IngestDelta,
		MemoryCard,
		Section,
		Stamp,
		Stat,
		TextField,
		VersionTimeline,
		Wordmark
	} from '@sm-urb/design';

	let email = $state('');
	let emailError = $derived(email && !email.includes('@') ? 'Enter an address with an @ sign.' : undefined);

	const memories = [
		{ title: 'Q3 pricing decision', scope: 'workspace: finance', state: 'current' as const, updatedAt: '2026-10-12', source: 'slack export' },
		{ title: 'Old onboarding flow', scope: 'workspace: product', state: 'superseded' as const, updatedAt: '2026-03-02', source: 'notion page' },
		{ title: 'Vendor SLA, 2024', scope: 'workspace: legal', state: 'aged' as const, updatedAt: '2024-11-18', source: 'pdf upload' }
	];

	const versions = [
		{ version: 'v4', at: '2026-10-28', summary: 'Pricing table revised. Two rows changed, one removed.' },
		{ version: 'v3', at: '2026-09-14', summary: 'Added enterprise tier and the new SLA footnote.' },
		{ version: 'v2', at: '2026-07-01', summary: 'First import from the shared drive.' }
	];

	const snippet = 'ur-brain ingest --workspace finance --source pricing.md --since v3';
</script>

<div class="flex flex-col gap-16">
	<Section eyebrow="Actions" title="Button">
		<div class="flex flex-wrap items-center gap-3">
			<Button>Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="tertiary">Tertiary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button href="/voice">As a link</Button>
			<Button disabled>Disabled</Button>
		</div>
	</Section>

	<Section eyebrow="Status" title="Badge and Callout">
		<div class="flex flex-wrap gap-2">
			<Badge>neutral</Badge>
			<Badge tone="primary">primary</Badge>
			<Badge tone="secondary">secondary</Badge>
			<Badge tone="tertiary">tertiary</Badge>
			<Badge tone="success">success</Badge>
			<Badge tone="warning">warning</Badge>
			<Badge tone="error">error</Badge>
		</div>
		<div class="grid gap-3">
			<Callout title="Heads up">Ingest runs are idempotent. Re-running one changes nothing it has already merged.</Callout>
			<Callout tone="tip" title="Tip">Pin a version with <code>--since</code> to re-embed only what moved since then.</Callout>
			<Callout tone="warning" title="Aged memory">This memory is older than the retention window and will be reviewed before reuse.</Callout>
			<Callout tone="success">Merged cleanly. No conflicts to review.</Callout>
		</div>
	</Section>

	<Section eyebrow="Surfaces" title="Card, Stat, Stamp">
		<div class="grid gap-4 md:grid-cols-3">
			<Card title="A card">
				<p>Outlined, lifted by the brand's shadow, with optional footer.</p>
				{#snippet footer()}<Button variant="ghost">Open</Button>{/snippet}
			</Card>
			<div class="grid gap-4">
				<Stat label="Memories" value="12,408" hint="Across three workspaces" />
				<Stat label="Re-embedded today" value="318" hint="Only changed chunks" />
			</div>
			<div class="flex flex-col items-start gap-3">
				<Stamp>Remember the 90s?</Stamp>
				<p class="text-sm opacity-70">Stamp is a sticker flourish. Use it once per page at most.</p>
			</div>
		</div>
	</Section>

	<Section eyebrow="Memory" title="MemoryCard and VersionTimeline">
		<div class="grid gap-4 md:grid-cols-3">
			{#each memories as memory (memory.title)}
				<MemoryCard {memory} />
			{/each}
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<VersionTimeline entries={versions} current="v4" />
			<IngestDelta added={14} updated={38} removed={6} unchanged={9120} />
		</div>
	</Section>

	<Section eyebrow="Forms" title="TextField">
		<div class="max-w-md">
			<TextField id="contact-email" label="Work email" type="email" bind:value={email} placeholder="you@company.com" hint="We only use this to reply." error={emailError} />
		</div>
	</Section>

	<Section eyebrow="Navigation" title="Tabs (Skeleton) and Wordmark">
		<Tabs defaultValue="overview">
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="features">Features</Tabs.Trigger>
				<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
				<Tabs.Indicator />
			</Tabs.List>
			<Tabs.Content value="overview"><p class="py-4">Tabs come from Skeleton, so keyboard and ARIA behavior is already handled.</p></Tabs.Content>
			<Tabs.Content value="features"><p class="py-4">Arrow keys move between tabs. Home and End jump to the ends.</p></Tabs.Content>
			<Tabs.Content value="activity"><p class="py-4">Activity content goes here.</p></Tabs.Content>
		</Tabs>
		<div class="flex flex-wrap items-center gap-6">
			<Wordmark brand="urb" href="#" />
			<Wordmark brand="sm" href="#" />
		</div>
	</Section>

	<Section eyebrow="Code" title="CodeBlock">
		<CodeBlock code={snippet} label="shell" />
	</Section>

	<Section eyebrow="Layout" title="Container and Eyebrow">
		<Container>
			<div class="card preset-tonal-surface rounded-container p-6">
				<Eyebrow>Inside a Container</Eyebrow>
				<p>Container clamps the content width. Section gives a heading block and vertical rhythm.</p>
			</div>
		</Container>
	</Section>
</div>
