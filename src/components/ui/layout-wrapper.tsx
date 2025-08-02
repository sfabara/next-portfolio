"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "./navbar";
import { NotificationList } from "@/components/animate-ui/ui-elements/notification-list";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import EightBitScreen from "./eight-bit-screen";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
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

		// Function to setup scroll triggers
		const setupScrollTriggers = () => {
			// Clear existing triggers
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			// Note: Cards are now fixed positioned from bottom, so scroll triggers may not be needed
			// Keeping this function for potential future scroll effects
		};

		// Setup triggers initially
		setupScrollTriggers();

		// Handle window resize
		const handleResize = () => {
			setupScrollTriggers();
		};

		window.addEventListener("resize", handleResize);

		// Clean up function
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div ref={containerRef} className="relative">
			{/* Top Fixed Container */}
			<div className="fixed top-0 left-0 right-0 z-50">
				{/* Navbar - Full width on mobile, 75% on desktop */}
				<div className="w-full lg:w-[75%]">
					<Navbar />
				</div>

				{/* Notification List - Hidden on mobile, visible on larger screens */}
				<div
					className="hidden lg:block fixed top-4 right-4 z-50"
					onMouseEnter={() => setIsNotificationHovered(true)}
					onMouseLeave={() => setIsNotificationHovered(false)}
				>
					<NotificationList />
				</div>
			</div>

			{/* Main Content - Responsive width */}
			<div className="pt-16 sm:pt-20 lg:pt-24 w-full lg:w-9/12 px-4 lg:px-0">
				{children}
			</div>

			{/* Mobile Connect Section - Only visible on mobile */}
			<div className="lg:hidden px-4 sm:px-6 mt-8 mb-8">
				<h2 className="text-xl font-bold text-center mb-6">Connect With Me</h2>
				<div className="space-y-6">
					{/* Mobile Connect Card */}
					<Link href="/connect">
						<motion.div
							className="bg-[#1a1a1a] border-2 border-[#ff8c00] rounded-lg p-4 text-[#ff8c00] relative shadow-[0_0_20px_rgba(255,140,0,0.3)] overflow-hidden w-full max-w-[280px] mx-auto"
							style={{
								fontFamily: "monospace",
								imageRendering: "pixelated",
								filter: "contrast(1.1) brightness(1.1)",
							}}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							{/* Scanlines effect */}
							<div
								className="absolute inset-0 pointer-events-none"
								style={{
									background:
										"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,140,0,0.03) 2px, rgba(255,140,0,0.03) 4px)",
									zIndex: 1,
								}}
							/>

							{/* Green glowing circle */}
							<div className="absolute top-4 right-4 w-4 h-4 bg-[#00ff41] rounded-full shadow-[0_0_12px_rgba(0,255,65,0.8)] animate-pulse" />

							{/* Content */}
							<div className="relative z-10">
								<h3
									className="text-xs font-bold mb-3 tracking-wider uppercase opacity-80"
									style={{
										fontFamily: "monospace",
										textShadow: "0 0 8px rgba(255,140,0,0.5)",
									}}
								>
									&gt; OPEN_TO_WORK.exe
								</h3>
								<p
									className="text-lg font-bold tracking-wide"
									style={{
										fontFamily: "monospace",
										textShadow: "0 0 12px rgba(255,140,0,0.4)",
									}}
								>
									[CONNECT]
								</p>
								<div className="mt-2 text-xs opacity-60 font-mono">
									STATUS: ONLINE
								</div>
							</div>

							{/* Corner decorations */}
							<div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-[#ff8c00]" />
							<div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-[#ff8c00]" />
							<div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-[#ff8c00]" />
							<div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-[#ff8c00]" />
						</motion.div>
					</Link>

					{/* Mobile Social Links */}
					<motion.div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-2 py-4 border border-[#3B3A3A] relative w-full max-w-[280px] mx-auto">
						<div className="flex justify-center items-center gap-3">
							<a
								href="https://linkedin.com/in/your-profile"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-[#0077b5] hover:bg-[#005885] transition-colors duration-200 group"
							>
								<Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
							<a
								href="https://github.com/your-username"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-[#333] hover:bg-[#24292e] transition-colors duration-200 group"
							>
								<Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
							{/* <a
								href="https://instagram.com/your-profile"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:from-[#6a2c91] hover:via-[#d41717] hover:to-[#d89c3a] transition-all duration-200 group"
							>
								<Instagram className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
							</a> */}
							<a
								href="mailto:your-email@example.com"
								className="p-2 rounded-lg bg-[#34d399] hover:bg-[#10b981] transition-colors duration-200 group"
							>
								<Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
						</div>
					</motion.div>

					{/* Mobile Eight Bit Screen */}
					<motion.div
						className="bg-[#ffe4be] rounded-2xl overflow-hidden w-full max-w-[280px] mx-auto"
						style={{ padding: 0, position: "relative" }}
					>
						<div className="flex justify-center items-center px-2">
							<EightBitScreen
								rows={10}
								cols={14}
								pixelSize={12}
								showFire={true}
								enableHover={true}
								enableScatter={true}
								showScanlines={true}
								showGlitchEffect={true}
								className="bg-[#ffe4be] dark:bg-[#343030]"
							/>
						</div>
					</motion.div>
				</div>

				{/* Mobile Notification List */}
				<div className="w-full mt-8">
					<NotificationList />
				</div>
			</div>

			{/* Desktop Sticky Cards Section - Only visible on desktop */}
			<div className="hidden lg:block fixed right-4 bottom-8 w-[280px] z-40">
				<div className="space-y-6 flex flex-col">
					{/* Desktop Connect Card */}
					{/* <Link href="/connect" className="cursor-pointer p-6 all-unset"> */}
						<motion.div
							ref={(el) => {
								if (el) cardsRef.current[0] = el;
							}}
							transition={{ duration: 0.6 }}
							animate={{
								y: isNotificationHovered ? 80 : 0,
							}}
							className="bg-[#1a1a1a] border-2 border-[#ff8c00] rounded-lg p-6 text-[#ff8c00] relative z-30 shadow-[0_0_20px_rgba(255,140,0,0.3)] overflow-hidden"
							style={{
								fontFamily: "monospace",
								imageRendering: "pixelated",
								filter: "contrast(1.1) brightness(1.1)",
							}}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							{/* Scanlines effect */}
							<div
								className="absolute inset-0 pointer-events-none"
								style={{
									background:
										"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,140,0,0.03) 2px, rgba(255,140,0,0.03) 4px)",
									zIndex: 1,
								}}
							/>

							{/* Green glowing circle */}
							<div className="absolute top-4 right-4 w-4 h-4 bg-[#00ff41] rounded-full shadow-[0_0_12px_rgba(0,255,65,0.8)] animate-pulse" />

							{/* Content */}
							<div className="relative z-10">
								<h3
									className="text-xs font-bold mb-3 tracking-wider uppercase opacity-80"
									style={{
										fontFamily: "monospace",
										textShadow: "0 0 8px rgba(255,140,0,0.5)",
									}}
								>
									&gt; OPEN_TO_WORK.exe
								</h3>
								<p
									className="text-xl font-bold tracking-wide"
									style={{
										fontFamily: "monospace",
										textShadow: "0 0 12px rgba(255,140,0,0.4)",
									}}
								>
									[CONNECT]
								</p>
								<div className="mt-2 text-xs opacity-60 font-mono">
									STATUS: ONLINE
								</div>
							</div>

							{/* Corner decorations */}
							<div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-[#ff8c00]" />
							<div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-[#ff8c00]" />
							<div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-[#ff8c00]" />
							<div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-[#ff8c00]" />
						</motion.div>
					{/* </Link> */}

					{/* Desktop Social Links */}
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
							{/* <a
								href="https://instagram.com/your-profile"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:from-[#6a2c91] hover:via-[#d41717] hover:to-[#d89c3a] transition-all duration-200 group"
							>
								<Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
							</a> */}
							<a
								href="mailto:your-email@example.com"
								className="p-2 rounded-lg bg-[#34d399] hover:bg-[#10b981] transition-colors duration-200 group"
							>
								<Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
							</a>
						</div>
					</motion.div>

					{/* Desktop Eight Bit Screen */}
					<motion.div
						ref={(el) => {
							if (el) cardsRef.current[2] = el;
						}}
						transition={{ delay: 0.2, duration: 0.6 }}
						animate={{
							y: isNotificationHovered ? 80 : 0,
						}}
						className="bg-[#ffe4be] rounded-2xl overflow-hidden"
						style={{ padding: 0, position: "relative", zIndex: 10 }}
					>
						<div className="flex justify-center items-center px-4">
							<EightBitScreen
								rows={12}
								cols={16}
								pixelSize={16}
								showFire={true}
								enableHover={true}
								enableScatter={true}
								showScanlines={true}
								showGlitchEffect={true}
								className="bg-[#ffe4be] dark:bg-[#343030]"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
