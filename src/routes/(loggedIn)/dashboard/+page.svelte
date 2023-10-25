<script lang="ts">
	import { enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/primaryButton.svelte';

	export let data;

	const user = data.user;
</script>

<section>
	<h1>Welcome {user.first_name}</h1>

	<div class="mt-8">
		<form action="/?/logout" method="post" use:enhance>
			<PrimaryButton text="Logout" />
		</form>
	</div>
</section>
