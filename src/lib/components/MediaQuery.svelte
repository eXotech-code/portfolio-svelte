<script lang="ts">
	import { onMount } from "svelte";

	// Very cool media query component stolen from:
	// https://svelte.dev/repl/26eb44932920421da01e2e21539494cd?version=3.50.1

	export let query: string;

	let mql: MediaQueryList;
	let mqlListener: (v: MediaQueryListEvent) => any;
	let wasMounted = false;
	let matches = false;

	onMount(() => {
		wasMounted = true;
		return () => {
			removeActiveListener();
		};
	});

	$: {
		if (wasMounted) {
			removeActiveListener();
			addNewListener(query);
		}
	}

	function addNewListener(query: string) {
		mql = window.matchMedia(query);
		mqlListener = (v: MediaQueryListEvent) => (matches = v.matches);
		mql.addEventListener("change", mqlListener);
		matches = mql.matches;
	}

	function removeActiveListener() {
		if (mql && mqlListener) {
			mql.removeEventListener("change", mqlListener);
		}
	}
</script>

<slot {matches} />
