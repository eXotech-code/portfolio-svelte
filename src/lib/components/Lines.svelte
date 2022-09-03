<script lang="ts">
	import type { Point } from "$lib/types";
	import { onMount } from "svelte";

	// CONSTANTS
	const MAX_ANG = 110; // Max angle between lines
	const MIN_ANG = 30; // Min angle
	const MIN_POINT = 0;
	const MAX_POINT = 400; // The maximum x or y position at which new point can exist
	const POINT_DISTANCE = 150; // Distance between points in svg units.
	const MIN_DISTANCE = 24; // Mimimum distance between any point on canvas.
	const MAX_CALLS = 100; // The maximum retries possible in searching for the new point matching distance criteria.
	const REGEN_POINT = <Point>[-1, -1]; // Thing to return when newPoint function requires regeneration of the whole pattern.
	const BOUND_TOLERANCE = 0.6; // Percentage signifying how many points can not fit inside canvas.

	const randInt = (min: number, max: number) => {
		const rand = Math.random();
		return Math.floor(rand * (max - min + 1)) + min;
	};

	class Path {
		element: SVGPathElement | undefined;
		points: Point[];
		angles: number[];
		pathString: string;
		corners: number;

		constructor(corners: number) {
			this.corners = corners;
			this.element = undefined;
			const beginPoint = this.translateCoord(<Point>Array(2).fill(MAX_POINT / 2));
			this.points = [beginPoint];
			this.angles = [0];
			this.pathString = `M ${beginPoint.join(" ")}`;
		}

		randomAngle(): number {
			const lastAng = this.angles.at(-1);
			// Multiples of 45 deg should exist in pairs except if this is the first angle.
			if ((lastAng === 90 || lastAng === 45) && this.angles.at(-2) !== lastAng) {
				return lastAng;
			}
			const seed = Number.parseFloat(Math.random().toFixed(2));
			// 30% chance of 90 degree angle if the last angle wasn't 90.
			if (seed < 0.3 && lastAng !== 90) {
				return 90;
			}
			// 20% chance of opposite to 90 or 45 degree angle.
			if (seed > 0.8) {
				if (Math.random() > 0.5) {
					return 315;
				}
				return 270;
			}
			// 1% chance of any angle in range MIN_ANG - MAX_ANG.
			if (seed === 0.5) {
				return randInt(MIN_ANG, MAX_ANG);
			}
			// 49% chance of any angle in range MIN_ANG - MAX_ANG that is a multiple of 10 occuring
			return Math.floor(randInt(MIN_ANG, MAX_ANG) / 10) * 10;
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

		// Euclidean distance
		calcDistance(p1: Point, p2: Point) {
			return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
		}

		newPoint(calls: number): Point {
			const lastPoint = <Point>this.points.at(-1); // The first point is specified in the constructor
			const ang = this.randomAngle();
			const angleRad = this.toRadians(ang);

			let x = Math.floor(lastPoint[0] + POINT_DISTANCE * Math.cos(angleRad));
			let y = Math.floor(lastPoint[0] + POINT_DISTANCE * Math.sin(angleRad));

			if (this.points.length > 1) {
				let index = this.points.length - 2;
				x = Math.floor(
					-(lastPoint[0] - this.points[index][0]) * Math.cos(angleRad) -
						-(lastPoint[1] - this.points[index][1]) * Math.sin(angleRad) +
						lastPoint[0]
				);
				y = Math.floor(
					-(lastPoint[0] - this.points[index][0]) * Math.sin(angleRad) +
						-(lastPoint[1] - this.points[index][1]) * Math.cos(angleRad) +
						lastPoint[1]
				);
			}

			const newp = <Point>[x, y];

			/* If the chosen point is too close to any other point,
			 * choose another. */
			for (const point of this.points) {
				const d = this.calcDistance(point, newp);
				if (d < MIN_DISTANCE) {
					if (calls !== MAX_CALLS) {
						return this.newPoint(calls + 1);
					}
					// Just start again the whole process of generating the pattern.
					return REGEN_POINT;
				}
			}

			this.angles.push(ang);
			return newp;
		}

		newLine(): number {
			const p = this.newPoint(0);
			if (p === REGEN_POINT) {
				return -1; // Regenerate the patter.
			}
			this.points.push(p);
			const pTranslated = this.translateCoord(p);
			this.drawLine(pTranslated);
			return 0;
		}

		zero(): void {
			this.points = [<Point>Array(2).fill(MAX_POINT / 2)];
			this.pathString = `M ${this.points[0].join(" ")}`;
			this.angles = [0];
		}

		/* Check if more than BOUND_TOLERANCE number
		 * of the points fit inside the boundary. */
		pointsDoFit(): boolean {
			let count = 0;
			for (const p of this.points) {
				p.forEach((coord) => {
					if (coord > MAX_POINT || coord < MIN_POINT) {
						count++;
					}
				});
			}
			console.log(count / this.points.length);

			return (count * 2) / this.points.length <= BOUND_TOLERANCE;
		}

		genPath(): number {
			for (let i = 0; i < this.corners; i++) {
				/* Halt if this.newPoint() wants to regen or more than
				 * BOUND_TOLERANCE part of points do not fit on canvas. */
				if (this.newLine() === -1 || !this.pointsDoFit()) return -1;
			}

			if (!this.element) {
				window.setTimeout(() => this.genPath(), 500);
			}

			this.element?.setAttribute("d", this.pathString);
			return 0;
		}

		drawPath(): void {
			let exitCode = this.genPath();
			while (exitCode === -1) {
				this.zero();
				exitCode = this.genPath();
			}
			console.log(this.points);
		}
	}

	let p = new Path(10);

	onMount(() => {
		p.drawPath();
		// window.setInterval(() => {
		// 	p.zero();
		// 	p.genPath();
		// }, 5000);
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
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: 1500;
		}
	}

	svg path {
		fill: none;
		stroke: #000;
		stroke-width: 8;
		stroke-dasharray: 1000;
		stroke-dashoffset: 1500;
		animation: dash 8s linear alternate infinite;
	}
</style>
