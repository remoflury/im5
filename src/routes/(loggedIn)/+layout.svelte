<script lang="ts">
	import NavComponent from '$lib/components/navComponent.svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
</script>

{#if $page.data.session}
	<NavComponent />
{/if}

{#key $page.url.pathname}
	<div
		class="logged-in-container"
		in:fly={{ y: 10, duration: 200, delay: 400, easing: cubicOut }}
		out:fly={{ y: 10, duration: 200, easing: cubicOut }}
	>
		<slot />
	</div>
{/key}
