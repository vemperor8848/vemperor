"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import imprints from "@/constants/imprints.json";
import styles from "./imprints-list.module.css";
import ImprintsGrid from "@/components/imprints-grid";

type Imprint = {
	title: string;
	slug: string;
	description: string;
	pictures: string[];
	cover: string;
};

export default function ImprintsPage() {
	const collections = useMemo(() => imprints as Imprint[], []);
	const [activeSlug, setActiveSlug] = useState<string | null>(null);
	const activeCollection = useMemo(
		() => collections.find((c) => c.slug === activeSlug),
		[activeSlug, collections],
	);
	return (
		<div className="min-h-screen bg-[#1f2224] text-white pt-24">
			{!activeCollection ? (
				<div className={styles["photo-wrapper"]}>
					<section id={styles.photos}>
						{collections.map((item) => (
							<button
								type="button"
								key={item.slug}
								className={styles.card}
								onClick={() => setActiveSlug(item.slug)}>
								<div className={styles.image}>
									<Image
										src={`/images/full/${item.slug}/${item.cover}`}
										alt={item.title}
										fill
										sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
										className="object-cover"
										priority={item.slug === "prague"}
									/>
								</div>
								<div className={styles.meta}>
									<h3 className={styles.title}>{item.title.toUpperCase()}</h3>
									<p className={styles.description}>{item.description}</p>
									<p className={styles.count}>{item.pictures.length} photos</p>
								</div>
							</button>
						))}
					</section>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between px-6">
						<button
							type="button"
							onClick={() => setActiveSlug(null)}
							className="text-sm uppercase font-helveticaNeue text-white/70 underline">
							← Back to all
						</button>
						<p className="text-sm uppercase font-helveticaNeue text-white/60">
							{activeCollection.title}
						</p>
					</div>
					<ImprintsGrid collection={activeCollection} />
				</div>
			)}
		</div>
	);
}
