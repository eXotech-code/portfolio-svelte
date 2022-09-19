<script lang="ts">
	import BlogLayout from "$lib/components/BlogLayout.svelte";
	import Lines from "$lib/components/Lines.svelte";
	import type { BlogPost } from "$lib/types";

	export let data: BlogPost[];
</script>

<svelte:head>
	<title>Blog - PISKIEWICZ</title>
</svelte:head>

<section id="banner" class="banner">
	<div class="banner-text">
		<h1>The blog</h1>
		<h3>If I’ve done something I want to brag about, this is where you would find out about it.</h3>
	</div>
	<div class="graphic">
		<Lines />
	</div>
</section>
<hr />
<section id="blog" class="blog">
	<h2>My latest adventures</h2>
	<BlogLayout {data} />
</section>

<style lang="scss">
	@import "../../lib/_vars";

	.banner {
		height: 50vh;
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

	h2 {
		margin: 1rem;
		font-size: 2rem;
		font-weight: 500;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
	}

	hr {
		border-color: #000;
		margin: 0;
	}

	.graphic {
		position: absolute;
		height: 90%;
		width: 50%;
		right: 0;
		top: -1rem;
		z-index: -1;
	}

	.blog {
		background: $fresh-salmon;
	}
</style>
