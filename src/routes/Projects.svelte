<script lang="ts">
	import type { Project } from "$lib/types";
	import projectArr from "$lib/projects.json";
	import arrowRight from "$lib/icons/arrow-right.svg";

	const projects: Project[] = projectArr.projects;
</script>

<section id="projects" class="projects">
	<div class="stories">
		<h2>Blasts from my past</h2>
		<p>
			Sometimes people like to dwell on the past. For me and for those people I’ve prepared this
			small memorial in the memory of projects long
			<strike>gone</strike> finished. I advise you to look around and enjoy the views. Sometimes humans
			find new inspiration in the most unexpected of places.
		</p>
	</div>
	{#each projects as project}
		<div class="project">
			<h1>{project.name}</h1>
			<h3>{project.tagline}</h3>
			<img class="banner" alt={project.name + " banner"} src={project.banner[0]} />
			{#each project.description as desc}
				<p class="description">{desc}</p>
			{/each}
		</div>
		<div class="steal">
			<h1>Steal, steal, steal!</h1>
			<p>
				If you click this button, you will get to this project’s GitHub page from where you can
				clone the code to modify it, integrate it into your own works or even print it out and hang
				it on the wall to admire. You can literally do anything with it. All brought to you by the
				MIT licensing goodness.
			</p>
			<button class="button" on:click={() => window.location.assign(project.link)}>
				<p>Steal the code</p>
				<img alt="icon" src={arrowRight} class="icon" />
				<div />
			</button>
		</div>
	{/each}
</section>

<style lang="scss">
	@import "../lib/vars";

	.projects {
		display: grid;
		gap: 1rem;
		grid-template-columns: [stories] 1fr [project] 3fr [steal] 1fr;
	}

	.stories {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
	}

	h2 {
		font-size: 2rem;
		font-weight: 500;
	}

	p {
		font-size: 1rem;
		font-weight: 300;
	}

	.project {
		grid-column-start: project;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	h1 {
		font-size: 3rem;
		font-weight: 600;
	}

	h3 {
		font-family: "PlayFair Display", serif;
		font-size: 1.5rem;
		font-weight: 500;
	}

	.description {
		font-size: 1.25rem;
		font-weight: 300;
		width: 88%;
		text-align: justify;
		align-self: center;
	}

	.steal {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		@include button-primary(100%);
	}

	img {
		@include sixteen-by-nine;
	}
</style>
