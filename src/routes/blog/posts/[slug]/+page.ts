import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogPost } from "$lib/types";

export const load: PageLoad = async ({ fetch, params }): Promise<BlogPost | undefined> => {
    try {
        const p = await fetch(`https://www.piskiewicz.org/api/posts/${params.slug}`);
        return await p.json();
    } catch (err) {
        throw error(404, 'Not found');
    }
}