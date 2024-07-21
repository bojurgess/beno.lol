<script lang="ts">
	import type { Link } from '$lib/types';
	import {
		autoUpdate,
		offset,
		flip,
		arrow,
		useFloating,
		FloatingArrow,
		useHover,
		useInteractions,
		useRole,
		useDismiss
	} from '@skeletonlabs/floating-ui-svelte';
	import { animate, spring } from 'motion';
	import { fade } from 'svelte/transition';
	import LinkButton from './LinkButton.svelte';

	interface Props {
		links: Link[];
	}

	const { links }: Props = $props();

	let first = $state(true);

	let chip: HTMLDivElement;
	let current: HTMLButtonElement | null = $state(null);

	$effect(() => {
		if (first) {
			const el = document.getElementById('link-1') as HTMLDivElement;

			chip.style.opacity = '0';
			chip.style.width = `${4}rem`;
			chip.style.transform = `translateX(${el.offsetLeft - el.offsetWidth / 16}px)`;

			first = false;
			return;
		}

		if (!current) {
			animate(
				chip,
				{
					opacity: 0
				},
				{ easing: spring(), duration: 0.2 }
			);

			return;
		}

		const id = parseInt(current.id.split('-')[1]);
		const link = links.find((l) => l.id === id) as Link;

		animate(
			chip,
			{
				transform: `translateX(${current.offsetLeft - current.offsetWidth / 16}px)`
			},
			{ easing: spring(), duration: 0.2 }
		);

		animate(
			chip,
			{
				opacity: 1,
				backgroundColor: link.color
			},
			{ easing: spring(), duration: 0.2 }
		);
	});
</script>

<div id="links" class="flex relative rounded-full p-1 bg-black shadow-xl">
	<div
		id="link-chip"
		bind:this={chip}
		style="opacity: 0;"
		class="absolute h-12 grow rounded-full pointer-events-none z-0 left-1"
	></div>

	{#each links as l, i (l.id)}
		<LinkButton link={l} bind:current />
	{/each}
</div>
