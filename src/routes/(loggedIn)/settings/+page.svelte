<script lang="ts">
	import { enhance } from '$app/forms';
	import InputField from '$lib/components/forms/InputField.svelte';
	import FormMessage from '$lib/components/forms/formMessage.svelte';
	import LoadingSpinner from '$lib/components/forms/loadingSpinner.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import { slide } from 'svelte/transition';

	export let data;
	export let form;

	let loading = false;
	$: if (form) loading = false;
</script>

<section>
	<h1>Settings</h1>
	<p>Hi {data.data.first_name} {data.data.last_name}!</p>
</section>

<section>
	<h2>Change your name</h2>
	<form action="?/editname" use:enhance method="post">
		<InputField type="text" label="First name" fieldName="first_name" />
		<InputField type="text" label="Last name" fieldName="last_name" />
		{#if !loading}
			<PrimaryButton type="submit" text="change name" />
		{:else}
			<LoadingSpinner />
		{/if}
	</form>
	{#if form?.message}
		<div transition:slide={{ duration: 350 }} class="mt-4">
			<FormMessage message={form.message} success={form.success} />
		</div>
	{/if}
</section>
