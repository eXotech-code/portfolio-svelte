<script lang="ts">
	import scrollIntoView from "$lib/utility/scrollIntoView";
	import Logo from "./Logo.svelte";
	import { page } from "$app/stores";

	$: currentUrl = $page.url.pathname.substring($page.url.pathname.lastIndexOf("/") - 1);
	$: isBlog = currentUrl === "/blog";
</script>

<section id="footer" class="footer">
	<div class="title-and-tagline">
		<h1>Tak na marginesie...</h1>
		<p class="tagline">...or in other words “on the footer”.</p>
	</div>

	<div class="rightflow">
		<div class="footer-section">
			<h3 class="section-name">sitemap</h3>
			{#if !isBlog}
				<p class="subsection-name">This page</p>
				<p><a on:click={scrollIntoView} href="#home">home</a></p>
				<p><a on:click={scrollIntoView} href="#blog-showcase">blog showcase</a></p>
				<p><a on:click={scrollIntoView} href="#projects">projects</a></p>
				<p><a on:click={scrollIntoView} href="#contact">contact</a></p>
			{/if}
			<p class="subsection-name">Global</p>
			{#if isBlog}
				<p><a on:click={scrollIntoView} href="/">home</a></p>
			{/if}
			<p><a on:click={scrollIntoView} href="/blog">blog</a></p>
		</div>

		<div class="footer-section">
			<h3 class="section-name">contact info</h3>
			<p><span>Email: </span><a href="mailto:jakub@piskiewicz.org">jakub@piskiewicz.org</a></p>
			<p><span>Phone number: </span><a href="tel:+48784815504">+48 784 815 504</a></p>
			<p>
				<span><a href="https://www.linkedin.com/in/jakub-piśkiewicz-946b181a5/">Linkedin</a></span>
			</p>
			<p><span><a href="https://github.com/eXotech-code">GitHub</a></span></p>
		</div>

		<div class="footer-section">
			<h3 class="section-name">credits</h3>
			<p class="subsection-name">Icons</p>
			<p>IBM Carbon Design System</p>
			<p class="subsection-name">Fonts</p>
			<p>Open Sans</p>
			<p>PlayFair Display</p>
			<p>IBM Plex Mono</p>
			<p class="subsection-name">Ideas, testing and encouragement</p>
			<p>Ada Gottfried</p>
			<p>Łukasz Świszcz</p>
			<p>Szymon Piśkiewicz</p>
			<p>Sylwia Piśkiewicz</p>
			<p>Sara Dziubińska</p>
		</div>
	</div>

	<div class="logo-holder">
		<Logo variant="light" />
	</div>
</section>

<style lang="scss">
	@import "../_vars";

	.footer {
		background: #000;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.rightflow {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}

	p,
	a,
	h1,
	h3 {
		color: $fresh-salmon;
	}

	h1 {
		font-size: 3rem;
	}

	.title-and-tagline {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.tagline {
		font-size: 1.5rem;
		font-weight: 300;
	}

	.footer-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.section-name {
		font-size: 2rem;
	}

	.subsection-name {
		font-size: 1.5rem;
		font-weight: 400;
	}

	p {
		font-weight: 300;
	}

	span {
		font-weight: 400;
	}

	.logo-holder {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		height: 3rem;
	}
</style>
