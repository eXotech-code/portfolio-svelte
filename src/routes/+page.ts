import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogPost } from "$lib/types";

export const load: PageLoad = async ({ fetch }): Promise<BlogPost[]> => {
    // Get recent blog posts from server.
    try {
        const resp = await fetch("https://www.piskiewicz.org/api/posts/recent");
        return await resp.json();
    } catch (e) {
        throw error(404, 'Not found');
    }
}