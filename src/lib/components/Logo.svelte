<script lang="ts">
	import scrollIntoView from "$lib/utility/scrollIntoView";
	import { page } from "$app/stores";

	export let variant = "dark";

	$: currentUrl = $page.url.pathname.substring($page.url.pathname.lastIndexOf("/") - 1);
	$: isBlog = currentUrl === "/blog";
</script>

{#if isBlog}
	<a href="/"><h3 class={`logo ${variant === "light" ? "salmon" : ""}`}>PISKIEWICZ</h3></a>
{:else}
	<a href="#home" on:click|preventDefault={scrollIntoView}>
		<h3 class={`logo ${variant === "light" ? "salmon" : ""}`}>PISKIEWICZ</h3>
	</a>
{/if}

<style lang="scss">
	@import "../vars";

	.salmon {
		color: $fresh-salmon;
		pointer-events: none;
	}
</style>
