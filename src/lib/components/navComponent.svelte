<script lang="ts">
	import type { NavItemsProps, UserTableProps } from '$lib/types/types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { menu } from '$lib/stores/stores';
	import Burger from '$lib/ui/nav/burger.svelte';
	import PrimaryButton from './primaryButton.svelte';
	import { enhance } from '$app/forms';

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
			title: 'Add new Project',
			slug: '/add-project',
			visibleForRole: 'ADMIN'
		},
		{
			title: 'Settings',
			slug: '/settings',
			visibleForRole: 'USER'
		}
	];

	onMount(() => {
		setNavHeight();
	});

	const setNavHeight = () => {
		$menu.menuHeight = navElem.clientHeight;
	};
</script>

<svelte:window on:resize={setNavHeight} />

<nav aria-label="menu" class="relative z-50">
	<div class="container py-4" bind:this={navElem}>
		<!-- mobile -->
		<div class="flex justify-end lg:hidden">
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
									<a class="" href={entry.slug} on:click={() => ($menu.isOpen = false)}>
										{entry.title}
									</a>
								</li>
							{/if}
						{/each}
						<li class="mt-8">
							<form action="/?/logout" method="post" use:enhance>
								<PrimaryButton text="Logout" />
							</form>
						</li>
					</ul>
				</aside>
			{/if}
		</div>
		<!-- desktop -->
		<ul class="hidden lg:flex items-center justify-end gap-x-12 lg:gap-x-14">
			{#each navItems as entry, index (index)}
				{#if user.role === 'ADMIN' || user.role === entry.visibleForRole}
					<li
						class="relative after:absolute after:left-0 after:bottom-0 after:right-0 after:h-[0.15em] after:bg-cyan after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition"
					>
						<a class="" href={entry.slug} on:click={() => ($menu.isOpen = false)}>
							{entry.title}
						</a>
					</li>
				{/if}
			{/each}
			<li class="">
				<form action="/?/logout" method="post" use:enhance>
					<PrimaryButton text="Logout" spacingTop={false} />
				</form>
			</li>
		</ul>
	</div>
</nav>
