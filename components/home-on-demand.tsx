import { AnimatedText } from "@/components";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function OnDemand({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
	const rotate = useTransform(scrollYProgress, [0, 0.6], [-35, 0]);
	return (
		<div id="imprints">
			<div className="w-full h-screen flex items-center justify-center">
				<div className="w-full flex flex-col items-center justify-center gap-10 overflow-hidden">
					<AnimatedText
						className="leading-none text-white text-[200px]"
						text="imprints"
					/>
					<div className="flex flex-col gap-2 items-center justify-center overflow-hidden text-center">
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="In-depth breakdowns of every build I ship."
						/>
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="Motion studies, prototypes, and code receipts."
						/>
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="Systems thinking for a solo studio pace."
						/>
					</div>
				</div>
			</div>
			<motion.div
				style={{ scale, rotate }}
				className="w-full h-screen sticky top-0 left-0 overflow-hidden">
				<div className="w-full h-full">
					<video
						src="/TheFlowParty.mp4"
						loop
						autoPlay
						className="w-full h-full object-cover"
						muted
					/>
				</div>
				<div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
					<h1 className="text-[45vw] uppercase leading-tight whitespace-nowrap tracking-[-5] font-humaneMedium text-white">
						IMPRINTS
					</h1>
				</div>
				<div className="absolute bottom-5 text-center left-1/2 -translate-x-1/2">
					<h1 className="text-[22px] font-helveticaNeue leading-tight text-white uppercase">
						Subscribe for fresh essays and{" "}
						<span className="text-[34px] font-bodoniseventytwo leading-tight lowercase">
							build logs
						</span>{" "}
						that you can <br /> reuse on your own projects.
					</h1>
				</div>
			</motion.div>
		</div>
	);
}
