<script lang="ts">
	import { brands, Card, Section, voice, Stamp } from '@9thbit-llc/sm-urb-design';

	const lines = [
		['Empty state', 'empty'],
		['Success', 'ingestDone'],
		['Not found', 'notFound']
	] as const;
</script>

<div class="flex flex-col gap-16">
	<Section eyebrow="Voice" title="Fun and smart, with a different joke for each brand" lede="The rule for both: say the clever thing once, then get out of the way.">
		<div class="grid gap-4 md:grid-cols-2">
			<Card title={brands.urb.name}>
				<p class="text-xl font-display font-bold">"{voice.urb.tagline}"</p>
				<p>{voice.urb.support}</p>
				<p class="text-sm opacity-70">URB's joke is about memory and time: it remembers, it ages things, and it says so plainly.</p>
				{#snippet footer()}<Stamp>Retro, not nostalgic</Stamp>{/snippet}
			</Card>
			<Card title={brands.sm.name}>
				<p class="text-xl font-bold">"{voice.sm.tagline}"</p>
				<p>{voice.sm.support}</p>
				<p class="text-sm opacity-70">SM's joke is precision: it is exact, it is never smug, and a conflict is a feature, not a failure.</p>
			</Card>
		</div>
	</Section>

	<Section eyebrow="Microcopy" title="Same moments, two accents">
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr><th>Moment</th><th>{brands.urb.name}</th><th>{brands.sm.name}</th></tr>
				</thead>
				<tbody>
					{#each lines as [label, key] (key)}
						<tr>
							<td class="font-semibold">{label}</td>
							<td>{voice.urb[key]}</td>
							<td>{voice.sm[key]}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-sm opacity-70">These are drafts. The operator approves the final wording before anything ships publicly.</p>
	</Section>
</div>
