"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Sticky() {
	const cursorSize = 20;
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouseX, smoothOptions),
		y: useSpring(mouseY, smoothOptions),
	};

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const { clientX, clientY } = event;
			mouseX.set(clientX - cursorSize / 2);
			mouseY.set(clientY - cursorSize / 2);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [cursorSize, mouseX, mouseY]);

	return (
		<motion.div
			className="w-[15px] h-[15px] fixed rounded-[100%] bg-[#202020] pointer-events-none z-[100]"
			style={{
				left: smoothMouse.x,
				top: smoothMouse.y,
			}}></motion.div>
	);
}
