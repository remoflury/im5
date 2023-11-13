<script lang="ts">
	import { enhance } from '$app/forms';
	import InputField from '$lib/components/forms/InputField.svelte';
	import FormMessage from '$lib/components/forms/formMessage.svelte';
	import LoadingSpinner from '$lib/components/forms/loadingSpinner.svelte';
	import Link from '$lib/components/link.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import type { SearchedCompanyProps } from '$lib/types/types.js';
	import { slide } from 'svelte/transition';

	export let form;

	let loading = false;
	let searchedCompanies: SearchedCompanyProps[] = [];
	$: if (form) loading = false;

	const handleSearch = async (searchQuery: string) => {
		if (!searchQuery) return (searchedCompanies = []);
		const response = await fetch(`/api/search/companies?search=${searchQuery}`);
		const data = await response.json();
		searchedCompanies = [...data];
	};
</script>

<section>
	<h1>Add new company</h1>
	<form action="?/addcompany" method="post" use:enhance on:submit={() => (loading = true)}>
		<InputField
			type="text"
			fieldName="company"
			label="Company"
			error={form?.errors?.company?.[0] ?? ''}
		/>
		<InputField
			type="text"
			fieldName="companyid"
			label="Company id"
			error={form?.errors?.companyid?.[0] ?? ''}
		/>

		{#if !loading}
			<PrimaryButton text="Add company" />
		{:else}
			<LoadingSpinner />
		{/if}
	</form>
	{#if form?.message}
		<div transition:slide={{ duration: 350 }} class="mt-4">
			<FormMessage message={form.message} success={form.success} />
		</div>
	{/if}
	<Link text="Company already exists? Add Profile to Customer." href="/add-profile" />
</section>
<section>
	<h2>Search existing companies</h2>
	<form />
	<InputField
		on:handleChange={(e) => handleSearch(e.detail.inputValue)}
		type="search"
		fieldName="search"
		label="Search company names"
	/>
	{#if searchedCompanies.length}
		<article>
			<ul class="mt-4">
				{#each searchedCompanies as company}
					<li>
						<p>{company.company}, {company.company_id}</p>
					</li>
				{/each}
			</ul>
		</article>
	{/if}
</section>
