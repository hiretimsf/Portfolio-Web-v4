import { getBlogPosts } from "./features/blog/data/blogSource";

const posts = getBlogPosts();
console.log("Blog Posts Slugs:", posts.map(p => p.slug));
