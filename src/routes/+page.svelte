<script lang="ts">
	import arrowRight from "$lib/icons/arrow-right.svg";
	import Lines from "$lib/components/Lines.svelte";
	import NotificationBox from "$lib/components/NotificationBox.svelte";
	import BlogShowcase from "./BlogShowcase.svelte";
	import Projects from "./Projects.svelte";
	import Contact from "./Contact.svelte";
	import MenuButton from "$lib/components/MenuButton.svelte";
	import Menu from "$lib/components/Menu.svelte";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import type { BlogPost, Notification } from "$lib/types";
	import scrollIntoView from "$lib/utility/scrollIntoView";

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
				s.pos = currentElem.offsetTop;
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
	<div class="graphic">
		<Lines />
	</div>
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
		height: 75vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3rem 1fr;
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
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: flex-end;
		@include button-primary(auto);
	}

	.button > * {
		pointer-events: none;
	}

	hr {
		border-color: #000;
		margin: 0;
	}

	.graphic {
		position: absolute;
		height: 90%;
		width: 50%;
		right: 0;
		top: -1rem;
		z-index: -1;
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
</style>
