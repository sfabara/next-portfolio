"use client";

import { LayoutWrapper } from "@/components/ui/layout-wrapper";
import { MaskedDiv, GridPattern, DotPattern } from "@/components/ui/masked-div";
import { motion } from "framer-motion";
import WrapButton from "@/components/ui/wrap-button";
import { Footer } from "@/components/ui/footer";
import Projects from "@/sections/projects";
import { useLenis } from "@/components/ui/lenis-provider";
import { BentoGrid } from "@/components/ui/bento-grid";

export default function Home() {
	const { lenis } = useLenis();

	return (
		<LayoutWrapper>
			{/* Main Section with Grid Layout */}
			<section
				id="home-section"
				className="relative min-h-screen overflow-hidden border-2 border-[#3B3A3A90] rounded-xl m-5 p-6"
			>
				{/* Background Grid Pattern */}
				<div className="absolute inset-0">
					<GridPattern className="opacity-20 stroke-[#3B3A3A]" />
				</div>

				{/* Main Content Container */}
				<div className="relative z-10 container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-6rem)]">
						{/* Main Content - Center Column (appears first on mobile, second on desktop) */}
						<div className="lg:col-span-9 lg:order-2 flex items-center justify-center">
							<MaskedDiv gradient="radial" className="w-full">
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8 }}
									className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#3B3A3A] shadow-2xl"
								>
									{/* Specification Header */}
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
										<h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400">
											EXPERTISE & SKILLS
										</h3>
										<div className="flex flex-wrap gap-2">
											<span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
												FRONTEND
											</span>
											<span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
												BACKEND
											</span>
											<span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
												SYSTEM DESIGN
											</span>
											<span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
												UI/UX
											</span>
										</div>
									</div>

									{/* Main Content */}
									<div className="text-center mb-8 sm:mb-12">
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2, duration: 0.6 }}
											className="mb-6 sm:mb-8"
										>
											<h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 text-[#151515] dark:text-white">
												Software Engineer
											</h1>
											{/* <p className="text-2xl lg:text-3xl font-bold text-[#fe7500] dark:text-[#ff3f17]">
                        & FinTech Solutions
                      </p> */}
										</motion.div>

										{/* Skills Grid */}
										<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
											<div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-3 sm:p-4 border border-[#3B3A3A]">
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													React Native
												</p>
											</div>
											<div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-3 sm:p-4 border border-[#3B3A3A]">
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													TypeScript
												</p>
											</div>
											<div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-3 sm:p-4 border border-[#3B3A3A]">
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													Python
												</p>
											</div>
											<div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-3 sm:p-4 border border-[#3B3A3A]">
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													FastAPI
												</p>
											</div>
											<div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-3 sm:p-4 border border-[#3B3A3A]">
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													Next.js
												</p>
											</div>
											<div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-3 sm:p-4 border border-[#3B3A3A]">
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													AWS
												</p>
											</div>
										</div>

										{/* Experience Info */}
										<div className="mb-6 sm:mb-8">
											{/* <h4 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                        EXPERIENCE
                      </h4> */}
											<p className="text-sm text-[#3B3A3A] dark:text-gray-500">
												5+ years of experience
											</p>
										</div>

										{/* CTA Button */}
										<div className="flex justify-center">
											<button
												onClick={() => {
													const projectsSection =
														document.getElementById("projects-section");
													if (projectsSection && lenis) {
														lenis.scrollTo(projectsSection, { duration: 1.5 });
													}
												}}
												className="group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[56px] sm:h-[64px] flex items-center p-[8px] sm:p-[11px] rounded-full hover:shadow-lg transition-all duration-300"
											>
												<div className="border border-[#3B3A3A] bg-[#ff3f17] h-[39px] sm:h-[43px] rounded-full flex items-center justify-center text-white">
													<p className="font-medium tracking-tight mr-2 sm:mr-3 ml-2 flex items-center gap-2 justify-center text-sm sm:text-base">
														VIEW PROJECTS
													</p>
												</div>
												<div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[22px] sm:size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
													<svg
														width="16"
														height="16"
														className="sm:w-[18px] sm:h-[18px]"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 14l-7 7m0 0l-7-7m7 7V3"
														/>
													</svg>
												</div>
											</button>
										</div>
									</div>
								</motion.div>
							</MaskedDiv>
						</div>

						{/* Experience Timeline - Left Column (appears second on mobile, first on desktop) */}
						<div className="lg:col-span-3 lg:order-1 flex flex-col justify-center">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-4 sm:p-6 border border-[#3B3A3A]"
							>
								<h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-4 sm:mb-6">
									Experience Timeline
								</h3>

								{/* Timeline */}
								<div className="relative">
									{/* Timeline Line */}
									<div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#3B3A3A] dark:bg-gray-600"></div>

									{/* Timeline Items */}
									<div className="space-y-4 sm:space-y-6">
										{/* Current - Byte Federal */}
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.1, duration: 0.4 }}
											className="relative flex items-start"
										>
											<div className="flex-shrink-0 w-6 h-6 bg-[#fe7500] border-2 border-white dark:border-[#1f1e1d] rounded-full"></div>
											<div className="ml-4">
												<h4 className="text-xs font-semibold text-[#151515] dark:text-white">
													Byte Federal
												</h4>
												<p className="text-xs text-[#fe7500] font-medium">
													Software Engineer
												</p>
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													June 2021 – Current
												</p>
											</div>
										</motion.div>

										{/* Interactive Alchemy */}
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2, duration: 0.4 }}
											className="relative flex items-start"
										>
											<div className="flex-shrink-0 w-6 h-6 bg-[#ff3f17] border-2 border-white dark:border-[#1f1e1d] rounded-full"></div>
											<div className="ml-4">
												<h4 className="text-xs font-semibold text-[#151515] dark:text-white">
													Interactive Alchemy
												</h4>
												<p className="text-xs text-[#ff3f17] font-medium">
													Owner
												</p>
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													Current
												</p>
											</div>
										</motion.div>

										{/* Delta Air Lines */}
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3, duration: 0.4 }}
											className="relative flex items-start"
										>
											<div className="flex-shrink-0 w-6 h-6 bg-[#3B3A3A] border-2 border-white dark:border-[#1f1e1d] rounded-full"></div>
											<div className="ml-4">
												<h4 className="text-xs font-semibold text-[#151515] dark:text-white">
													Delta Air Lines
												</h4>
												<p className="text-xs text-[#3B3A3A] dark:text-gray-400 font-medium">
													Software Engineer Co-Op
												</p>
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													May 2019 – June 2021
												</p>
											</div>
										</motion.div>

										{/* AMD */}
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.4, duration: 0.4 }}
											className="relative flex items-start"
										>
											<div className="flex-shrink-0 w-6 h-6 bg-gray-400 border-2 border-white dark:border-[#1f1e1d] rounded-full"></div>
											<div className="ml-4">
												<h4 className="text-xs font-semibold text-[#151515] dark:text-white">
													AMD
												</h4>
												<p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
													Debug & Validation Intern
												</p>
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													Jan 2020 – June 2020
												</p>
											</div>
										</motion.div>

										{/* University */}
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.5, duration: 0.4 }}
											className="relative flex items-start"
										>
											<div className="flex-shrink-0 w-6 h-6 bg-gray-300 border-2 border-white dark:border-[#1f1e1d] rounded-full"></div>
											<div className="ml-4">
												<h4 className="text-xs font-semibold text-[#151515] dark:text-white">
													University of Central Florida
												</h4>
												<p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
													Bachelor of Science in CS
												</p>
												<p className="text-xs text-[#3B3A3A] dark:text-gray-500">
													Aug 2016 – July 2021
												</p>
											</div>
										</motion.div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Floating Grid Elements */}
				<div className="absolute top-20 left-10 w-32 h-32 border border-[#3B3A3A] rounded-lg opacity-10" />
				<div className="absolute bottom-20 right-20 w-24 h-24 border border-[#3B3A3A] rounded-full opacity-10" />
				<div className="absolute top-1/2 right-10 w-16 h-16 bg-[#fe7500] rounded opacity-10" />
			</section>

			{/* Services Section */}
			<section
				id="about-section"
				className="relative py-24 bg-[#1a1918] border-2 border-card rounded-xl m-5 p-5"
			>
				<div className="absolute inset-0">
					<DotPattern className="opacity-10 fill-[#3B3A3A]" />
				</div>

				<div className="relative z-10 container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
							What I Do
						</h2>
						<p className="text-lg text-gray-400 max-w-2xl mx-auto">
							From concept to deployment, I provide comprehensive technical
							leadership and engineering excellence
						</p>
					</motion.div>

					<BentoGrid />
				</div>
			</section>

			{/* Featured Projects Section */}
			<section
				id="projects-section"
				className="relative py-24 bg-[#f5f3ee] dark:bg-[#1f1e1d] border-2 border-card rounded-xl m-5 p-5"
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl lg:text-4xl font-bold text-[#151515] dark:text-white mb-4">
							Featured Projects
						</h2>
						<p className="text-lg text-[#3B3A3A] dark:text-gray-400 max-w-2xl mx-auto">
							A selection of my recent work showcasing modern web technologies
							and creative solutions
						</p>
					</motion.div>

					<Projects
						initialCount={3}
						showExpandButton={true}
						expandButtonText="VIEW ALL PROJECTS"
					/>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</LayoutWrapper>
	);
}
