<script lang="ts">
	import { enhance } from '$app/forms';
	import Collapsible from '$lib/components/collapsible.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';

	export let data;

	const user = data.user;

	console.log(data.projects);
</script>

<section>
	<h1>Welcome {user.first_name}</h1>

	<article>
		<h2>Your Projects at this company:</h2>

		{#each data.projects as project, index (index)}
			<Collapsible title={project.name} description={project.description} />
		{/each}
	</article>
</section>
