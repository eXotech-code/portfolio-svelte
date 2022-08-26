<script lang="ts">
	import { ArrowRight } from "carbon-icons-svelte";
	import BlogShowcase from "./BlogShowcase.svelte";
</script>

<section class="banner">
	<div class="banner-text">
		<h1>So...<br />Tell what do you need for your new venture.</h1>
		<h3>...and let me worry about the details.</h3>
		<div class="button-holder">
			<button>
				<p>Contact me</p>
				<ArrowRight size={16} class="icon" />
				<div />
			</button>
		</div>
	</div>
</section>
<hr />
<BlogShowcase />

<style lang="scss">
	@import "../lib/_vars";

	:global {
		@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:wght@500;600;900&family=Zen+Dots&display=swap");

		body {
			background: $fresh-salmon;
			padding: 0;
			margin: 0;
		}

		section {
			padding: 1rem;
		}

		h1,
		h2,
		h3,
		p {
			margin: 0;
			font-family: "Open Sans", sans-serif;
		}

		h1,
		h2 {
			font-family: "PlayFair Display", serif;
		}

		/* Workaround for icons from carbon-icons-svelte
		 * not reacting to local changes in z-index. */
		svg {
			z-index: 2;
		}
	}

	.banner {
		height: 75vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3rem 1fr;
		grid-template-areas:
			". graphic"
			"text graphic";
	}

	.banner-text {
		grid-area: text;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	h1 {
		font-size: 3rem;
		font-weight: 900;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
	}

	.button-holder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: flex-end;
		@include button-primary(auto);
	}

	hr {
		border-color: #000;
		margin: 0;
	}
</style>
