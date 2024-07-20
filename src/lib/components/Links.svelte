<script lang="ts">
	import type { Link } from '$lib/types';
	import { animate, spring } from 'motion';

	interface Props {
		links: Link[];
	}

	const { links }: Props = $props();

	let first = $state(true);

	let chip: HTMLDivElement;
	let current: HTMLAnchorElement | null = $state(null);

	$effect(() => {
		if (first) {
			current = document.querySelector('#link-1') as HTMLAnchorElement;

			chip.style.opacity = '0';
			chip.style.width = `${4}rem`;
			chip.style.transform = `translateX(${current.offsetLeft - current.offsetWidth / 16}px)`;

			first = false;
			return;
		}

		if (!current) {
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

{#snippet link(l, i)}
	<a
		id={`link-${l.id}`}
		class="rounded-full fill-white cursor-pointer grow p-2 px-4 z-10"
		href={l.href}
		target="_blank"
		rel="noopener noreferrer"
		onmouseenter={(e) => (current = e.currentTarget)}
		onmouseleave={() => (current = null)}
	>
		<span class="w-8 block">{@html l.icon}</span>
	</a>
{/snippet}

<div id="links" class="flex relative rounded-full space-x-1 p-1 bg-black shadow-xl">
	<div
		id="link-chip"
		bind:this={chip}
		class="absolute bg-transparent h-12 grow rounded-full pointer-events-none z-0 left-1"
	></div>

	{#each links as l, i (l.id)}
		{@render link(l, i)}
	{/each}
</div>
