"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import ThemeToggleButton from "./theme-toggle-button";
import { ExpandedTabs } from "./expanded-tabs";
import {
	Home,
	Info,
	Briefcase,
	Mail,
	User,
	FileText,
	ShoppingBag,
	ToolCase,
	Volume2,
} from "lucide-react";
import { NotificationList } from "@/components/animate-ui/ui-elements/notification-list";
import { RollingText } from "../animate-ui/text/rolling";
import { useLenis } from "./lenis-provider";

export function Navbar() {
	const [isHovered, setIsHovered] = useState(false);
	const { lenis } = useLenis();

	const tabs = [
		{ title: "Home", icon: Home, target: "home-section" },
		{ title: "About", icon: Info, target: "about-section" },
		{ title: "Projects", icon: ToolCase, target: "projects-section" },
		// { type: "separator" as const },
		// { title: "Contact", icon: Mail, target: "contact-section" },
		// { title: "Blog", icon: FileText, target: "blog-section" },
	];

	const handleTabClick = (index: number) => {
		console.log('Tab clicked:', index);
		const tab = tabs[index];
		console.log('Tab data:', tab);
		if (tab && 'target' in tab) {
			const targetElement = document.getElementById(tab.target);
			console.log('Target element:', targetElement);
			console.log('Lenis instance:', lenis);
			if (targetElement && lenis) {
				console.log('Scrolling to:', tab.target);
				lenis.scrollTo(targetElement, { duration: 1.5 });
			}
		}
	};

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="w-full px-4 py-4"
		>
			<div className="w-full">
				<div className="relative flex items-center justify-between rounded-2xl  border  border-[#3B3A3A] bg-[#e8d5b8] dark:bg-[#151515]/90 px-6 py-3 backdrop-blur-md shadow-lg">
					{/* Logo */}
					<div className="relative">
						<Link
							href="/"
							className="flex items-center space-x-3"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							{/* Profile Icon */}
							<div className="h-10 w-10 rounded-full bg-[#3B3A3A] flex items-center justify-center">
								<User className="h-6 w-6 text-white" />
							</div>

							{/* Name and Title */}
							<div className="flex flex-col">
								<RollingText
									text="Sebastian Fabara"
									className="text-lg font-bold text-[#151515] dark:text-white leading-tight"
								/>
								<span className="text-sm text-[#151515] dark:text-gray-400">Software Engineer</span>
							</div>
						</Link>

						{/* Hover Tooltip */}
						<AnimatePresence>
							{isHovered && (
								<motion.div
									initial={{ opacity: 0, scale: 0.95, y: 10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95, y: 10 }}
									transition={{ duration: 0.15, ease: "easeOut" }}
									className="absolute top-full left-0 mt-2 z-50"
								>
									<div className="bg-[#1a1918] border border-[#3B3A3A] rounded-xl p-4 shadow-xl backdrop-blur-sm min-w-[300px]">
										{/* Header */}
										{/* <div className="flex items-center justify-between mb-3">
											<div>
												<h3 className="text-[#fe7500] text-md font-semibold">
													Sebastian Fabara
												</h3>
												<p className="text-gray-400 text-xs">
													Software Engineer
												</p>
											</div>
										</div> */}

										{/* Pronunciation */}
										<div className="flex items-center gap-2 mb-3">
											<span className="text-white font-medium">Sebastian Fabara</span>
											<Volume2 className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
										</div>

										{/* Name label */}
										<div className="mb-2">
											<span className="text-gray-500 text-sm">name</span>
											<div className="text-white font-mono">səˈbæstiən fəˈbɑːrə</div>
										</div>

										{/* Description */}
										<p className="text-gray-400 text-xs leading-relaxed">
											A passionate full-stack developer who creates modern,
											user-friendly applications with a focus on clean code,
											innovative solutions, and exceptional user experiences.
										</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Navigation Tabs */}
					<div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
						<ExpandedTabs
							tabs={tabs}
							activeColor="text-[#fe7500]"
							className="border-[#3B3A3A] bg-[#f5f3ee] dark:bg-[#1a1918]"
							onChange={handleTabClick}
						/>
					</div>

					{/* Right Actions */}
					<div className="flex items-center gap-4">
						<ThemeToggleButton variant="circle" start="center" />
					</div>
				</div>
			</div>
		</motion.nav>
	);
}
