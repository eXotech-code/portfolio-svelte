import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { TagSearchResults } from "$lib/types";

export const load: PageLoad = async ({ fetch, params }): Promise<TagSearchResults> => {
    // Get blog posts that have the specified tag from the server.
    try {
        const resp = await fetch(`https://www.piskiewicz.org/api/posts/tagsearch/${params.slug}`);
        return { tag: params.slug, blogPosts: await resp.json() }
    } catch (e) {
        throw error(404, 'Not found');
    }
}