import Link from "next/link";
import Button from "./button";
import Image from "next/image";
import { motion } from "framer-motion";
import { flowCurveTextWhite } from "@/public";

export default function Footer() {
	return (
		<div
			id="newsletter"
			className="w-full pt-40 px-10">
			<h1 className="text-[25vw] uppercase leading-none text-center tracking-[-5] font-humaneMedium text-white">
				subscribe to the log
			</h1>
			<div className="relative w-full flex items-center justify-center">
				<Image
					src={flowCurveTextWhite}
					alt=""
					width={1000}
					height={1000}
					className="w-[70%] h-full object-cover"
				/>
				<div className="absolute -bottom-20 right-80">
					<div className="relative">
						<motion.img
							animate={{
								rotate: [0, 360],
								transition: {
									duration: 6,
									ease: "linear",
									repeat: Infinity,
								},
							}}
							src={"/circlerotation.svg"}
							alt="right eye"
							width={250}
							height={250}
							className="w-[250px] h-[250px]"
						/>
						<h1 className="text-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase leading-tight font-humaneMedium text-black">
							blog
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
