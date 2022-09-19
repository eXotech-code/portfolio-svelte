<script lang="ts">
	import { page } from "$app/stores";
	import arrowRight from "$lib/icons/arrow-right.svg";

	let message = `${$page.status}: ${$page.error?.message}`;
	if ($page.status === 404) {
		message = "Hey boy, aren't you a little bit lost?";
	} else if ($page.status === 500) {
		message = "Sorry bardzo. The server is acting weird lately.";
	}
</script>

<svelte:head>
	<title>{$page.status} - PISKIEWICZ</title>
</svelte:head>

<section id="banner" class="banner">
	<div class="content">
		<h1>{message}</h1>
		<a class="button" href="/">
			<p>Go back home</p>
			<img src={arrowRight} alt="arrow right icon" class="icon" />
			<div />
		</a>
	</div>
</section>

<style lang="scss">
	@import "../lib/vars";

	h1 {
		font-size: 3rem;
	}

	.banner {
		display: flex;
		justify-content: center;
		align-items: center;
		@include button-primary(auto);
	}

	.content {
		width: fit-content;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.button {
		align-self: flex-end;
	}
</style>
