<script lang="ts">
	import NavComponent from '$lib/components/navComponent.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.data.session}
	<NavComponent />
{/if}
<slot />
