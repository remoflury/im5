<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let type: string;
	export let fieldName: string;
	export let value: string | FormDataEntryValue = '';
	export let label: string;
	export let required: boolean = true;
	export let error: string = '';

	let inputElem: HTMLInputElement;
	let inputElemHeight: number;
	let labelElem: HTMLLabelElement;
	let preventTransform = false;
	const dispatch = createEventDispatcher();

	onMount(() => {
		inputElemHeight = inputElem.clientHeight;
	});

	const isInputEmpty = (event: Event) => {
		const inputElement = event.target as HTMLInputElement;
		value = inputElement.value;

		if (value) preventTransform = true;
		if (!value) preventTransform = false;
	};

	const handleChange = () => {
		dispatch('handleChange', {
			inputValue: inputElem.value
		});
	};
</script>

<div class="relative mt-4 first-of-type:mt-0 isolate">
	<label
		class="absolute bg-white p-1 translate-y-1/2 transition left-4 hover:cursor-text"
		style={`transform: translateY(calc(${inputElemHeight / 2}px - 50%))`}
		bind:this={labelElem}
		for={label}
	>
		{label}
		{#if required}
			<sup class="text-red">*</sup>
		{/if}
	</label>
	<input
		on:input={(event) => {
			isInputEmpty(event);
			handleChange();
		}}
		on:focusin={() => {
			labelElem.style.transform = `translateY(-50%)`;
		}}
		on:focusout={() => {
			if (!preventTransform)
				labelElem.style.transform = `translateY(calc(${inputElemHeight / 2}px - 50%))`;
		}}
		bind:this={inputElem}
		name={fieldName}
		{required}
		{type}
		{value}
		id={label}
	/>
	{#if error}
		<p transition:slide={{ duration: 350 }} class="text-xs text-red">{error}</p>
	{/if}
</div>
