<script lang="ts">
	export let href = "";
	export let title: string | undefined = undefined;
</script>

<div>
	<a {href} {title}><slot /></a>
	<span />
</div>

<style lang="scss">
	div {
		display: inline-flex;
		width: fit-content;
		height: 1.45rem;
		flex-direction: column;

		position: relative;
		&:hover {
			cursor: pointer;
		}
	}

	div:hover > span {
		background: #ff737a;
		height: 10px;
	}

	a {
		position: relative;
		z-index: 2;
		font-weight: 400;
	}

	span {
		position: absolute;
		bottom: 0;
		height: 1px;
		width: 100%;
		margin: 0;
		background: #000;
		z-index: 1;
	}
</style>
