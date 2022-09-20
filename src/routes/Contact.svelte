<script lang="ts">
	import send from "$lib/icons/send.svg";
	import Pulsars from "$lib/components/Pulsars.svelte";
	import type { Notification } from "$lib/types";
	import MediaQuery from "$lib/components/MediaQuery.svelte";

	export let notification: Notification = { message: "", bad: false };

	let form = {
		name: "",
		email: "",
		message: ""
	};

	const validateEmail = (email: string) => {
		return email.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	async function sendMessage(url: string): Promise<void> {
		const payload = new URLSearchParams(form);
		await fetch(url + "message", {
			method: "POST",
			body: payload,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Access-Control-Allow-Origin": "*",
				"Access-COntrol-Allow-Headers": "*"
			}
		})
			.then(() => {
				notification = { message: "Message has been sent!", bad: false };
			})
			.catch(() => {
				notification = { message: "Couldn't send the message.", bad: true };
			});
	}

	const submit = (): void => {
		if (validateEmail(form.email)) {
			sendMessage("https://www.piskiewicz.org/api/");
			form.name = "";
			form.email = "";
			form.message = "";
		}
	};
</script>

<section id="contact" class="contact">
	<div class="form-holder">
		<h2>You interested?</h2>
		<p>
			You want it, I want it. We both know what we want. What is left for you is to just fill out
			this form.
		</p>
		<form on:submit|preventDefault={submit}>
			<div class="input-container">
				<label for="name"><p>Your name</p></label>
				<input bind:value={form.name} name="name" required />
			</div>
			<div class="input-container">
				<label for="email"><p>Your email</p></label>
				<input bind:value={form.email} name="email" required />
			</div>
			<div class="input-container">
				<label for="message"><p>Your message</p></label>
				<textarea bind:value={form.message} name="message" required />
			</div>
			<button class="button">
				<p>To the ether!</p>
				<img src={send} alt="send" class="icon" />
				<div />
			</button>
		</form>
	</div>
	<MediaQuery query="(min-width: 577px)" let:matches>
		{#if matches}
			<Pulsars />
		{/if}
	</MediaQuery>
</section>

<style lang="scss">
	@import "../lib/_vars";

	.contact {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		position: relative;
		pointer-events: none;
	}

	.form-holder {
		background: $fresh-salmon;
		z-index: 3;
		grid-column-start: 2;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		font-size: 2rem;
		font-weight: 500;
	}

	p {
		font-size: 1.5rem;
		font-weight: 300;
	}

	form {
		justify-self: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 2rem;
		pointer-events: all;
		input {
			height: 2rem;
		}
		@include button-primary(fit-content);
	}

	.input-container {
		position: relative;
	}

	label {
		display: block;
		position: absolute;
		top: -0.5rem;
		left: 0.5rem;
		background: $fresh-salmon;
		padding: 0 0.5rem;
		p {
			font-size: 0.625rem;
			font-weight: 300;
		}
	}

	input,
	textarea {
		box-sizing: border-box;
		background: none;
		border: 1px solid #000;
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0;
	}

	textarea {
		height: 4rem;
		resize: none;
	}

	button {
		align-self: center;
	}

	:global(.pulsars) {
		position: absolute;
		inset: 1rem;
		pointer-events: all;
	}

	@media (max-width: 576px) {
		.contact {
			grid-template-columns: 1fr;
		}

		form {
			padding: 1rem 0;
		}
		.form-holder {
			padding: 1rem 0;
			z-index: 0;
		}

		textarea,
		input {
			font-size: 1rem;
			padding: 1rem;
		}

		form {
			input {
				height: 3rem;
			}
			textarea {
				height: 6rem;
			}
		}
	}
</style>
