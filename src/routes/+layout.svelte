<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import Transition from "$lib/components/Transition.svelte";
	import { beforeNavigate, goto } from "$app/navigation";
	import { onMount } from "svelte";

	let navigated = false;
	let animationOut = false;

	beforeNavigate(async (navigation) => {
		if (!navigated && navigation.type !== "unload") {
			navigated = true;
			navigation.cancel();
			window.setTimeout(() => {
				animationOut = true;
				if (navigation.to) {
					goto(navigation.to.url);
					navigated = false;
				}
				window.setTimeout(() => (animationOut = false), 1000);
			}, 1000);
		}
	});

	onMount(() => {
		window.setTimeout(() => (animationOut = false), 1000);
	});
</script>

{#if navigated}
	<Transition />
{:else if animationOut}
	<Transition transitionIn={false} />
{/if}
<Nav />
<slot />
<Footer />

<style lang="scss">
	@import "../lib/vars";

	:global {
		@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:wght@500;600;900&family=Zen+Dots&display=swap");

		body {
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
