import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import NotionPage from "@blog/components/notion-page";
import RelatedPosts from "@blog/components/posts/related-posts";
import { getRecordMap } from "@blog/libs/notion";
import { getAllPostsFromNotion } from "@blog/services/posts";
import { Post } from "@blog/types/post";

function ErrorMessage({ message }: { message: string }) {
	return (
		<article className="mx-auto mt-24 max-w-3xl rounded-2xl bg-secondary p-8 text-secondary">
			<h2 className="text-2xl font-semibold text-primary">Blog is offline</h2>
			<p className="mt-3">{message}</p>
			<Link
				href="/blog"
				className="mt-6 inline-flex text-primary underline">
				← Back to blog
			</Link>
		</article>
	);
}

type BlogPostPageProps = {
	params: { slug: string };
};

export default async function BlogPostPage({
	params: { slug },
}: BlogPostPageProps) {
	let allPosts: Post[] = [];

	try {
		allPosts = await getAllPostsFromNotion();
	} catch (err) {
		const message =
			err instanceof Error
				? err.message
				: "Unable to load posts. Check the Notion configuration.";
		return <ErrorMessage message={message} />;
	}

	const post = allPosts.find((p) => p.slug === slug);
	if (!post) {
		return notFound();
	}

	if (!post.published) {
		return (
			<article
				data-revalidated-at={new Date().getTime()}
				className="mx-auto mt-24 max-w-3xl rounded-2xl bg-secondary p-8 text-secondary">
				<h2 className="mb-4 text-3xl font-bold text-primary">
					Post Not Published
				</h2>
				<Link
					href="/blog"
					className="text-primary underline">
					<span className="mr-2">&larr;</span>
					<span>Back to list</span>
				</Link>
			</article>
		);
	}

	const relatedPosts: Post[] = allPosts.filter(
		(p) =>
			p.slug !== slug &&
			p.published &&
			p.categories.some((value) => post.categories.includes(value))
	);

	try {
		const recordMap = await getRecordMap(post.id);

		return (
			<>
				<div className="mx-auto mt-4 flex w-[90vw] max-w-[900px] justify-start md:mt-8">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary shadow hover:translate-x-[-2px] hover:text-primary/80">
						<span aria-hidden>←</span>
						<span>Back to blog</span>
					</Link>
				</div>
				<article
					data-revalidated-at={new Date().getTime()}
					className="mt-4 flex flex-col items-center md:mt-12">
					<div className="relative aspect-[3/2] w-[90vw] max-w-[900px] overflow-hidden rounded-2xl bg-secondary">
						<Image
							src={post.cover}
							alt="cover"
							fill
							style={{ objectFit: "contain" }}
							placeholder={post.blurUrl ? "blur" : "empty"}
							blurDataURL={post.blurUrl}
						/>
					</div>
					<NotionPage
						post={post}
						recordMap={recordMap}
					/>
				</article>
				<RelatedPosts posts={relatedPosts} />
			</>
		);
	} catch (err) {
		const message =
			err instanceof Error
				? err.message
				: "Unable to render the Notion content right now.";
		return <ErrorMessage message={message} />;
	}
}

export async function generateStaticParams() {
	try {
		const allPosts = await getAllPostsFromNotion();
		return allPosts.map((post) => ({
			slug: post.slug,
		}));
	} catch {
		return [];
	}
}

export async function generateMetadata({
	params: { slug },
}: BlogPostPageProps): Promise<Metadata> {
	try {
		const allPosts = await getAllPostsFromNotion();
		const post = allPosts.find((p) => p.slug === slug);

		return post
			? {
					title: post.title,
					openGraph: {
						images: [
							{
								url: post.cover,
								width: 400,
								height: 300,
							},
						],
					},
			  }
			: {};
	} catch {
		return {};
	}
}
