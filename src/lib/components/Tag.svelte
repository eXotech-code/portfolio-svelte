<script lang="ts">
	import type { Color } from "$lib/types";

	export let borderColor: Color;
</script>

<div style={`--color: rgb(${borderColor.join(", ")})`} class="tag">
	<p><slot /></p>
</div>

<style lang="scss">
	@import "../vars";

	div {
		border: 1px solid var(--color);
		display: flex;
		justify-content: center;
		border-radius: 1rem;
		padding: 0 0.5rem;
		user-select: none;
		-webkit-user-select: none;
		&:hover {
			background-color: var(--color);
			cursor: pointer;
			p {
				color: $fresh-salmon;
			}
		}
		&:active {
			filter: brightness(90%);
		}
	}

	p {
		font-family: "IBM Plex Mono", monospace;
		font-size: 0.5rem;
		line-height: 0.9rem;
		color: var(--color);
	}
</style>
