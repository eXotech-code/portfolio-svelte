<script lang="ts">
	import { slide } from "svelte/transition";
	import Link from "$lib/components/Link.svelte";

	export let isHome = true;
	export let type = "normal";
	export let selectedLink: string;
</script>

<div transition:slide class={`menu ${type}`}>
	{#if isHome}
		<h3>On this page</h3>
		<div class="links">
			<Link {selectedLink} link="#home">Home</Link>
			<Link {selectedLink} link="#blog-showcase">Blog showcase</Link>
			<Link {selectedLink} link="#projects">Projects</Link>
			<Link {selectedLink} link="#contact">Contact</Link>
			<Link {selectedLink} link="#footer">Footer</Link>
		</div>
	{/if}
	<h3>Global links</h3>
	<div class="links">
		{#if !isHome}
			<Link type="standard" {selectedLink} link="/">Home</Link>
		{/if}
		<Link type="standard" {selectedLink} link="/blog">Blog</Link>
	</div>
</div>

<style lang="scss">
	@import "../vars";

	.menu {
		right: 0;
		width: 10rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid #000;
		background: $fresh-salmon;
		padding: 2rem;
		z-index: 2;
	}

	.normal {
		position: absolute;
		top: 0;
		padding-top: 4rem;
	}

	.float {
		position: fixed;
		bottom: 0;
		padding-bottom: 4rem;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
