import Provider from "@blog/components/provider";
import ScrollUpButton from "@blog/components/scroll-up-button";
import "@/styles/notion-blog/globals.css";
import "@/styles/notion-blog/notion.css";
import "@/styles/notion-blog/paginate.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-primary text-primary">
			<Provider>
				<div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col px-6 pb-16 pt-28 sm:px-10">
					<main className="pb-12">{children}</main>
				</div>
				<div className="fixed bottom-12 right-10 z-40">
					<ScrollUpButton />
				</div>
			</Provider>
		</div>
	);
}
