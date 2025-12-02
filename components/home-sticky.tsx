"use client";
import { useCallback, useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Sticky() {
	const cursorSize = 100;
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const [isVisible, setIsVisible] = useState(false);

	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouseX, smoothOptions),
		y: useSpring(mouseY, smoothOptions),
	};

	const manageMouseMove = useCallback(
		(e: MouseEvent) => {
			const { clientX, clientY } = e;
			mouseX.set(clientX - cursorSize / 2.1);
			mouseY.set(clientY - cursorSize / 3.5);
		},
		[cursorSize, mouseX, mouseY],
	);

	useEffect(() => {
		const sliderContainers = document.querySelectorAll(".slider-container");

		const handleMouseEnter = () => {
			setIsVisible(true);
			window.addEventListener("mousemove", manageMouseMove);
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
			window.removeEventListener("mousemove", manageMouseMove);
		};

		sliderContainers.forEach((container) => {
			container.addEventListener("mouseenter", handleMouseEnter);
			container.addEventListener("mouseleave", handleMouseLeave);
		});

		return () => {
			sliderContainers.forEach((container) => {
				container.removeEventListener("mouseenter", handleMouseEnter);
				container.removeEventListener("mouseleave", handleMouseLeave);
			});
		};
	}, [manageMouseMove]);

	if (!isVisible) return null;

	return (
		<motion.div
			className="fixed z-[100] bg-white px-6 py-3 rounded-full shadow-lg pointer-events-none"
			style={{
				left: smoothMouse.x,
				top: smoothMouse.y,
			}}>
			<div className="flex items-center gap-3 justify-center">
				<BsArrowLeft size={20} />
				<h1 className="text-black text-center uppercase font-helveticaNeue font-semibold text-sm tracking-wide">
					Drag
				</h1>
				<BsArrowRight size={20} />
			</div>
		</motion.div>
	);
}
