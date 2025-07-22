"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Navbar } from "./navbar";
import { NotificationList } from "@/components/animate-ui/ui-elements/notification-list";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import EightBitScreen from "./eight-bit-screen";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface LayoutWrapperProps {
	children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);

	useLayoutEffect(() => {
		const cards = cardsRef.current;

		// Create sticky effect for each card
		cards.forEach((card, index) => {
			if (!card) return;

			ScrollTrigger.create({
				trigger: card,
				start: `top ${150 + index * 120}px`, // Stagger the start positions
				end: "max", // Stick until the end of the page
				pin: true,
				pinSpacing: false,
				// Add a z-index to ensure proper stacking
				onToggle: (self) => {
					if (self.isActive) {
						card.style.zIndex = String(40 - index);
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

				{/* Notification List - Fixed on right */}
				<div className="fixed top-4 right-4 z-50">
					<NotificationList />
				</div>
			</div>

			{/* Main Content */}
			<div className="pt-24">{children}</div>

			{/* Sticky Cards Section */}
			<div className="absolute right-4 top-[40vh] w-[280px] z-40">
				<div className="space-y-96">
					{/* Large spacing to create scroll distance */}
					<motion.div
						ref={(el) => {
							if (el) cardsRef.current[0] = el;
						}}
						// initial={{ opacity: 0, x: 0 }}
						// animate={{ opacity: 1, x: 20 }}
						transition={{ duration: 0.6 }}
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
						// initial={{ opacity: 0, x: 20 }}
						// animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1, duration: 0.6 }}
						className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-6 border border-[#3B3A3A] relative z-20"
					>
						<h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
							GITHUB
						</h3>
						<p className="text-lg font-semibold text-[#151515] dark:text-white">
							100+ Repositories
						</p>
					</motion.div>
					<motion.div
						ref={(el) => {
							if (el) cardsRef.current[2] = el;
						}}
						// initial={{ opacity: 0, x: 20 }}
						// animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="bg-[#0a0a0a] rounded-2xl overflow-visible"
						style={{ padding: 0, position: 'relative', zIndex: 10 }}
					>
						<div className="p-4">
							<h3 className="text-sm font-medium text-gray-400 mb-2">
								8-BIT FIRE
							</h3>
						</div>
						<div className="px-2 pb-4" style={{ position: 'relative', zIndex: 1 }}>
							<div style={{ marginLeft: '-16px' }}> {/* Compensate for component padding */}
								<EightBitScreen
									rows={12}
									cols={16}
									pixelSize={16}
									showFire={true}
									enableHover={true}
									enableScatter={true}
									showScanlines={true}
									showGlitchEffect={true}
									backgroundColor="#fff"
									className="mx-auto"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
