<script lang="ts">
	import arrowRight from "$lib/icons/arrow-right.svg";
	import Tag from "$lib/components/Tag.svelte";
	import type { BlogPost } from "$lib/types";

	export let post: BlogPost;
</script>

<div class="post" id={post.id.toString()}>
	{#if post.image}
		<img alt={post.title} src={`blog/${post.id}.webp`} />
	{/if}
	<div class="text">
		<h3>{post.title}</h3>
		<p class="date">{post.date}</p>
		<p class="description">{post.description}</p>
		<div class="tags">
			{#each post.tags as tag}
				<Tag borderColor={tag.colour} name={tag.name} />
			{/each}
		</div>
		<a class="button" href={`/blog/posts/${post.id}`}>
			<p>Read this</p>
			<img alt="icon" src={arrowRight} class="icon" />
		</a>
	</div>
</div>

<style lang="scss">
	@import "../vars";

	.post {
		border: 1px solid #000;
		display: flex;
		flex-direction: column;
	}

	img {
		@include sixteen-by-nine;
	}

	.text {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-grow: 1;
	}

	h3 {
		font-family: "PlayFair Display", serif;
		font-weight: 500;
		font-size: 1.5rem;
	}

	.date {
		font-size: 0.75rem;
	}

	.description {
		font-size: 1rem;
		font-weight: 300;
	}

	.tags {
		display: grid;
		grid-template-columns: repeat(3, max-content);
		grid-template-rows: repeat(2, 1rem);
		gap: 0.5rem;
		flex-grow: 1;
	}

	.button {
		box-sizing: border-box;
		border: 1px solid black;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		gap: 1rem;
		background: $fresh-salmon;
		transition: background 0.1s ease-out;
		&:hover {
			background: #000;
			color: #fff;
			cursor: pointer;
			img {
				filter: invert(100%);
			}
		}
		&:active {
			background: #393939;
		}
		img {
			width: 1rem;
			height: 1rem;
		}
		p {
			font-weight: 400;
			font-size: 0.75rem;
		}
	}
</style>
