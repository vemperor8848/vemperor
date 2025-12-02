import CategoryFilter from "@blog/components/filter/category-filter";
import SearchBar from "@blog/components/filter/search-bar";
import PostsGrid from "@blog/components/posts/posts-grid";
import { getAllPostsFromNotion } from "@blog/services/posts";
import { Post } from "@blog/types/post";
import { toUniqueArray } from "@blog/utils/to-unique-array";

export const metadata = {
	title: "Blog",
	description: "Long-form drops synced from the Notion workspace.",
};

export default async function BlogPage() {
	let allPosts: Post[] = [];
	let error: string | null = null;

	try {
		allPosts = await getAllPostsFromNotion();
	} catch (err) {
		error =
			err instanceof Error
				? err.message
				: "Unable to load blog posts. Check the Notion configuration.";
	}

	const publishedPosts = allPosts.filter((post) => post.published);
	const allCategories = toUniqueArray(
		publishedPosts.map((post) => post.categories).flat()
	).sort();

	return (
		<div className="space-y-10 md:space-y-16">
			<header className="space-y-4">
				<h1 className="text-5xl font-bold uppercase leading-tight md:text-6xl">
					Notes & Drops
				</h1>
			</header>

			{error ? (
				<div className="rounded-2xl bg-secondary p-6 text-secondary">
					<p className="text-lg font-semibold text-primary">Blog is offline</p>
					<p className="mt-2">
						{error}. Set NOTION_DATABASE_ID and NOTION_AUTH_TOKEN to pull posts
						from Notion.
					</p>
				</div>
			) : (
				<>
					<section className="space-y-8">
						<SearchBar />
						<CategoryFilter allCategories={allCategories} />
					</section>
					<PostsGrid allPosts={allPosts} />
					{!publishedPosts.length && (
						<div className="rounded-xl bg-secondary p-6 text-secondary">
							<p className="font-semibold text-primary">No posts yet</p>
							<p className="mt-1">
								Add a published page in the Notion database to see it here.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
