<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import Transition from "$lib/components/Transition.svelte";
	import { beforeNavigate, goto } from "$app/navigation";
	import { contentLoaded } from "$lib/stores";

	const TIMEOUT = 1000;
	let navigated = false;
	let animated = false;
	let isUnload = true;

	beforeNavigate(async (navigation) => {
		isUnload = navigation.type === "unload";
		if (!navigated && !isUnload) {
			$contentLoaded = false;
			navigated = true;
			animated = true;
			navigation.cancel();
			window.setTimeout(() => {
				if (navigation.to) {
					goto(navigation.to.url);
					navigated = false;
				}
			}, TIMEOUT);
		}
	});

	$: {
		if ($contentLoaded) animated = false;
	}
</script>

{#if animated}
	<Transition />
{:else if $contentLoaded && !isUnload}
	<Transition transitionIn={false} />
{/if}
<Nav />
<slot />
<Footer />

<style lang="scss">
	@import "../lib/vars";

	:global {
		@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:wght@500;600;900&family=Zen+Dots&display=swap");

		body,
		html {
			background: $fresh-salmon;
			padding: 0;
			margin: 0;
			overflow-x: hidden;
		}

		section {
			padding: 1rem;
		}

		h1,
		h2,
		h3,
		p,
		a {
			margin: 0;
			font-family: "Open Sans", sans-serif;
		}

		h1,
		h2 {
			font-family: "PlayFair Display", serif;
		}

		a {
			text-decoration: none;
			color: #000;
		}

		.logo {
			font-family: "Zen Dots", cursive;
			font-size: 1rem;
			letter-spacing: 0.25rem;
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
