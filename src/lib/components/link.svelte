<script lang="ts">
	export let text: string;
	export let href: string;
	export let target: '' | '_blank' = '';
</script>

<a
	{href}
	{target}
	title={text}
	class="inline-block mt-4 text-cyan text-xs underline hover:opacity-80 transition"
>
	{text}
</a>
