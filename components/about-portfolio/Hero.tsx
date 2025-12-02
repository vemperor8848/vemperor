"use client";
import Image from "next/image";
import { hero } from "@/public";
import { Navbar } from "@portfolio/components";

export default function Hero() {
	return (
		<section className="w-full h-screen relative">
			<Navbar />
			<div className="w-full h-full overflow-hidden">
				<div className="hero-img w-full h-full relative">
					<Image
						src={hero}
						alt="heroImg"
						className="w-full h-full object-cover"
						priority
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<h1 className="text-white text-[14vw] sm:text-[18vw] font-humaneMedium uppercase tracking-[0.2em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
							V-EMPEROR
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
}
