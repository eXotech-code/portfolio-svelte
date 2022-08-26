<script lang="ts">
	import type { Point } from "$lib/types";
	import { onMount } from "svelte";

	// CONSTANTS
	const MAX_ANG = 90; // Max between lines
	const MIN_ANG = 45; // Min angle
	const MAX_POINT = 400; // The maximum x or y position at which new point can exist
	const MIN_POINT = 0; // Same thing but just the opposite.
	const POINT_DISTANCE = 100; // Distance between points in svg units.

	class Path {
		element: SVGPathElement | undefined;
		points: Point[];
		pathString: string;
		corners: number;
		lastAng: number;

		constructor(corners: number) {
			this.corners = corners;
			this.element = undefined;
			this.points = [[0, 0]];
			this.pathString = `M 0 ${MAX_POINT}`;
			this.lastAng = 0;
		}

		randomAngle(): number {
			const rand = Math.random();
			const randAng = Math.floor(rand * (MAX_ANG - MIN_ANG + 1)) + MIN_ANG;
			return randAng;
		}

		// Translates coordinate in x-is-down coordinate system to weird svg coords.
		translateCoord(coord: Point): Point {
			return [coord[0], MAX_POINT - coord[1]];
		}

		drawLine(newPoint: Point): void {
			this.pathString += ` L ${newPoint.join(" ")}`;
		}

		toRadians(angleDeg: number): number {
			return angleDeg * (Math.PI / 180);
		}

		newLine(): void {
			const ang =
				this.points.length === 1
					? this.toRadians(this.randomAngle())
					: this.toRadians(90 - this.lastAng + this.randomAngle());
			console.log(ang / (Math.PI / 180));
			const lastPoint = <Point>this.points.at(-1);
			let newPoint: Point = [
				lastPoint[0] + POINT_DISTANCE * Math.cos(ang),
				lastPoint[1] + POINT_DISTANCE * Math.sin(ang)
			];
			this.lastAng = ang;
			this.points.push(newPoint);
		}

		genPath(): void {
			for (let i = 0; i < this.corners; i++) {
				this.newLine();
				this.drawLine(this.translateCoord(this.points[i + 1]));
			}

			if (!this.element) {
				window.setTimeout(() => this.genPath(), 500);
			}

			this.element?.setAttribute("d", this.pathString);
		}
	}

	let p = new Path(4);

	onMount(() => p.genPath());
</script>

<svg viewBox="0 0 400 400">
	<path d="" bind:this={p.element} />
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	svg path {
		fill: none;
		stroke: #000;
		stroke-width: 4;
	}
</style>
