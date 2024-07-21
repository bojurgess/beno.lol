<script lang="ts">
	import type { Link } from '$lib/types';
	import toast from 'svelte-french-toast';

	interface Props {
		link: Link;
		current: HTMLButtonElement | null;
	}

	let { link, current = $bindable() }: Props = $props();
</script>

<button
	role={'href' in link ? 'link' : 'button'}
	id={`link-${link.id}`}
	class="rounded-full fill-white cursor-pointer grow p-2 px-4 z-10"
	onmouseenter={(e) => (current = e.currentTarget)}
	onmouseleave={() => (current = null)}
	onclick={() => {
		if ('href' in link) {
			window.open(link.href, '_blank');
		} else {
			navigator.clipboard.writeText(link.clipboard);
			toast.success(`Copied to clipboard!`);
		}
	}}
>
	<span class="w-8 block">{@html link.icon}</span>
</button>
