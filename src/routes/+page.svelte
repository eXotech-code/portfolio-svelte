<script lang="ts">
	import arrowRight from "$lib/icons/arrow-right.svg";
	import Lines from "$lib/components/Lines.svelte";
	import BlogShowcase from "./BlogShowcase.svelte";
	import Projects from "./Projects.svelte";
	import Contact from "./Contact.svelte";
</script>

<section class="banner">
	<div class="banner-text">
		<h1>So...<br />Tell what do you need for your new venture.</h1>
		<h3>...and let me worry about the details.</h3>
		<div class="button-holder">
			<button>
				<p>Contact me</p>
				<img alt="icon" src={arrowRight} class="icon" />
				<div />
			</button>
		</div>
	</div>
	<div class="graphic">
		<Lines />
	</div>
</section>
<hr />
<BlogShowcase />
<Projects />
<Contact />

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

	.graphic {
		grid-area: graphic;
	}
</style>
