<script lang="ts">
	import { page } from '$app/stores';
	import { menu } from '$lib/stores/stores';
	import type { NavItemsProps, UserTableProps } from '$lib/types/types';
	import Burger from '$lib/ui/nav/burger.svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let navElem: HTMLElement;

	let user: UserTableProps = $page.data.user;

	const navItems: NavItemsProps[] = [
		{
			title: 'Home',
			slug: '/dashboard',
			visibleForRole: 'USER'
		},
		{
			title: 'Add Company',
			slug: '/add-company',
			visibleForRole: 'ADMIN'
		},
		{
			title: 'Add profile',
			slug: '/add-profile',
			visibleForRole: 'ADMIN'
		},
		{
			title: 'Settings',
			slug: '/add-customer',
			visibleForRole: 'USER'
		}
	];

	onMount(() => {
		$menu.menuHeight = navElem.clientHeight;
	});
</script>

<nav aria-label="menu" class="relative z-50">
	<div class="container py-4 flex justify-end" bind:this={navElem}>
		<Burger />

		{#if $menu.isOpen}
			<aside
				transition:slide={{ duration: 350 }}
				class="w-full bg-white absolute left-0"
				style={`
				height: calc(100vh - ${$menu.menuHeight}px);
				top: ${$menu.menuHeight}px`}
			>
				<ul class="container h-full flex flex-col gap-y-4 items-end justify-center pr-16">
					{#each navItems as entry, index (index)}
						{#if user.role === 'ADMIN' || user.role === entry.visibleForRole}
							<li>
								<a class="" href={entry.slug} on:click={() => ($menu.isOpen = false)}
									>{entry.title}</a
								>
							</li>
						{/if}
					{/each}
				</ul>
			</aside>
		{/if}
	</div>
</nav>
