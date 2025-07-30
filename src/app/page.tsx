"use client"

import { LayoutWrapper } from "@/components/ui/layout-wrapper"
import { MaskedDiv, GridPattern, DotPattern } from "@/components/ui/masked-div"
import { motion } from "framer-motion"
import WrapButton from "@/components/ui/wrap-button"
import { Footer } from "@/components/ui/footer"
import Projects from "@/sections/projects"

export default function Home() {
  return (
    <LayoutWrapper>
      {/* Main Section with Grid Layout */}
      <section className="relative min-h-screen overflow-hidden ">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0">
          <GridPattern className="opacity-20 stroke-[#3B3A3A]" />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-6rem)]">
            
            {/* Left Column - About Info */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-6 border border-[#3B3A3A]"
              >
                <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                  SOFTWARE ENGINEER
                </h3>
                <h2 className="text-2xl font-bold text-[#151515] dark:text-white mb-4">
                  Sebastian Fabara
                </h2>
                <p className="text-sm text-[#3B3A3A] dark:text-gray-500 leading-relaxed">
                  Core contributor to cryptocurrency fintech applications and full-stack web development 
                  at Byte Federal. 3+ years experience building scalable React Native and web applications.
                </p>
              </motion.div>
            </div>

            {/* Center Column - Main Feature */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <MaskedDiv gradient="radial" className="w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-3xl p-8 lg:p-12 border border-[#3B3A3A] shadow-2xl"
                >
                  {/* Specification Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400">
                      EXPERTISE
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                        FRONTEND
                      </span>
                      <span className="text-xs px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                        BACKEND
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="mb-8"
                    >
                      <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-[#151515] dark:text-white">
                        Cryptocurrency
                      </h1>
                      <p className="text-2xl lg:text-3xl font-bold text-[#fe7500] dark:text-[#ff3f17]">
                        & FinTech Solutions
                      </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">React Native</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">TypeScript</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Python</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">FastAPI</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">Next.js</p>
                      </div>
                      <div className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-lg p-4 border border-[#3B3A3A]">
                        <p className="text-xs text-[#3B3A3A] dark:text-gray-500">AWS</p>
                      </div>
                    </div>

                    {/* Experience Info */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                        EXPERIENCE
                      </h4>
                      <p className="text-sm text-[#3B3A3A] dark:text-gray-500">
                        3+ years at Byte Federal building cryptocurrency wallets, payment systems, and fintech applications.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <WrapButton href="/projects">
                      VIEW PROJECTS
                    </WrapButton>
                  </div>
                </motion.div>
              </MaskedDiv>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="lg:col-span-3 flex flex-col gap-6 justify-center">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-6 border border-[#3B3A3A]"
              >
                <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400 mb-2">
                  CONTACT
                </h3>
                <h4 className="text-lg font-bold text-[#151515] dark:text-white mb-3">
                  Let's Connect
                </h4>
                <p className="text-sm text-[#3B3A3A] dark:text-gray-500 mb-4">
                  Ready to discuss your next project or collaboration?
                </p>
                <WrapButton href="mailto:sfabaraa@gmail.com" className="w-full">
                  GET IN TOUCH
                </WrapButton>
              </motion.div>

              {/* Status Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-2xl p-6 border border-[#3B3A3A]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-[#3B3A3A] dark:text-gray-400">
                    STATUS
                  </h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <h4 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                  Available for Work
                </h4>
                <p className="text-xs text-[#3B3A3A] dark:text-gray-500">
                  Currently accepting new projects and collaborations
                </p>
              </motion.div>
            </div>
           
          </div>
        </div>

        {/* Floating Grid Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#3B3A3A] rounded-lg opacity-10" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#3B3A3A] rounded-full opacity-10" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-[#fe7500] rounded opacity-10" />
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-24 bg-[#f5f3ee] dark:bg-[#1f1e1d]">
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
              A selection of my recent work showcasing modern web technologies and creative solutions
            </p>
          </motion.div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-[#fe7500] to-[#ff3f17] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿yte Federal</span>
              </div>
              <h3 className="text-xl font-bold text-[#151515] dark:text-white mb-2">
                Custodial Crypto Wallet
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400 mb-4">
                Core contributor to React Native cryptocurrency wallet with fiat-to-crypto onboarding via banking APIs
              </p>
              <div className="flex gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  React Native
                </span>
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  Python
                </span>
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  FastAPI
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-[#3B3A3A] to-[#1a1918] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Interactive Alchemy</span>
              </div>
              <h3 className="text-xl font-bold text-[#151515] dark:text-white mb-2">
                Software Consulting
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400 mb-4">
                Software consulting business focused on curating custom B2B software solutions and web development
              </p>
              <div className="flex gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  Consulting
                </span>
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  Web Design
                </span>
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  B2B
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-[#e8d5b8] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-[#e8d5b8] to-[#3B3A3A] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🪙 Martian Republic</span>
              </div>
              <h3 className="text-xl font-bold text-[#151515] dark:text-white mb-2">
                HD Crypto Wallet
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400 mb-4">
                Client-side HD wallet for Marscoin cryptocurrency with bitcoin-lib.js and encrypted localStorage
              </p>
              <div className="flex gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  JavaScript
                </span>
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  bitcoin-lib.js
                </span>
                <span className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                  Open Source
                </span>
              </div>
            </motion.div>
          </div> */}
          <Projects />

          <div className="text-center mt-12">
            <WrapButton href="/projects">
              VIEW ALL PROJECTS
            </WrapButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 bg-[#1a1918]">
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
              From concept to deployment, I provide comprehensive web development services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-[#f5f3ee] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] text-center"
            >
              <div className="w-12 h-12 bg-[#fe7500] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">₿</span>
              </div>
              <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                Cryptocurrency Apps
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
                React Native custodial and non-custodial wallets with fiat-crypto onboarding and banking APIs
              </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-[#f5f3ee] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] text-center"
            >
              <div className="w-12 h-12 bg-[#ff3f17] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">API</span>
              </div>
              <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                Payment & Banking APIs
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
                Python FastAPI and Node.js REST APIs for ACH transfers, wire transfers, and Plaid integration
              </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-[#f5f3ee] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] text-center"
            >
              <div className="w-12 h-12 bg-[#3B3A3A] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">🔐</span>
              </div>
              <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                Authentication Systems
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
                'Fast Auth' protocol implementation across internal tools and customer-facing platforms
              </p>
            </motion.div>

            {/* Service 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-[#f5f3ee] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] text-center"
            >
              <div className="w-12 h-12 bg-[#e8d5b8] border border-[#3B3A3A] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#151515] font-bold">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-[#151515] dark:text-white mb-2">
                Legacy Modernization
              </h3>
              <p className="text-sm text-[#3B3A3A] dark:text-gray-400">
                Led transition from legacy PHP to modern React/Next.js stack, improving performance and UX
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </LayoutWrapper>
  )
}
