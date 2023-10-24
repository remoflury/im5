<script lang="ts">
	import { menu } from '$lib/stores/stores';
</script>

<button
	aria-label="toggle menu"
	class="w-10 h-6 relative z-50"
	on:click={() => ($menu.isOpen = !$menu.isOpen)}
>
	<span
		class="absolute left-0 right-0 top-0 h-[2px] bg-black transition {$menu.isOpen
			? 'rotate-45 translate-y-3 delay-150'
			: ''}"
	/>
	<span
		class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-black transition {$menu.isOpen
			? '-translate-x-full opacity-0'
			: 'delay-150'}"
	/>
	<span
		class="absolute left-0 right-0 top-full h-[2px] bg-black transition {$menu.isOpen
			? '-rotate-45 -translate-y-3 delay-150'
			: ''}"
	/>
</button>
