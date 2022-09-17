<script lang="ts">
	import MenuButton from "./MenuButton.svelte";
	import Menu from "$lib/components/Menu.svelte";
	import Logo from "./Logo.svelte";
	import { page } from "$app/stores";

	let menuOpen = false;
	let currentUrl = "/";

	$: {
		currentUrl = $page.url.pathname.substring($page.url.pathname.indexOf("/") - 1);
		currentUrl =
			currentUrl !== "/"
				? $page.url.pathname.substring($page.url.pathname.indexOf("/"), 5)
				: currentUrl;
	}
	$: {
		console.log(currentUrl);
	}
	$: isHome = currentUrl === "/";
</script>

<div class="nav">
	<Logo />
	<MenuButton bind:menuOpen />
</div>
{#if menuOpen}
	<Menu {isHome} selectedLink={currentUrl === "" ? "#home" : currentUrl} />
{/if}

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:wght@500;600;900&family=Zen+Dots&display=swap");

	.nav {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}
</style>
