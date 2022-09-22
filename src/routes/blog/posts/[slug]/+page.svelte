<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import Tag from "$lib/components/Tag.svelte";
	import type { BlogPost } from "$lib/types";
	import PostLink from "$lib/components/PostLink.svelte";
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import { onMount } from "svelte";
	import { contentLoaded } from "$lib/stores";
	import MediaQuery from "$lib/components/MediaQuery.svelte";
	import ImageMarkdown from "$lib/components/ImageMarkdown.svelte";

	export let data: BlogPost;

	onMount(() => ($contentLoaded = true));
</script>

<svelte:head>
	<meta property="og:title" content={`${data.title} - PISKIEWICZ`} />
	<meta property="og:image" content={`https://www.piskiewicz.org/blog/${data.id}.webp`} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={`https://www.piskiewicz.org/blog/${data.id}.webp`} />
	<title>{data.title} - PISKIEWICZ</title>
</svelte:head>

<section id="banner" class="banner">
	<div class="banner-content">
		<div class="banner-text">
			<h1>{data.title}</h1>
			<MediaQuery query="(max-width: 576px)" let:matches>
				{#if matches}
					<div class="graphic">
						<img alt={data.title} src={`../../blog/${data.id}.webp`} />
					</div>
				{/if}
			</MediaQuery>
			<p class="date">{data.date}</p>
			<h3>{data.description}</h3>
			<div class="banner-container">
				<p class="banner-container-name">Tags:</p>
				<div class="tags">
					{#each data.tags as tag}
						<Tag borderColor={tag.colour} name={tag.name} />
					{/each}
				</div>
			</div>
			<div class="banner-container">
				<p class="banner-container-name">Author:</p>
				<p>{data.author}</p>
			</div>
		</div>
		<MediaQuery query="(min-width: 577px)" let:matches>
			{#if matches}
				<div class="graphic">
					<img alt={data.title} src={`../../blog/${data.id}.webp`} />
				</div>
			{/if}
		</MediaQuery>
	</div>
</section>
<hr />
<section id="post" class="post">
	<SvelteMarkdown
		source={data.content}
		renderers={{ link: PostLink, code: CodeBlock, image: ImageMarkdown }}
	/>
</section>

<style lang="scss">
	@import "../../../../lib/vars";

	.banner-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.banner-text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	.banner-container {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	h1 {
		font-size: 3rem;
		font-weight: 900;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
	}

	hr {
		border-color: #000;
		margin: 0;
	}

	.date {
		font-size: 1.25rem;
	}

	.banner-container-name {
		font-weight: 600;
	}

	.graphic {
		padding: 2rem;
		img {
			border: 1px solid #000;
			object-fit: cover;
			width: 100%;
			max-height: 100%;
		}
	}

	.tags {
		display: grid;
		grid-template-columns: repeat(8, max-content);
		gap: 0.5rem;
	}

	.post {
		padding: 2rem 10rem;
	}

	:global {
		.post > p {
			font-weight: 300;
			text-align: justify;
		}
		.post > ul {
			list-style-type: "—";
		}
		.post > ul > li {
			padding-left: 1rem;
			font-family: "Open Sans", sans-serif;
			font-weight: 300;
		}
		.post > h3 {
			margin-top: 1rem;
			font-size: 2.25rem;
			font-weight: 400;
		}
		.post > p > code {
			font-family: "IBM Plex Mono";
			font-weight: 400;
		}
		.post > .code {
			font-family: "IBM Plex Mono";
			font-weight: 400;
			font-size: 1.25rem;
		}
		.post > ul > li > img {
			object-fit: contain;
			max-width: 100%;
		}
	}

	@media (max-width: 576px) {
		h1 {
			font-size: 2.25rem;
		}

		.post {
			padding: 2rem 2rem;
		}

		:global {
			.post > ul > li {
				padding-left: 0.5rem;
			}

			.post > ul {
				padding-left: 1rem;
			}
		}

		.banner-content {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}

		.graphic {
			padding: 1rem 0;
		}
	}
</style>
