<script lang="ts">
	export let success = true;
	export let message: string;
</script>

<p class="bg-opacity-25 px-6 py-4 {success ? 'text-green bg-green' : 'text-red bg-red'}">
	{message}
</p>
