<script lang="ts">
	import arrowRight from "$lib/icons/arrow-right.svg";
	import Lines from "$lib/components/Lines.svelte";
	import NotificationBox from "$lib/components/NotificationBox.svelte";
	import BlogShowcase from "./BlogShowcase.svelte";
	import Projects from "./Projects.svelte";
	import Contact from "./Contact.svelte";
	import MenuButton from "$lib/components/MenuButton.svelte";
	import Menu from "$lib/components/Menu.svelte";
	import MediaQuery from "$lib/components/MediaQuery.svelte";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import type { BlogPost, Notification } from "$lib/types";
	import scrollIntoView from "$lib/utility/scrollIntoView";
	import { contentLoaded } from "$lib/stores";

	export let data: BlogPost[];

	let y = 0;
	let showMenu = false;
	let menuOpen = false;
	let mounted = false;
	let sections = [
		{ name: "home", pos: 0 },
		{ name: "blog-showcase", pos: 0 },
		{ name: "projects", pos: 0 },
		{ name: "contact", pos: 0 },
		{ name: "footer", pos: 0 }
	];

	// Fills positions of section elements in the sections list/
	function fillPositions() {
		let currentElem: HTMLElement | null;

		sections.forEach((s) => {
			currentElem = document.querySelector(`#${s.name}`);
			if (currentElem) {
				s.pos = currentElem.getBoundingClientRect().top;
			}
		});
	}

	// Gets closest element to current scroll position.
	function getClosest(scrollPos: number) {
		let closest = sections[0];
		let found = false;

		for (let i = 0; i < sections.length - 1; i++) {
			if (scrollPos > sections[i].pos && scrollPos < sections[i + 1].pos) {
				closest = sections[i];
				found = true;
				break;
			}
		}

		// If we haven't found the element, then it's probably the footer.
		if (!found) closest = sections[4];
		return closest.name;
	}

	onMount(() => {
		fillPositions();
		mounted = true;
		$contentLoaded = true;
	});
	$: {
		if (mounted) {
			showMenu = y > sections[0].pos && y < sections[4].pos;
		}
	}

	let notification: Notification = { bad: false, message: "" };

	$: {
		if (notification.message !== "") {
			window.setTimeout(() => (notification.message = ""), 4000);
		}
	}
	$: currentElement = getClosest(y);
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
	<meta property="og:title" content="Home - PISKIEWICZ" />
	<title>Home - PISKIEWICZ</title>
</svelte:head>

<section id="home" class="banner">
	<div class="banner-text">
		<h1>So...<br />Tell me what do you need for your new venture.</h1>
		<h3>...and let me worry about the details.</h3>
		<div class="button-holder">
			<a class="button" href="#contact" on:click|preventDefault={scrollIntoView}>
				<p>Contact me</p>
				<img alt="icon" src={arrowRight} class="icon" />
				<div />
			</a>
		</div>
	</div>
	<MediaQuery query="(min-width: 577px)" let:matches>
		{#if matches}
			<div class="graphic">
				<Lines />
			</div>
		{/if}
	</MediaQuery>
</section>
<hr />
<BlogShowcase {data} />
<Projects />
<Contact bind:notification />
{#if notification.message !== ""}
	<NotificationBox {notification} />
{/if}
{#if showMenu}
	<div transition:slide class={`floating-menu ${menuOpen ? "transparent-border" : ""}`}>
		<MenuButton bind:menuOpen />
	</div>
	{#if menuOpen}
		<Menu selectedLink={`#${currentElement}`} type="float" />
	{/if}
{/if}

<style lang="scss">
	@import "../lib/_vars";

	.banner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3rem max-content;
		grid-template-areas:
			". graphic"
			"text graphic";
	}

	.banner-text {
		grid-area: text;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		z-index: 1;
		background: $fresh-salmon;
	}

	h1 {
		font-size: 3rem;
		font-weight: 900;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 300;
	}

	.button-holder {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: flex-end;
		margin-top: 5rem;
		@include button-primary(auto);
	}

	.button > * {
		pointer-events: none;
	}

	hr {
		border-color: #000;
		margin: 0;
		z-index: 1;
	}

	.graphic {
		position: absolute;
		right: 0;
		top: 0;
		height: 800px;
		width: 50%;
	}

	.notification-holder {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}

	.floating-menu {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 1rem;
		right: 1rem;
		float: right;
		padding: 0.5rem;
		border: 1px solid #000;
		background: $fresh-salmon;
		z-index: 3;
		transition: border 0.25s ease-out;
	}

	.transparent-border {
		border: 1px solid rgba(255, 255, 255, 0);
	}

	@media (max-width: 576px) {
		h1 {
			font-size: 2.25rem;
		}

		.banner {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}

		.banner-text {
			padding: 0;
		}

		.button-holder {
			margin-top: 0;
			.button {
				width: 100%;
				justify-content: space-between;
			}
		}
	}
</style>
