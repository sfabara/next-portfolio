"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "./navbar";
import { NotificationList } from "@/components/animate-ui/ui-elements/notification-list";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import EightBitScreen from "./eight-bit-screen";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface LayoutWrapperProps {
	children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);
	const [isNotificationHovered, setIsNotificationHovered] = useState(false);

	useLayoutEffect(() => {
		const cards = cardsRef.current;

		// Create sticky effect for each card
		cards.forEach((card, index) => {
			if (!card) return;

			const startPosition = 150 + index * 120;

			ScrollTrigger.create({
				trigger: card,
				start: `top ${startPosition}px`,
				end: "max",
				pin: true,
				pinSpacing: false,
				onToggle: (self) => {
					if (self.isActive) {
						card.style.zIndex = String(50 - index);
					}
				},
			});
		});

		// Clean up function
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div ref={containerRef} className="relative">
			{/* Top Fixed Container */}
			<div className="fixed top-0 left-0 right-0 z-50 flex">
				{/* Navbar - 75% width */}
				<div className="w-[75%]">
					<Navbar />
				</div>

				{/* Notification List - Fixed on right next to navbar */}
				<div 
					className="fixed top-4 right-4 z-50"
					onMouseEnter={() => setIsNotificationHovered(true)}
					onMouseLeave={() => setIsNotificationHovered(false)}
				>
					<NotificationList />
				</div>
			</div>

			{/* Main Content */}
			<div className="pt-24 w-9/12">{children}</div>

			{/* Sticky Cards Section */}
			<div className="absolute right-4 top-[40vh] w-[280px] z-40">
				<div className="space-y-96">
					{/* Large spacing to create scroll distance */}
					<motion.div
						ref={(el) => {
							if (el) cardsRef.current[0] = el;
						}}
						transition={{ duration: 0.6 }}
						animate={{
							y: isNotificationHovered ? 80 : 0,
						}}
						className="bg-[#fe7500] dark:bg-[#ff3f17] rounded-2xl p-6 text-white relative z-30"
					>
						<h3 className="text-sm font-medium mb-2 opacity-90">
							OPEN TO WORK
						</h3>
						<p className="text-2xl font-bold">Let's Connect</p>
					</motion.div>
					<motion.div
						ref={(el) => {
							if (el) cardsRef.current[1] = el;
						}}
						transition={{ delay: 0.3, duration: 0.6 }}
						animate={{
							y: isNotificationHovered ? 80 : 0,
						}}
						className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-2 py-4 border border-[#3B3A3A] relative"
						style={{ zIndex: 5 }}
					>
						<div className="flex justify-center items-center gap-4">
							<a
								href="https://linkedin.com/in/your-profile"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-[#0077b5] hover:bg-[#005885] transition-colors duration-200 group"
							>
								<Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
							<a
								href="https://github.com/your-username"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-[#333] hover:bg-[#24292e] transition-colors duration-200 group"
							>
								<Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
							<a
								href="https://instagram.com/your-profile"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:from-[#6a2c91] hover:via-[#d41717] hover:to-[#d89c3a] transition-all duration-200 group"
							>
								<Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
							<a
								href="mailto:your-email@example.com"
								className="p-2 rounded-lg bg-[#34d399] hover:bg-[#10b981] transition-colors duration-200 group"
							>
								<Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
						</div>
					</motion.div>
					<motion.div
						ref={(el) => {
							if (el) cardsRef.current[2] = el;
						}}
						transition={{ delay: 0.2, duration: 0.6 }}
						animate={{
							y: isNotificationHovered ? 80 : 0,
						}}
						className="bg-[#0a0a0a] rounded-2xl overflow-hidden"
						style={{ padding: 0, position: 'relative', zIndex: 10 }}
					>
						{/* <div className="p-4">
							<h3 className="text-sm font-medium text-gray-400 mb-2">
								More Custom Components 
							</h3>
						</div> */}
						<div className="flex justify-center items-center px-4 pb-4">
							<EightBitScreen
								rows={12}
								cols={16}
								pixelSize={16}
								showFire={true}
								enableHover={true}
								enableScatter={true}
								showScanlines={true}
								showGlitchEffect={true}
								backgroundColor="#000"
								className=""
							/>
						</div>
					</motion.div>
					
				</div>
			</div>
		</div>
	);
}
