<script lang="ts">
	import TagSearchResult from "$lib/components/TagSearchResult.svelte";
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
</script>

<svelte:head>
	<title>Tag: {data.tag} - PISKIEWICZ</title>
</svelte:head>

<section id="banner" class="banner">
	<h1>Search results for:</h1>
	<h1 class="tag" style={`--color: #${tagColour}`}>{data.tag}</h1>
</section>
<hr />
<section id="results" class="results">
	{#each data.blogPosts as post}
		<TagSearchResult {post} />
	{/each}
</section>

<style lang="scss">
	.banner {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 5rem;
	}

	h1 {
		font-size: 3rem;
	}

	.tag {
		font-family: "IBM Plex Mono";
		color: var(--color);
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
</style>
