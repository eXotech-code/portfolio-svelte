<script lang="ts">
	export let transitionIn = true;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920">
	<path
		class={`cls-1 ${transitionIn ? "in" : "out"}`}
		d="M-132,208L754-256-53,580,1395-179-224,999,1871-61-175,1302,2110,136-87,1617,2086,541-104,1915,2051,946,226,2067l1853-847L1012,2058l1117-531-639,699"
	/>
</svg>

<style>
	svg {
		position: fixed;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		pointer-events: none;
		transform: scale(2);
	}

	@keyframes dash-in {
		from {
			stroke-dashoffset: 30000;
		}
		to {
			stroke-dashoffset: 60000;
		}
	}

	@keyframes dash-out {
		from {
			stroke-dashoffset: 60000;
		}
		to {
			stroke-dashoffset: 90000;
		}
	}

	path {
		stroke-dasharray: 30000;
		fill: none;
		stroke: #000;
		stroke-width: 323.08px;
	}

	path.in {
		stroke-dashoffset: 60000;
		animation: dash-in 1s ease-out;
	}

	path.out {
		stroke-dashoffset: 30000;
		animation: dash-out 1s ease-out;
	}
</style>
