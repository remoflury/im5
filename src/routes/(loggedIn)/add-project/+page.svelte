<script lang="ts">
	import { enhance } from '$app/forms';
	import InputField from '$lib/components/forms/InputField.svelte';
	import FormMessage from '$lib/components/forms/formMessage.svelte';
	import LoadingSpinner from '$lib/components/forms/loadingSpinner.svelte';
	import TextareaField from '$lib/components/forms/textareaField.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import { slide } from 'svelte/transition';

	export let data;
	export let form;

	let loading = false;
	$: if (form) loading = false;
</script>

<section>
	<h1>Add new project</h1>

	<form action="?/addproject" method="post" use:enhance on:submit={() => (loading = true)}>
		<InputField
			type="text"
			label="Projectname"
			fieldName="project_name"
			error={form?.errors?.project_name?.[0] ?? ''}
		/>
		<TextareaField
			label="Project description"
			fieldName="project_description"
			error={form?.errors?.description?.[0] ?? ''}
		/>

		<div class="mt-4">
			<label for="person">Person</label>
			<select name="person" id="person">
				{#each data.profiles as profile, index (index)}
					<option value={profile.user_uid}>
						{profile.first_name}
						{profile.last_name}, {profile.company}
					</option>
				{/each}
			</select>
		</div>
		{#if !loading}
			<PrimaryButton text="Add Project" />
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
