"use client";
import { motion } from "framer-motion";

export function PreLoad() {
	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0e0e0e] text-white">
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
				className="flex flex-col items-center gap-3">
				<p className="text-sm uppercase tracking-[0.2em] font-helveticaNeue">
					Loading portfolio
				</p>
				<div className="w-32 h-1 bg-white/10 overflow-hidden rounded-full">
					<motion.div
						className="h-full bg-white"
						initial={{ x: "-100%" }}
						animate={{ x: "100%" }}
						transition={{
							repeat: Infinity,
							repeatType: "mirror",
							duration: 1.2,
							ease: "easeInOut",
						}}
					/>
				</div>
			</motion.div>
		</div>
	);
}
