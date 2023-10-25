<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title: string;
	export let description: string;

	let isOpen = false;
</script>

<div class="py-4 border-b border-black">
	<button
		on:click={() => (isOpen = !isOpen)}
		class="flex gap-x-4 justify-between items-center w-full"
		aria-label="{isOpen ? 'close' : 'open'} collapsible"
	>
		<h3>{title}</h3>
		<div class="w-6 aspect-square relative">
			<span class="absolute left-0 right-0 h-[2px] bg-cyan top-1/2 -translate-y-1/2" />
			<span
				class:isOpen
				class="absolute left-0 right-0 h-[2px] bg-cyan top-1/2 -translate-y-1/2 transition rotate-90"
			/>
		</div>
	</button>
	{#if isOpen}
		<p class="pt-4" transition:slide={{ duration: 350 }}>{description}</p>
	{/if}
	<p />
</div>

<style lang="postcss">
	.isOpen {
		@apply rotate-0;
	}
</style>
