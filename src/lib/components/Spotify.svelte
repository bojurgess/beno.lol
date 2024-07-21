<script lang="ts">
	import type { NowPlaying } from '$lib/types';
	import Vibrant from 'node-vibrant';
	import { animate } from 'motion';

	interface Props {
		nowPlaying: NowPlaying;
		orientation: 'vertical' | 'horizontal';
	}

	const { nowPlaying, orientation }: Props = $props();

	const item = $derived(nowPlaying.item);
	const artists = $derived(item.artists);
	const album = $derived(item.album);

	let first = $state(true);

	let container: HTMLDivElement;

	$effect(() => {
		Vibrant.from(album.images[0].url)
			.getPalette()
			.then((palette) => {
				console.log(palette);
				const c = palette.Vibrant!.rgb;

				const contrast = c.reduce((a, b) => a + b) / 3 > 127 ? 'black' : 'white';

				animate(
					container,
					{
						backgroundColor: `rgba(${c.join(', ')}, 1)`
					},
					{ duration: first ? 0 : 0.2 }
				);

				animate(
					container.querySelectorAll('*'),
					{
						color: contrast
					},
					{ duration: 0.2 }
				);

				first = false;
			});
	});

	const progress = $derived.by(() => formatTime(nowPlaying.progress_ms));
	const duration = $derived.by(() => formatTime(nowPlaying.item.duration_ms));

	const formatTime = (ms: number) => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};
</script>

{#snippet artist(a, i)}
	<a href={a.external_urls.spotify} target="_blank" rel="noreferrer noopener">
		{#if i !== artists.length - 1}
			{a.name + ', '}
		{:else}
			{a.name}
		{/if}
	</a>
{/snippet}

{#snippet verticalWidget()}
	<div bind:this={container} class="flex flex-col rounded-2xl p-4 space-y-2 w-72">
		<a href={item.external_urls.spotify} target="_blank" rel="noopener noreferrer">
			<img
				class="w-64 rounded-lg border border-transparent"
				src={album.images[0].url}
				alt={item.name}
			/>
		</a>
		<div class="flex flex-col space-y-4 rounded-lg">
			<div class="text-center">
				<a
					id="title"
					href={item.external_urls.spotify}
					target="_blank"
					rel="noopener noreferrer"
					class="text-2xl font-display font-bold line-clamp-2">{item.name}</a
				>
				<span class="text-sm">
					{#each artists as a, i}
						{@render artist(a, i)}
					{/each}
				</span>
			</div>
			<div id="progress-bar" class="flex items-center space-x-2 text-sm">
				{progress}
				<progress
					class="flex-grow mx-4"
					value={nowPlaying.progress_ms}
					max={nowPlaying.item.duration_ms}
				></progress>
				{duration}
			</div>
		</div>
	</div>
{/snippet}

{#snippet horizontalWidget()}
	<div bind:this={container} class="flex rounded-2xl p-2 space-x-4 w-fit">
		<a
			href={item.external_urls.spotify}
			class="overflow-hidden rounded-lg w-40 shadow-xl"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				class="w-40 hover:scale-105 ease-in-out object-cover transition-all"
				src={album.images[0].url}
				alt={item.name}
			/>
		</a>
		<div class="flex flex-col space-y-4 pr-2 justify-center rounded-lg max-w-72">
			<div>
				<a
					id="title"
					href={item.external_urls.spotify}
					target="_blank"
					rel="noopener noreferrer"
					class="text-2xl font-display font-bold line-clamp-2"
				>
					{item.name}
				</a>
				<span class="text-sm">
					{#each artists as a, i}
						{@render artist(a, i)}
					{/each}
				</span>
			</div>
			<div id="progress-bar" class="flex items-center space-x-2 text-sm">
				{progress}
				<progress
					class="flex-grow mx-4"
					value={nowPlaying.progress_ms}
					max={nowPlaying.item.duration_ms}
				></progress>
				{duration}
			</div>
		</div>
	</div>
{/snippet}

{#if orientation === 'vertical'}
	{@render verticalWidget()}
{:else}
	{@render horizontalWidget()}
{/if}

<style lang="postcss">
	progress {
		@apply relative h-2 transition-all rounded-2xl;
	}

	progress::-webkit-progress-bar {
		@apply bg-gray-300;
	}

	progress::-webkit-progress-value {
		@apply bg-black;
	}

	progress::-moz-progress-bar {
		@apply bg-black;
	}

	a {
		@apply hover:underline;
	}

	#title {
		font-stretch: 125%;
	}
</style>
