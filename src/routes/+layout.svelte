<script lang="ts">
	import '../css/main.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
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

<svelte:head>
	<title>IM5 Projekt</title>
</svelte:head>

<main>
	<slot />
</main>
