<script lang="ts">
	import arrowRight from "$lib/icons/arrow-right.svg";
	import BlogLayout from "$lib/components/BlogLayout.svelte";
	import type { BlogPost } from "$lib/types";

	export let data: BlogPost[];
</script>

<section id="blog-showcase" class="blog-showcase">
	<h2>Care for a short coffee break?</h2>
	<div class="layout-big">
		<BlogLayout type="small" {data} />
		<div class="button-holder">
			<h1>Still thirsty?</h1>
			<a class="button" href="/blog">
				<p>Check out my blog</p>
				<img alt="icon" src={arrowRight} class="icon" />
				<div />
			</a>
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
		position: relative;
		z-index: 1;
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

	@media (max-width: 576px) {
		h2 {
			margin: 1rem 0;
		}

		h1 {
			font-size: 2.25rem;
		}

		.button-holder {
			align-items: flex-start;
		}

		.layout-big {
			grid-template-columns: 1fr;
			grid-template-rows: max-content max-content;
		}

		.button-holder {
			padding: 0;
			.button {
				justify-content: space-between;
			}
		}
	}
</style>
