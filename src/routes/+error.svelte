<script lang="ts">
	import { page } from '$app/stores';
</script>

<section>
	<h1>Ups, there was an error.</h1>
	<p>{$page.status} {$page.error?.message}</p>

	{#if $page.status === 401}
		<a
			href="/"
			class="px-8 py-2 rounded-md text-white bg-cyan hover:opacity-90 transition mt-4 inline-block max-w-max"
		>
			Login
		</a>
	{:else}
		<a
			href="/dashboard"
			class="px-8 py-2 rounded-md text-white bg-cyan hover:opacity-90 transition mt-4 inline-block max-w-max"
		>
			Home
		</a>
	{/if}
</section>
