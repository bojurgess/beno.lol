<script lang="ts">
	import { enhance } from "$app/forms";

	export let data;
	export let form;
</script>

{#if data.flow !== "login"}
	<h1>Sign up</h1>
	<form
		method="post"
		action="?/signup"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type == "redirect") {
					window.location.href = data.redirect || result.location;
				} else {
					update();
				}
			};
		}}
	>
		<label for="username">Username</label>
		<input name="username" id="username" /><br />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" /><br />
		<button>Continue</button>
	</form>

	{#if form}
		<span>Error: {form.error}</span>
	{/if}
{:else}
	<h1>Sign in</h1>
	<form
		method="post"
		action="?/login"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type == "redirect") {
					window.location.href = data.redirect || result.location;
				} else {
					update();
				}
			};
		}}
	>
		<label for="username">Username</label>
		<input name="username" id="username" /><br />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" /><br />
		<button>Continue</button>
	</form>

	{#if form}
		<span>Error: {form.error}</span>
	{/if}
{/if}
