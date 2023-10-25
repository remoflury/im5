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

<main class="min-h-screen relative">
	<div role="presentation" class="blob" />
	<slot />
</main>

<style>
	.blob {
		position: absolute;
		z-index: -10;
		width: 500px;
		height: 500px;
		top: 50%;
		left: 50%;
		transform: translateX(-50%), translateY(-50%);
		background: linear-gradient(180deg, #2924fb 31.77%, #e81cff 100%);
		mix-blend-mode: color-dodge;
		-webkit-animation: move 25s infinite alternate;
		animation: move 25s infinite alternate;
		transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
		filter: blur(5rem);
		opacity: 40%;
	}

	/* @-webkit-keyframes move {
		from {
			transform: translate(-20px, -50px) rotate(-90deg);
			border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
		}

		to {
			transform: translate(20px, 50px) rotate(-10deg);
			border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
		}
	} */

	@keyframes move {
		from {
			/* transform: translate(-20px, -50px) rotate(-90deg); */
			transform: translate(-40%, -35%) rotate(-90deg);
			border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
		}

		to {
			transform: translate(-60%, -65%) rotate(-10deg);
			border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
		}
	}
</style>
