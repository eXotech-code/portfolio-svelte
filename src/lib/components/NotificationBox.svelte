<script lang="ts">
	import done from "$lib/icons/done.svg";
	import error from "$lib/icons/error.svg";
	import type { Notification } from "$lib/types";

	export let notification: Notification;
</script>

<div class={`notification ${notification.bad ? "bad" : "good"}`}>
	<p>{notification.message}</p>
	<div class="center">
		<img alt="status icon" src={notification.bad ? error : done} class="icon" />
	</div>
</div>

<style lang="scss">
	@import "../vars";

	.notification {
		position: fixed;
		box-sizing: border-box;
		bottom: 1rem;
		left: 1rem;
		width: 20rem;
		height: 4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #000;
		background: $fresh-salmon;
		padding: 1rem;
		z-index: 3;
	}

	.good {
		border-color: #2b7878;
		p {
			color: #2b7878;
		}
		.icon {
			filter: invert(35%) sepia(59%) saturate(437%) hue-rotate(131deg) brightness(101%)
				contrast(88%);
		}
	}

	.bad {
		border-color: #f06a6a;
		p {
			color: #f06a6a;
		}
		.icon {
			filter: invert(71%) sepia(25%) saturate(7465%) hue-rotate(319deg) brightness(103%)
				contrast(88%);
		}
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	@media (max-width: 576px) {
		.notification {
			// width: 100%;
			margin: 0 1rem;
		}
	}
</style>
