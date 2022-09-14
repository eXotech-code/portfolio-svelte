// This clever function is curtesy of this creation:
// https://svelte.dev/repl/e073dc93fb3347848062a531271e497f?version=3.24.0
export default function scrollIntoView({ target }: any) {
    const linked = target!.getAttribute("href");
    console.log(target, linked);
    const elementToScrollTo = document.querySelector(linked);
    if (!elementToScrollTo) return;
    elementToScrollTo!.scrollIntoView({
        behavior: "smooth"
    });
    history.pushState(`PISKIEWICZ - ${linked}`, "", linked);
}