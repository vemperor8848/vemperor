import { animation } from "@portfolio/motion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MaskText({ children }: { children: string[] }) {
	const { ref, inView } = useInView({
		threshold: 0.75,
		triggerOnce: true,
	});

	return (
		<span
			ref={ref}
			className="inline-block">
			{children.map((phrase, index) => (
				<span
					key={index}
					className="block overflow-hidden">
					<motion.span
						custom={index}
						variants={animation}
						initial="initial"
						animate={inView ? "enter" : ""}>
						{phrase}
					</motion.span>
				</span>
			))}
		</span>
	);
}
