<script lang="ts">
	import Post from "./Post.svelte";
	import blog from "$lib/blog.json";
	import type { BlogPost } from "$lib/types";

	const posts = <BlogPost[]>blog.posts;
</script>

<div class="blogposts">
	{#each posts.slice(0, 2) as post}
		<Post {post} />
	{/each}
	<div class="layout-small">
		{#each posts.slice(2, 4) as post}
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
