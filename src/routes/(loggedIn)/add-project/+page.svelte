<script lang="ts">
	import { enhance } from '$app/forms';
	import InputField from '$lib/components/forms/InputField.svelte';
	import TextareaField from '$lib/components/forms/textareaField.svelte';
	import PrimaryButton from '$lib/components/primaryButton.svelte';

	export let data;
</script>

<section>
	<h1>Add new project</h1>

	<form action="?/addproject" method="post" use:enhance>
		<InputField type="text" label="Projectname" fieldName="project_name" />
		<TextareaField label="Project description" fieldName="project_description" />

		<div class="mt-4">
			<label for="company">Company <sup class="text-red">*</sup></label>
			<select name="company" id="company" required>
				{#each data.profiles as profile, index (index)}
					<option value={profile}>
						{profile.first_name}
						{profile.last_name}, {profile.company}
					</option>
				{/each}
			</select>
		</div>

		<PrimaryButton text="Add Project" />
	</form>
</section>
