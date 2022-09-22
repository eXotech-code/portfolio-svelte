<script lang="ts">
	import copyIcon from "$lib/icons/copy.svg";
	import doneIcon from "$lib/icons/done.svg";
	import { Highlight } from "svelte-highlight";
	import { c, cpp, javascript, python, typescript, shell } from "svelte-highlight/languages";
	import "$lib/ibm-carbon-theme.css";
	import type { Language } from "svelte-highlight/Highlight.svelte";
	import MediaQuery from "./MediaQuery.svelte";

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
				{#if copied}
					<MediaQuery query="(max-width: 576px)" let:matches>
						{#if matches}
							<p class="mobile-button-text">Copied</p>
						{/if}
					</MediaQuery>
					<img on:click={copyCodeBlock} src={doneIcon} alt="copy button" />
				{:else}
					<MediaQuery query="(max-width: 576px)" let:matches>
						{#if matches}
							<p class="mobile-button-text">Copy</p>
						{/if}
					</MediaQuery>
					<img on:click={copyCodeBlock} src={copyIcon} alt="copy button" />
				{/if}
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
		grid-template-rows: 1fr;
		grid-template-areas: "code button";
		padding: 1rem;
		width: fit-content;
	}

	.button-holder {
		grid-area: button;
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
			grid-area: code;
			font-family: "IBM Plex Mono";
			font-size: 0.65rem;
			white-space: pre-wrap;
		}
	}

	.mobile-button-text {
		color: #fff;
		font-size: 0.75rem;
	}

	@media (max-width: 576px) {
		.outer {
			width: 100%;
			grid-template-columns: 1fr;
			grid-template-rows: 3rem max-content;
			grid-template-areas:
				"button"
				"code";
			div {
				overflow-x: auto;
			}
		}

		.button-holder {
			display: flex;
			gap: 1rem;
			align-items: center;
			justify-content: flex-end;
		}

		:global {
			pre > code {
				white-space: unset;
			}
		}
	}
</style>
