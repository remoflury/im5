<script lang="ts">
	import { enhance } from '$app/forms';
	import InputField from '$lib/components/forms/InputField.svelte';
	import FormMessage from '$lib/components/forms/formMessage.svelte';
	import LoadingSpinner from '$lib/components/forms/loadingSpinner.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import { slide } from 'svelte/transition';
	export let form;

	let loading = false;

	$: if (form) loading = false;
</script>

<section>
	<form method="post" action="?/login" use:enhance on:submit={() => (loading = true)}>
		<InputField
			type="email"
			label="Email"
			fieldName="email"
			error={form?.errors?.email?.[0] ?? ''}
		/>
		{#if !loading}
			<PrimaryButton text="Login" />
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
