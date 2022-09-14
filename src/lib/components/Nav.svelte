<script lang="ts">
	import MenuButton from "./MenuButton.svelte";
	import Menu from "$lib/components/Menu.svelte";

	let menuOpen = false;
</script>

<div class="nav">
	<h3 class="logo">PISKIEWICZ</h3>
	<MenuButton bind:menuOpen />
</div>
{#if menuOpen}
	<Menu selectedLink={"#home"} />
{/if}

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:wght@500;600;900&family=Zen+Dots&display=swap");

	.nav {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}
</style>
