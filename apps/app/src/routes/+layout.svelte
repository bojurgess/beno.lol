<script lang="ts">
	import { Button } from "bits-ui";
	import { page } from "$app/stores";

	export let data;
</script>

{#if data.session !== null}
	<nav class="flex">
		<Button.Root href="http://localhost:5174/auth?flow=logout&redirect={$page.url.href}">
			Logout
		</Button.Root>
	</nav>
{/if}

<slot />
