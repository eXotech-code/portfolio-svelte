<script lang="ts">
	import send from "$lib/icons/send.svg";
	import Pulsars from "$lib/components/Pulsars.svelte";
</script>

<section class="contact">
	<div class="form-holder">
		<h2>You interested?</h2>
		<p>
			You want it, I want it. We both know what we want. What is left for you is to just fill out
			this form.
		</p>
		<form action="/message">
			{#each ["name", "email"] as l}
				<div class="input-container">
					<label for={l}><p>Your {l}</p></label>
					<input name={l} required />
				</div>
			{/each}
			<div class="input-container">
				<label for="message"><p>Your message</p></label>
				<textarea name="message" required />
			</div>
			<button>
				<p>To the ether!</p>
				<img src={send} alt="send" class="icon" />
				<div />
			</button>
		</form>
		<Pulsars />
	</div>
</section>

<style lang="scss">
	@import "../lib/_vars";

	.contact {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		position: relative;
	}

	.form-holder {
		background: $fresh-salmon;
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
	}

	textarea {
		height: 4rem;
		resize: none;
	}

	button {
		align-self: center;
	}

	:global(.pulsars) {
		z-index: -1;
		position: absolute;
		inset: 1rem;
	}
</style>
