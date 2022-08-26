<script lang="ts">
	import menuIcon from "$lib/icons/menu.svg";
</script>

<div class="nav">
	<h3>PISKIEWICZ</h3>
	<img alt="menu button" src={menuIcon} />
</div>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300&family=Playfair+Display:wght@500;600;900&family=Zen+Dots&display=swap");

	.nav {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}

	h3 {
		font-family: "Zen Dots", cursive;
		font-size: 1rem;
		letter-spacing: 0.25rem;
	}

	img {
		width: 1rem;
		height: 1rem;
	}
</style>
