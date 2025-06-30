import { date } from "astro:schema"

const domain = import.meta.env.WP_DOMAIN
const apiUrl = `${domain}/wp-json/wp/v2`
console.log(domain)

export const getPageInfo = async (slug:string) => {
    const response = await fetch(`${apiUrl}/pages?slug=${slug}`)
    if (!response.ok) {
        throw new Error(`Error fetching page info: ${response.statusText}`);
    }
    const [data] = await response.json();
    const { title: {rendered : title}, content: {rendered:content}, date, modified } = data;

    return { title, content }
}

export const getLatestPosts = async ({perPage = 10}: {perPage?: number} = {}) => {
    const response = await fetch(`${apiUrl}/posts?per_page=${perPage}&_embed`)
    if (!response.ok) {
        throw new Error(`Error fetching latest posts: ${response.statusText}`);
    }
    const results = await response.json();
    if (!results.length) throw new Error("No posts found");

    console.log(results)

    const posts = results.map((post: { _embedded?: any; title?: any; excerpt?: any; content?: any; date?: any; slug?: any }) => {
        const {
            title: { rendered: title },
            excerpt: { rendered: excerpt },
            content: { rendered: content },
            date,
            slug
        } = post

        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

        return {title, excerpt, content, date, slug, featuredImage}
    })
    return posts;
}