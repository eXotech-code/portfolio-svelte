<script lang="ts">
	import TagSearchResult from "$lib/components/TagSearchResult.svelte";
	import { onMount } from "svelte";
	import { contentLoaded } from "$lib/stores";

	import type { TagSearchResults } from "$lib/types";

	export let data: TagSearchResults;

	function findTagColour(): string {
		for (let t of data.blogPosts[0].tags) {
			if (t.name === data.tag) {
				return t.colour;
			}
		}
		return "";
	}

	let tagColour = findTagColour();

	onMount(() => ($contentLoaded = true));
</script>

<svelte:head>
	<meta property="og:title" content={`Tag: ${data.tag} - PISKIEWICZ`} />
	<title>Tag: {data.tag} - PISKIEWICZ</title>
</svelte:head>

<section id="banner" class="banner">
	<h1>
		Search results for:
		<span class="tag" style={`--color: #${tagColour}`}>{data.tag}</span>
	</h1>
</section>
<hr />
{#if data.blogPosts.length}
	<section id="results" class="results">
		{#each data.blogPosts as post}
			<TagSearchResult {post} />
		{/each}
	</section>
{/if}

<style lang="scss">
	.banner {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5rem;
	}

	h1 {
		font-size: 3rem;
	}

	.tag {
		font-family: "IBM Plex Mono";
		color: var(--color);
		margin-left: 0.5rem;
	}

	hr {
		border-color: #000;
		margin: 0;
	}

	.results {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 4rem;
	}

	@media (max-width: 576px) {
		h1 {
			font-size: clamp(2rem, 10vw, 3rem);
		}

		.banner {
			padding: 2rem;
		}

		.results {
			padding: 1rem;
		}
	}
</style>
