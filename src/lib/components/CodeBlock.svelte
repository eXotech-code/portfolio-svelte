<script lang="ts">
	import copyIcon from "$lib/icons/copy.svg";
	import doneIcon from "$lib/icons/done.svg";

	export let lang: string;
	export let text: string;

	let copied = false;
	let block: HTMLElement;

	function copyCodeBlock(): void {
		let r = document.createRange();
		r.selectNode(block);
		window.getSelection()?.removeAllRanges();
		window.getSelection()?.addRange(r);
		document.execCommand("copy");
		window.getSelection()?.removeAllRanges();
		copied = true;
		window.setTimeout(() => (copied = false), 1000);
	}
</script>

<div class="outer">
	<div class="code">
		<pre class={lang}><code bind:this={block}>{text}</code></pre>
	</div>
	<div class="button-holder">
		<img on:click={copyCodeBlock} src={copied ? doneIcon : copyIcon} alt="copy button" />
	</div>
</div>

<style lang="scss">
	@import "../vars";

	.outer {
		margin: 1rem 0;
		background: #161616;
		display: grid;
		grid-template-columns: 1fr 3rem;
		justify-content: center;
		padding: 1rem;
	}

	pre {
		color: $fresh-salmon;
		white-space: pre-wrap;
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
</style>
