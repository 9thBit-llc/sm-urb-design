<script lang="ts">
	import { Copy } from '../icons.js';

	let { code, label = 'code' }: { code: string; label?: string } = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			// Clipboard can be blocked (permissions, insecure context). The text stays selectable.
		}
	}
</script>

<figure class="card preset-tonal-surface rounded-container flex flex-col overflow-hidden">
	<figcaption class="flex items-center justify-between gap-3 px-4 pt-3 text-xs opacity-70">
		<span class="eyebrow">{label}</span>
		<button type="button" class="btn-icon preset-tonal-surface" onclick={copy} aria-label="Copy code">
			<Copy class="size-4" aria-hidden="true" />
			<span class="sr-only">{copied ? 'Copied' : 'Copy'}</span>
		</button>
	</figcaption>
	<pre class="overflow-x-auto p-4 text-sm"><code>{code}</code></pre>
</figure>
