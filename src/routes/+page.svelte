<script lang="ts">
	import { dev } from '$app/environment';
	import { Links, Spotify } from '$components';
	import type { Link, NowPlaying } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import MediaQuery from 'svelte-media-queries';

	let eventSource: EventSource;
	let nowPlaying: NowPlaying | null = $state(null);

	let url = dev
		? 'http://localhost:3000/user/8fzywdklm84r9hupsurfxdoj2'
		: 'https://backend.beno.lol/user/8fzywdklm84r9hupsurfxdoj2';

	onMount(() => {
		eventSource = new EventSource(url);
		eventSource.onmessage = (event) => {
			nowPlaying = JSON.parse(event.data);
		};
	});

	onDestroy(() => {
		// Clean up the EventSource
		eventSource?.close();
	});

	const { data, form } = $props();

	const spotifyLink = data.links.find((link) => link.color === '#1db954') as Link;
</script>

{#snippet profile()}
	<div
		id="profile"
		class="flex h-full flex-col items-center justify-center md:flex-row md:space-x-4 space-y-4"
	>
		<section id="1">
			<img
				src="https://cdn.penguino.me/profile/avatar.png"
				alt="beno"
				class="rounded-full w-64 h-64 object-cover"
			/>
		</section>
		<section id="2" class="flex flex-col justify-center space-y-4">
			<div style="line-height: 0.5em;" class="text-center md:text-start">
				<h1 class="text-7xl">beno.</h1>
				<p class="text-md">🚧 under construction 🚧</p>
			</div>

			<Links links={data.links} />
		</section>
	</div>
{/snippet}

{#snippet spotify()}
	<MediaQuery query="(max-width: 768px)" let:matches>
		{#if nowPlaying}
			<div class="flex flex-col items-center justify-center w-full h-full space-y-1">
				<p class="flex justify-between w-full text-xs">
					<span>Listening on Spotify:</span>
					<span class="w-4 flex items-center justify-center">{@html spotifyLink.icon}</span>
				</p>
				{#if !matches}
					<Spotify {nowPlaying} orientation={'horizontal'} />
				{:else}
					<Spotify {nowPlaying} orientation={'vertical'} />
				{/if}
			</div>
		{/if}
	</MediaQuery>
{/snippet}

<div class="flex flex-col justify-center items-center space-y-8 overflow-scroll">
	<div>{@render profile()}</div>
	<div>{@render spotify()}</div>
</div>
