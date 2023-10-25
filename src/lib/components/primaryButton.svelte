<script lang="ts">
	export let text: string;
	export let color: 'cyan' | 'magenta' = 'cyan';
	export let type: 'button' | 'submit' = 'submit';
	export let spacingTop = true;
</script>

<button
	{type}
	class:spacingTop
	class="px-8 py-2 rounded-md text-white max-w-max {color == 'cyan'
		? 'bg-cyan'
		: 'text-magenta'} hover:opacity-90 transition"
>
	{text}
</button>

<style lang="postcss">
	.spacingTop {
		@apply mt-6;
	}
</style>
