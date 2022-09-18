<script lang="ts">
	import copyIcon from "$lib/icons/copy.svg";
	import doneIcon from "$lib/icons/done.svg";
	import type { SvelteComponent } from "svelte";
	import { Highlight } from "svelte-highlight";
	import c from "svelte-highlight/languages/c";
	import "$lib/ibm-carbon-theme.css";

	export let lang: string;
	export let text: string;

	let copied = false;
	let block: SvelteComponent;

	function copyCodeBlock(): void {
		navigator.clipboard.writeText(text);
		copied = true;
		window.setTimeout(() => (copied = false), 1000);
	}
</script>

<div class="center">
	<div class="outer">
		<div>
			<Highlight bind:this={block} code={text} language={c} />
		</div>
		<div class="button-holder">
			<img on:click={copyCodeBlock} src={copied ? doneIcon : copyIcon} alt="copy button" />
		</div>
	</div>
</div>

<style lang="scss">
	@import "../vars";

	.center {
		display: flex;
		justify-content: center;
	}

	.outer {
		margin: 1rem 0;
		background: #161616;
		display: grid;
		grid-template-columns: 1fr 3rem;
		padding: 1rem;
		width: fit-content;
	}

	.button-holder {
		padding: 1rem;
	}

	img {
		filter: invert(95%) sepia(2%) saturate(3175%) hue-rotate(314deg) brightness(105%) contrast(104%);
		width: 1rem;
		height: 1rem;
		cursor: pointer;
	}

	:global {
		pre > code {
			font-family: "IBM Plex Mono";
			font-size: 0.65rem;
			white-space: pre-wrap;
		}
	}
</style>
