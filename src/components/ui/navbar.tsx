"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
	ToolCase
} from "lucide-react";
import { NotificationList } from "@/components/animate-ui/ui-elements/notification-list";
import { RollingText } from "../animate-ui/text/rolling";

export function Navbar() {
	const tabs = [
		{ title: "Home", icon: Home },
		{ title: "Projects", icon: ToolCase },
		{ title: "About", icon: Info },
		{ type: "separator" as const },
		{ title: "Contact", icon: Mail },
		{ title: "Blog", icon: FileText },
	];

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="w-full px-4 py-4"
		>
			<div className="w-full">
				<div className="relative flex items-center justify-between rounded-2xl  border  border-[#3B3A3A] bg-[#151515]/90 px-6 py-3 backdrop-blur-md shadow-lg">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<RollingText text="Sebastian Fabara" className="text-xl font-bold text-white" />
						{/* <span className="text-xl font-bold text-white">Sebastian Fabara</span> */}
						{/* <div className="h-6 w-6 rounded-full bg-[#fe7500]" /> */}
					</Link>

					{/* Navigation Tabs */}
					<div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
						<ExpandedTabs
							tabs={tabs}
							activeColor="text-[#fe7500]"
							className="border-[#3B3A3A] bg-[#1a1918]"
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
