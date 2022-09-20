<script lang="ts">
	import Post from "./Post.svelte";
	import type { BlogPost } from "$lib/types";

	export let type = "small";
	export let data: BlogPost[];

	let longPosts: BlogPost[] = [];
	let shortPosts: BlogPost[] = [];
	$: {
		if (Object.keys(data).length) {
			Object.values(data).forEach((p) => {
				if (p.image) {
					longPosts = [...longPosts, p];
				} else {
					shortPosts = [...shortPosts, p];
				}
			});
		}
	}

	$: layoutBig = type === "small" ? longPosts.slice(0, 2) : longPosts.slice(0, 4);
	$: layoutSmall = shortPosts.slice(-2);
</script>

<div class="blogposts">
	{#each layoutBig as post}
		<Post {post} />
	{/each}
	{#if layoutSmall.length}
		<div class="layout-small">
			{#each layoutSmall as post}
				<Post {post} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.blogposts {
		display: grid;
		padding: 1rem;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.layout-small {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (max-width: 576px) {
		.blogposts {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
			padding: 0;
		}
	}
</style>
