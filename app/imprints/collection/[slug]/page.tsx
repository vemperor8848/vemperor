import { notFound } from "next/navigation";
import imprints from "@/constants/imprints.json";
import ImprintsGrid from "@/components/imprints-grid";

type Imprint = {
	title: string;
	slug: string;
	description: string;
	pictures: string[];
	cover: string;
};

export default function ImprintCollection({
	params,
}: {
	params: { slug: string };
}) {
	const collections = imprints as Imprint[];
	const collection = collections.find((c) => c.slug === params.slug);

	if (!collection) return notFound();

	return (
		<div className="min-h-screen bg-[#1f2224] text-white pt-24">
			<ImprintsGrid collection={collection} />
		</div>
	);
}
