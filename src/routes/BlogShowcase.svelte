<script lang="ts">
	import arrowRight from "$lib/icons/arrow-right.svg";
	import BlogLayout from "$lib/components/BlogLayout.svelte";
</script>

<section id="blog-showcase" class="blog-showcase">
	<h2>Care for a short coffee break?</h2>
	<div class="layout-big">
		<BlogLayout />
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
</style>
