<script lang="ts">
	import scrollIntoView from "$lib/utility/scrollIntoView";

	export let type = "scroll";
	export let selectedLink: string;
	export let link: string;
</script>

<div>
	<p>
		{#if type === "scroll"}
			<a href={link} on:click|preventDefault={scrollIntoView}>
				<slot />
			</a>
		{:else}
			<a href={link}>
				<slot />
			</a>
		{/if}
	</p>
	<span
		class={selectedLink === link || (selectedLink === "/" && link === "#home") ? "selected" : ""}
	/>
</div>

<style lang="scss">
	div {
		width: fit-content;
		height: 1.5rem;

		position: relative;
		&:hover {
			cursor: pointer;
		}
	}

	div:hover > span {
		background: #ff737a;
		height: 10px;
	}

	p {
		position: relative;
		z-index: 2;
	}

	span {
		position: absolute;
		bottom: 0;
		height: 2px;
		width: 100%;
		margin: 0;
		background: #000;
		z-index: 1;
	}

	span.selected {
		background: #ff737a;
		height: 10px;
	}
</style>
