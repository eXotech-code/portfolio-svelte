<script lang="ts">
	import Post from "./Post.svelte";
	import arrowRight from "$lib/icons/arrow-right.svg";
	import blog from "$lib/blog.json";
	import type { BlogPost } from "$lib/types";
	const posts = <BlogPost[]>blog.posts;
</script>

<section id="blog-showcase" class="blog-showcase">
	<h2 class="tagline-blog">Care for a short coffee break?</h2>
	<div class="layout-big">
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
		<div class="button-holder">
			<h1>Still thirsty?</h1>
			<button>
				<p>Check out my blog</p>
				<img alt="icon" src={arrowRight} class="icon" />
				<div />
			</button>
		</div>
	</div>
</section>

<style lang="scss">
	@import "../lib/vars";

	.blog-showcase {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background: $fresh-salmon;
	}

	h2 {
		margin: 1rem;
		font-size: 2rem;
		font-weight: 500;
	}

	.layout-big {
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 1rem;
	}

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

	.button-holder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		gap: 1rem;
		@include button-primary(100%);
	}

	h1 {
		font-size: 3.5rem;
	}
</style>
