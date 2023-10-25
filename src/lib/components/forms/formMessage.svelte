<script lang="ts">
	export let success = true;
	export let message: string;
	export let additionalMessage: string = '';
</script>

<p class="px-6 py-4 {success ? 'text-white bg-green' : 'text-white bg-red'}">
	{message}
	{#if additionalMessage}
		<br />
		{additionalMessage}
	{/if}
</p>
