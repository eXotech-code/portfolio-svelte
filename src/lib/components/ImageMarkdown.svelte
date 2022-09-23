<script lang="ts">
	export let href = "";
	export let title: string | undefined = undefined;
	export let text = "";

	// Marked weird quote escape workaround.
	text = text.replaceAll("&#39;", "'");
	text = text.replaceAll("&#8220", '"');
</script>

<div class="image">
	<img src={href} {title} alt={text} />
	<p class="caption">{text}</p>
</div>

<style lang="scss">
	.image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1rem 0;
	}

	.image img {
		max-width: 100%;
	}

	.image .caption {
		font-size: 0.8rem;
		color: #666;
		margin-top: 0.8rem;
	}
</style>
