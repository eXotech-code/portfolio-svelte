<script lang="ts">
	import type { Point } from "$lib/types";
	import { onMount } from "svelte";

	// CONSTANTS
	const MAX_ANG = 90; // Max between lines
	const MIN_ANG = 45; // Min angle
	const MAX_POINT = 400; // The maximum x or y position at which new point can exist
	const POINT_DISTANCE = 100; // Distance between points in svg units.

	class Path {
		element: SVGPathElement | undefined;
		points: Point[];
		pathString: string;
		corners: number;

		constructor(corners: number) {
			this.corners = corners;
			this.element = undefined;
			const beginPoint = this.translateCoord(<Point>Array(2).fill(200));
			this.points = [beginPoint];
			this.pathString = `M ${beginPoint.join(" ")}`;
		}

		randomAngle(): number {
			const rand = Math.random();
			const randAng = Math.floor(rand * (MAX_ANG - MIN_ANG + 1)) + MIN_ANG;
			if (randAng > 80) {
				return -randAng;
			}
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

		newPoint(angle: number): Point {
			const lastPoint = <Point>this.points.at(-1); // The first point is specified in the constructor
			const angleRad = this.toRadians(angle);

			let x = Math.floor(lastPoint[0] + POINT_DISTANCE * Math.cos(angleRad));
			let y = Math.floor(lastPoint[0] + POINT_DISTANCE * Math.sin(angleRad));

			if (this.points.length > 1) {
				x = Math.floor(
					-(lastPoint[0] - this.points[0][0]) * Math.cos(angleRad) -
						-(lastPoint[1] - this.points[0][1]) * Math.sin(angleRad) +
						lastPoint[0]
				);
				y = Math.floor(
					-(lastPoint[0] - this.points[0][0]) * Math.sin(angleRad) +
						-(lastPoint[1] - this.points[0][1]) * Math.cos(angleRad) +
						lastPoint[1]
				);
			}

			console.log(x, y);

			return [x, y];
		}

		newLine(ang: number): void {
			const p = this.newPoint(ang);
			this.points.push(p);
			const pTranslated = this.translateCoord(p);
			this.drawLine(pTranslated);
		}

		zero(): void {
			this.points = [[MAX_POINT / 2, MAX_POINT / 2]];
			this.pathString = `M ${MAX_POINT / 2} ${MAX_POINT / 2}`;
		}

		genPath(): void {
			for (let i = 0; i < this.corners; i++) {
				this.newLine(this.randomAngle());
			}

			if (!this.element) {
				window.setTimeout(() => this.genPath(), 500);
			}

			this.element?.setAttribute("d", this.pathString);
		}
	}

	let p = new Path(10);

	onMount(() => {
		p.genPath();
		window.setInterval(() => {
			p.zero();
			p.genPath();
		}, 5000);
	});
</script>

<svg viewBox="0 0 400 400">
	<path d="" bind:this={p.element} />
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 1000;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	svg path {
		fill: none;
		stroke: #000;
		stroke-width: 8;
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 5s linear alternate infinite;
	}
</style>
