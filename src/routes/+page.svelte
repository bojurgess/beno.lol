<script lang="ts">
	import { Links } from '$components';

	const { data, form } = $props();
</script>

<div
	id="profile"
	class="flex flex-col items-center justify-center md:flex-row md:space-x-4 space-y-4"
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
