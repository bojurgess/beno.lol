<script>
	import { page } from '$app/stores';
</script>

<div class="flex space-x-2 text-4xl items-end">
	<h1>{$page.status}</h1>
	<div id="separator"></div>
	<h1 class="font-normal text-xl">{$page.error?.message}</h1>
</div>

<style>
	#separator::before {
		content: '';
		display: block;
		width: 1px;
		height: 40px;
		border: 1px solid black;
	}
</style>
