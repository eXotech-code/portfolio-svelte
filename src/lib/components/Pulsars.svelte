<script lang="ts">
	import { onMount } from "svelte";
	import randInt from "$lib/utility/randInt";
	import type { Point, Range } from "$lib/types";

	interface Pulsar {
		name: string;
		location: [number, number];
		frequency: number;
		binary: boolean | string;
	}

	class PulsarMap {
		svg: SVGElement | undefined = undefined;
		pulsars: Pulsar[] | undefined = undefined;
		coordinateRange: Range | undefined = undefined;

		async downloadData(url: string): Promise<void> {
			const resp = await fetch(url);
			this.pulsars = await resp.json();
		}

		async getRange(): Promise<void> {
			const resp = await fetch("https://www.piskiewicz.org/api/pulsars/range");
			this.coordinateRange = await resp.json();
		}

		fakeData(): void {
			this.coordinateRange = [50, 200, -10, 40];
			this.pulsars = [];

			for (let i = 0; i < 100; i++) {
				this.pulsars.push({
					name: "FAKE PULSAR",
					frequency: 69,
					location: [
						randInt(this.coordinateRange[0], this.coordinateRange[1]),
						randInt(this.coordinateRange[2], this.coordinateRange[3])
					],
					binary: false
				});
			}
		}

		// Clear the canvas.
		clear(): void {
			this.svg!.innerHTML = "";
		}

		build(): void {
			this.clear();
			this.downloadData("https://www.piskiewicz.org/api/pulsars/51").then(() =>
				this.getRange().then(() => {
					if (!this.pulsars?.length) this.fakeData();
					this.draw();
				})
			);
		}

		interval(): void {
			this.build(); // Initial
			window.setInterval(this.build, 36000);
		}

		calcRange(coordSpace: Range): Point {
			let range = [coordSpace[1] - coordSpace[0]];
			if (coordSpace[2] < 0 && coordSpace[3] > 0) {
				range.push(Math.abs(coordSpace[2]) + coordSpace[3]);
			} else if (coordSpace[3] < 0) {
				range.push(Math.abs(coordSpace[2]) + Math.abs(coordSpace[3]));
			} else {
				range.push(coordSpace[3] - coordSpace[2]);
			}

			return <Point>range;
		}

		/* Change the x coordinate so that it
		 * works in the svg coord system. */
		reprojectX(pulsars: Pulsar[], range: number, initialX: number): Pulsar[] {
			pulsars.forEach((p) => {
				// Calculate which part of the max ascension this coord takes.
				const percentage = (p.location[0] - initialX) / range;
				// Calculate the new position of point in the svg coord system.
				const newXPos = 1000 * percentage;
				p.location = [newXPos, p.location[1]];
			});
			return pulsars;
		}

		/* Changes the projection of y coordinate to zero-based
		 * and compatible with coordinates in svg viewBox. */
		reprojectY(pulsars: Pulsar[], range: number, initialY: number): Pulsar[] {
			pulsars.forEach((p) => {
				/* Calculate the posittion of range boundary in
				 * zero-based coordinate space. */
				const zeroBasedInitial = initialY + 90;
				// Calculate the position of point in the zero-based space.
				const zeroBased = 90 + p.location[1];
				console.log(zeroBased);
				// Calc which part this of this new space the point takes.
				const percentage = (zeroBased - zeroBasedInitial) / range;
				// Calculate the position that this point will take in the svg space;
				const newYPos = 526 * percentage;
				p.location = [p.location[0], newYPos];
			});
			return pulsars;
		}

		// Reproject coordinates from zero-is-down to zero-is-up.
		projectToSvg(pulsars: Pulsar[]): Pulsar[] {
			pulsars.forEach((p) => {
				p.location = [p.location[0], 526 - p.location[1]];
			});
			return pulsars;
		}

		draw(): void {
			// Calculate the range of coordinates.
			const range = this.calcRange(<Range>this.coordinateRange);
			console.log(range);
			let pList = this.reprojectX(<Pulsar[]>this.pulsars, range[0], this.coordinateRange![0]);
			pList = this.reprojectY(pList, range[1], this.coordinateRange![2]);
			pList = this.projectToSvg(pList);
			console.log(pList);
			pList.forEach((l) => {
				const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				circle.setAttribute("cx", l.location[0].toString());
				circle.setAttribute("cy", l.location[1].toString());
				circle.setAttribute("r", "2");
				this.svg?.appendChild(circle);
			});
		}
	}

	let map = new PulsarMap();
	onMount(() => {
		map.interval();
	});
</script>

<svg class="pulsars" viewBox="0 0 1000 526" bind:this={map.svg} />

<style>
	:global(svg circle) {
		fill: none;
		stroke: #000;
		stroke-width: 1;
	}
</style>
