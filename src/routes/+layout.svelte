<script lang="ts">
	import '../css/main.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import NavComponent from '$lib/components/navComponent.svelte';
	export let data;

	// const { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{#if data.session}
	<NavComponent />
{/if}
<main>
	<slot />
</main>
