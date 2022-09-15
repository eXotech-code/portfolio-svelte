<script lang="ts">
	import Post from "./Post.svelte";
	import blog from "$lib/blog.json";
	import type { BlogPost } from "$lib/types";

	export let type = "small";

	const posts = <BlogPost[]>blog.posts;
	const layoutBig = type === "small" ? posts.slice(0, 2) : posts.slice(0, 4);
	const layoutSmall = posts.slice(-2);
</script>

<div class="blogposts">
	{#each layoutBig as post}
		<Post {post} />
	{/each}
	<div class="layout-small">
		{#each layoutSmall as post}
			<Post {post} />
		{/each}
	</div>
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
</style>
