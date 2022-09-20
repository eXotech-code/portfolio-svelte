<script lang="ts">
	import menuIcon from "$lib/icons/menu.svg";

	export let menuOpen: boolean;

	const toggleMenu = (): void => {
		menuOpen = !menuOpen;
	};
</script>

<img alt="menu button" src={menuIcon} on:click={toggleMenu} />

<style lang="scss">
	img {
		z-index: 3;
		width: 1rem;
		height: 1rem;
		transition: transform 0.25s ease-out;
		&:hover {
			cursor: pointer;
			transform: scale(1.5);
		}
	}

	@media (max-width: 576px) {
		img:hover {
			transform: unset;
		}
	}
</style>
