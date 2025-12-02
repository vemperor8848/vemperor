"use client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import type { StaticImageData } from "next/image";

type ProjectCardProps = {
	item: {
		href: string;
		img: StaticImageData | string;
		title: string;
	};
	index: number;
	setModal: Dispatch<
		SetStateAction<{
			active: boolean;
			index: number;
		}>
	>;
};

export default function ProjectCard({
	item,
	index,
	setModal,
}: ProjectCardProps) {
	return (
		<div
			className="relative w-full h-full"
			onMouseEnter={() => {
				setModal({ active: true, index });
			}}
			onMouseLeave={() => {
				setModal({ active: false, index });
			}}>
			<Link
				href={item.href}
				target="_blank"
				className="rounded-[10px] overflow-hidden block">
				<Image
					src={item.img}
					alt={`${item.title}Img`}
					className="object-cover rounded-[10px] h-full w-full"
				/>
			</Link>
		</div>
	);
}
