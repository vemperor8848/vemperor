"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./imprints-grid.module.css";

type Imprint = {
	title: string;
	slug: string;
	description: string;
	pictures: string[];
};

export default function ImprintsGrid({ collection }: { collection: Imprint }) {
	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(0);

	const open = (i: number) => {
		setIndex(i);
		setShow(true);
	};

	const close = () => setShow(false);

	const next = () =>
		setIndex((prev) => (prev + 1) % collection.pictures.length);
	const prev = () =>
		setIndex((prev) =>
			prev === 0 ? collection.pictures.length - 1 : prev - 1,
		);

	useEffect(() => {
		if (!show) return;
		const handle = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		window.addEventListener("keydown", handle);
		return () => window.removeEventListener("keydown", handle);
	}, [show]);

	return (
		<>
			<div className={styles["photo-wrapper"]}>
				<section id={styles.photos}>
					{collection.pictures.map((image, i) => (
						<Image
							key={image}
							src={`/images/thumbs/${collection.slug}/${image}`}
							alt={image}
							width={600}
							height={600}
							onClick={() => open(i)}
							priority={collection.slug === "prague" && i < 6}
						/>
					))}
				</section>
			</div>

			{show && (
				<div className={styles.modal}>
					<div className={styles.backdrop} onClick={close} />
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h3 className={styles.title}>{collection.title}</h3>
							<button
								type="button"
								className={styles.close}
								onClick={close}>
								×
							</button>
						</div>
						<div className={styles.modalBody}>
							<button
								type="button"
								className={styles.navButton}
								onClick={prev}>
								‹
							</button>
							<div className={styles.modalImage}>
								<Image
									src={`/images/full/${collection.slug}/${collection.pictures[index]}`}
									alt={collection.title}
									fill
									sizes="(min-width: 1200px) 70vw, 90vw"
									className="object-contain"
									priority
								/>
							</div>
							<button
								type="button"
								className={styles.navButton}
								onClick={next}>
								›
							</button>
						</div>
						<p className={styles.count}>
							{index + 1} / {collection.pictures.length}
						</p>
					</div>
				</div>
			)}
		</>
	);
}
