<script lang="ts">
	import copyIcon from "$lib/icons/copy.svg";
	import doneIcon from "$lib/icons/done.svg";
	import { Highlight } from "svelte-highlight";
	import { c, cpp, javascript, python, typescript, shell } from "svelte-highlight/languages";
	import "$lib/ibm-carbon-theme.css";
	import type { Language } from "svelte-highlight/Highlight.svelte";

	export let lang: string;
	export let text: string;

	let copied = false;

	function getLang(): Language | undefined {
		switch (lang) {
			case "c":
				return c;
			case "cpp":
				return cpp;
			case "javascript":
				return javascript;
			case "python":
				return python;
			case "typescript":
				return typescript;
			case "sh":
				return shell;
		}
		return undefined;
	}

	function copyCodeBlock(): void {
		navigator.clipboard.writeText(text);
		copied = true;
		window.setTimeout(() => (copied = false), 1000);
	}

	$: language = getLang();
</script>

<div class="center">
	{#if language}
		<div class="outer">
			<div>
				<Highlight code={text} {language} />
			</div>
			<div class="button-holder">
				<img on:click={copyCodeBlock} src={copied ? doneIcon : copyIcon} alt="copy button" />
			</div>
		</div>
	{:else}
		<div class="error">
			<p>ERROR: Highlighting for the specified language "{lang}" is unavailable.</p>
		</div>
	{/if}
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

	.error {
		padding: 10rem;
	}

	:global {
		pre > code {
			font-family: "IBM Plex Mono";
			font-size: 0.65rem;
			white-space: pre-wrap;
		}
	}
</style>
