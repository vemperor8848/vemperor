import { Eye } from "@/components";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function Hero({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
	return (
		<motion.div
			style={{ scale, rotate }}
			className="w-full h-screen bg-heroColor sticky top-0 left-0 pb-[10vh] overflow-hidden">
			<div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
				<h1 className="text-[45vw] uppercase leading-none tracking-[-5] font-humaneMedium text-white relative">
					blog
					<div className="absolute bottom-28 -right-16">
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
							<h1 className="text-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase leading-tight font-humaneMedium text-black tracking-wide">
								notes
							</h1>
						</div>
					</div>
				</h1>
			</div>
			<Eye />
			<div className="absolute bottom-5 text-center left-1/2 -translate-x-1/2">
				<div className="flex flex-col items-center gap-2 text-white">
					<span className="text-[18px] font-helveticaNeue uppercase tracking-[0.12em] px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
						我是 V Emperor · 创造者的自述
					</span>
					<span className="text-[22px] font-bodoniseventytwo lowercase leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f8d36f] to-white px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur">
						哲学 / 人工智能 / 管理学 · 实践、思考与大胆的构建笔记
					</span>
				</div>
			</div>
			<div className="absolute -top-20 -right-20">
				<motion.img
					src={"/linedraw.svg"}
					alt="right eye"
					width={300}
					height={300}
					className="w-full h-full rotate-[110deg]"
				/>
			</div>
			<div className="absolute bottom-20 -left-20">
				<motion.img
					src={"/linedraw.svg"}
					alt="right eye"
					width={300}
					height={300}
					className="w-full h-full"
				/>
			</div>
		</motion.div>
	);
}
