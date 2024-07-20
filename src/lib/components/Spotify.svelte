<script lang="ts">
	import type { NowPlaying } from '$lib/types';

	interface Props {
		nowPlaying: NowPlaying;
	}

	const { nowPlaying }: Props = $props();

	const item = $derived(nowPlaying.item);
	const artists = $derived(item.artists);
	const album = $derived(item.album);

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
	<a href={a.external_urls.spotify} target="_blank" class="hover:text-white transition-all">
		{#if i !== artists.length - 1}
			{a.name + ', '}
		{:else}
			{a.name}
		{/if}
	</a>
{/snippet}

<div class="flex flex-col bg-red-600 rounded-2xl p-4 space-y-2 w-72">
	<a href={item.external_urls.spotify} target="_blank">
		<img
			class="w-64 rounded-lg border border-transparent hover:border-white transition-all"
			src={album.images[0].url}
			alt={item.name}
		/>
	</a>
	<div class="flex flex-col space-y-4 rounded-lg">
		<div class="text-center">
			<a
				id="title"
				href={item.external_urls.spotify}
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

<style lang="postcss">
	progress {
		@apply relative h-2 transition-all rounded-2xl;
	}

	progress::-webkit-progress-bar {
		@apply bg-gray-300;
	}

	progress::-webkit-progress-value {
		@apply bg-gray-800;
	}

	progress::-moz-progress-bar {
		@apply bg-gray-800;
	}

	a {
		@apply hover:text-white transition-all;
	}

	#title {
		font-stretch: 125%;
	}
</style>
