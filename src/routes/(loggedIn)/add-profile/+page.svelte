<script lang="ts">
	import { enhance } from '$app/forms';
	import InputField from '$lib/components/forms/InputField.svelte';
	import FormMessage from '$lib/components/forms/formMessage.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import { slide } from 'svelte/transition';

	export let data;
	export let form;

	console.log(data.companies);

	let loading = false;
	$: if (form) loading = false;

	$: console.log(form);
</script>

<section>
	<h1>Add Profile</h1>
	<form action="?/addprofile" method="post" use:enhance>
		<InputField
			type="text"
			fieldName="first_name"
			label="First Name"
			error={form?.errors?.first_name?.[0] ?? ''}
		/>
		<InputField
			type="text"
			fieldName="last_name"
			label="Last Name"
			error={form?.errors?.last_name?.[0] ?? ''}
		/>
		<InputField
			type="email"
			fieldName="email"
			label="Email"
			error={form?.errors?.email?.[0] ?? ''}
		/>

		<div class="mt-4">
			<label for="company">Company <sup class="text-red">*</sup></label>
			<select name="company" id="company" required>
				{#each data.companies as company (company.id)}
					<option value={company.id}>{company.company}</option>
				{/each}
			</select>
		</div>

		<div class="mt-4">
			<label for="is-admin">Is user an admin?</label>
			<fieldset id="is-admin">
				<div class="flex flex-row-reverse gap-x-4 items-center justify-end accent-cyan mt-1">
					<label for="is-admin-false">No</label>
					<input type="radio" name="is_admin" id="is-admin-false" checked />
				</div>
				<div class="flex flex-row-reverse gap-x-4 items-center justify-end accent-cyan mt-2">
					<label for="is-admin-true">Yes</label>
					<input type="radio" name="is_admin" id="is-admin-true" />
				</div>
			</fieldset>
		</div>

		<PrimaryButton text="Add Profile" />
	</form>
	{#if form?.message}
		<div transition:slide={{ duration: 350 }} class="mt-4">
			<FormMessage message={form.message} success={form.success} />
		</div>
	{/if}
</section>