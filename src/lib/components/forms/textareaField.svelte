<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let fieldName: string;
	export let value: string = '';
	export let label: string;
	export let required: boolean = true;
	export let error: string = '';

	let inputElem: HTMLTextAreaElement;
	let inputElemHeight: number;
	let labelElem: HTMLLabelElement;
	let preventTransform = false;

	onMount(() => {
		inputElemHeight = inputElem.clientHeight;
	});

	const isInputEmpty = (event: Event) => {
		const inputElement = event.target as HTMLInputElement;
		value = inputElement.value;

		if (value) preventTransform = true;
		if (!value) preventTransform = false;
	};
</script>

<div class="relative mt-4 first-of-type:mt-0 isolate">
	<label
		class="absolute bg-white p-1 translate-y-1/2 transition left-4 hover:cursor-text"
		style={`transform: translateY(calc(${inputElemHeight / 4}px - 50%))`}
		bind:this={labelElem}
		for={label}
	>
		{label}
		{#if required}
			<sup class="text-red">*</sup>
		{/if}
	</label>
	<textarea
		class="resize-none h-20"
		on:input={isInputEmpty}
		on:focusin={() => {
			labelElem.style.transform = `translateY(-50%)`;
		}}
		on:focusout={() => {
			if (!preventTransform)
				labelElem.style.transform = `translateY(calc(${inputElemHeight / 4}px - 50%))`;
		}}
		bind:this={inputElem}
		name={fieldName}
		{required}
		{value}
		id={label}
	/>
	{#if error}
		<p transition:slide={{ duration: 350 }} class="text-xs text-red">{error}</p>
	{/if}
</div>
