<script lang="ts">
	import BlogLayout from "$lib/components/BlogLayout.svelte";
	import Lines from "$lib/components/Lines.svelte";
	import MediaQuery from "$lib/components/MediaQuery.svelte";
	import { onMount } from "svelte";
	import { contentLoaded } from "$lib/stores";
	import type { BlogPost } from "$lib/types";

	export let data: BlogPost[];

	onMount(() => ($contentLoaded = true));
</script>

<svelte:head>
	<meta property="og:title" content="Blog - PISKIEWICZ" />
	<title>Blog - PISKIEWICZ</title>
</svelte:head>

<section id="banner" class="banner">
	<div class="banner-text">
		<h1>The blog</h1>
		<h3>If I’ve done something I want to brag about, this is where you would find out about it.</h3>
	</div>
	<MediaQuery query="(min-width: 577px)" let:matches>
		{#if matches}
			<div class="graphic">
				<Lines />
			</div>
		{/if}
	</MediaQuery>
</section>
<hr />
<section id="blog" class="blog">
	<h2>My latest adventures</h2>
	<BlogLayout type="big" {data} />
</section>

<style lang="scss">
	@import "../../lib/_vars";

	.banner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3rem 1fr 3rem;
		grid-template-areas:
			". graphic"
			"text graphic"
			". graphic";
	}

	.banner-text {
		grid-area: text;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		z-index: 1;
		background: $fresh-salmon;
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
		right: 0;
		top: 0;
		height: 800px;
		width: 50%;
	}

	.blog {
		background: $fresh-salmon;
		position: relative;
	}

	@media (max-width: 576px) {
		h1 {
			font-size: 2.25rem;
		}

		h2 {
			margin: 1rem 0;
		}

		.banner {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			grid-template-areas: unset;
		}

		.banner-text {
			padding: 0;
		}
	}
</style>
