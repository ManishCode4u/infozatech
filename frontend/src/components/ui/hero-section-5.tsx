'use client'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'
import logo from '../../assets/images/logo/infozatech-logo.png'

const heroNavLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Internship', href: '/internship' },
    { label: 'Careers', href: '/careers' },
]

export function HeroSection() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <main className="overflow-x-hidden">
                <section id="home-hero-section" className="relative">
                    {/* Top Transparent Hero Navbar (Only for Hero Animation Section) */}
                    <div className="absolute top-0 left-0 right-0 z-30 mx-auto max-w-7xl px-6 lg:px-12 pt-6 sm:pt-8">
                        <div className="flex items-center justify-between">
                            {/* Left: Brand Logo & Navigation Links */}
                            <div className="flex items-center gap-8 lg:gap-12">
                                <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                                    <img
                                        src={logo}
                                        alt="InfozaTech Logo"
                                        className="h-10 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow-md"
                                    />
                                </Link>

                                {/* Desktop Nav Links */}
                                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                                    {heroNavLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            className="text-[15px] font-medium text-white/85 hover:text-white transition-colors duration-200 tracking-wide"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Right: Book a Call CTA & Mobile Menu Toggle */}
                            <div className="flex items-center gap-3">
                                <a
                                    href="tel:+919155596712"
                                    className="hidden sm:inline-flex items-center justify-center h-10 rounded-full px-5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                                >
                                    <span>Book a Call</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md transition-all hover:bg-white/20"
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Dropdown */}
                        {mobileMenuOpen && (
                            <div className="md:hidden mt-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex flex-col gap-1.5">
                                    {heroNavLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2.5 rounded-xl text-[15px] font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition flex items-center justify-between"
                                        >
                                            <span>{link.label}</span>
                                            <ChevronRight className="size-4 text-slate-400" />
                                        </Link>
                                    ))}
                                    <div className="pt-2.5 mt-1 border-t border-slate-100">
                                        <a
                                            href="tel:+919155596712"
                                            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span>Book a Call</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-60">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-medium tracking-tight text-white">Build 10x Faster with InfozaTech</h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg font-normal text-white/80">We design and build powerful websites, applications, and custom software solutions that help your business scale and grow faster.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base bg-white text-black hover:bg-white/90">
                                        <Link to="/internship">
                                            <span className="text-nowrap font-semibold">Apply Now</span>
                                            <ChevronRight className="ml-1" />
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full px-5 text-base border border-white text-white bg-transparent hover:bg-white/10 hover:text-white">
                                        <Link to="/services">
                                            <span className="text-nowrap">Our Services</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5 bg-black">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="size-full object-cover opacity-50 dark:opacity-35 dark:lg:opacity-75"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                            <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
                        </div>
                    </div>
                </section>

                {/* 2. VIRTUAL INTERNSHIP SECTION (Direct on Clean White Background) */}
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center relative z-10">
                    {/* Main Heading (Exact font style matching reference) */}
                    <h2 className="text-3xl md:text-4xl lg:text-[44px] font-medium text-[#1E293B] dark:text-white mb-4 tracking-tight">
                        Launch Your Career with <span className="text-[#2563EB]">InfozaTech Virtual Internship</span>
                    </h2>

                    {/* Sub Heading (Without bold) */}
                    <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
                        1-Month structured virtual internship with weekly milestone tasks, hands-on project builds, GitHub tracking, offer letter, and verifiable certificate.
                    </p>

                    {/* Both Buttons (Niche) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                        <a
                            href="https://forms.gle/SjDCcUxkjRAGpDRx6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 text-sm sm:text-base shadow-[0_8px_25px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span>Apply for Internship</span>
                            <ExternalLink className="size-4.5" />
                        </a>

                        <Link
                            to="/verify"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-zinc-900 text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-zinc-800 font-bold px-7 py-3.5 text-sm sm:text-base shadow-sm hover:shadow-[0_6px_20px_rgba(37,99,235,0.1)] hover:border-blue-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <ShieldCheck className="size-4.5 text-blue-600" />
                            <span>Verify Certificate</span>
                        </Link>
                    </div>
                </section>

                {/* 3. SCROLLING LOGO MARQUEE (Full Width, Sleek & Modern) */}
                <section className="bg-background pb-8 pt-4 overflow-hidden">
                    <div className="group relative m-auto max-w-7xl px-4 sm:px-6">
                        <div className="relative py-4 w-full">
                            <InfiniteSlider
                                speedOnHover={20}
                                speed={35}
                                gap={64}>
                                
                                {/* 1. Google */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">Google</span>
                                </div>

                                {/* 2. OpenAI */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0 text-slate-900 dark:text-white fill-current" viewBox="0 0 24 24">
                                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zM3.6 18.3048a4.47 4.47 0 0 1-.535-3.0141l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.14-1.6454zm-1.076-9.1413a4.4755 4.4755 0 0 1 2.3414-1.9733l-.0047.1657v5.5163a.7712.7712 0 0 0 .388.6766l5.8428 3.3732-2.02 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7914a4.4992 4.4992 0 0 1-1.6462-6.1354zm16.4715 3.7382l-5.8428-3.3732 2.02-1.1635a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.402-.6816zm2.0107-3.0235l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 10.3807V8.0483a.0804.0804 0 0 1 .0332-.0615l4.8398-2.7914a4.4992 4.4992 0 0 1 6.3394 4.6738zM8.3055 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0748a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.7029 5.4598a.7948.7948 0 0 0-.3927.6813v6.722zm1.0933-2.8718l2.603-1.4988 2.603 1.4988v3.0024l-2.603 1.4988-2.603-1.4988z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">OpenAI</span>
                                </div>

                                {/* 3. NVIDIA */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0 text-[#76B900] fill-current" viewBox="0 0 24 24">
                                        <path d="M8.948 4.316v2.336c2.47.24 4.437 2.308 4.437 4.823 0 2.684-2.235 4.872-4.977 4.872h-.605l1.942-1.942a2.38 2.38 0 0 0 0-3.364 2.38 2.38 0 0 0-3.364 0l-3.364 3.364c-.93.93-.93 2.434 0 3.364l4.244 4.244c.465.465 1.074.698 1.682.698s1.217-.233 1.682-.698c5.442-5.442 5.442-14.28 0-19.722-1.497-1.497-3.34-2.316-5.263-2.316-.76 0-1.503.128-2.214.377v2.392a8.65 8.65 0 0 1 1.794-.216c3.96 0 7.322 2.766 8.243 6.553a8.88 8.88 0 0 1-.368 5.704c-1.125-3.328-4.275-5.717-7.986-5.717-.384 0-.766.026-1.144.078V4.316z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">NVIDIA</span>
                                </div>

                                {/* 4. Stripe */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="h-4.5 w-auto text-[#635BFF] fill-current" viewBox="0 0 60 25">
                                        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32c-1.21.62-2.86.95-4.75.95-4.34 0-6.95-2.77-6.95-7.14 0-4.04 2.52-7.11 6.42-7.11 3.98 0 6.09 3.03 6.09 6.82v1.56zm-4.38-2.8c0-1.63-.9-2.45-2.14-2.45-1.29 0-2.19.86-2.34 2.45h4.48zM33.8 2.72v4.06c1.16-.76 2.47-1.04 3.79-1.04 2.96 0 5.48 2.22 5.48 6.95 0 4.67-2.52 7.21-5.61 7.21-1.39 0-2.61-.41-3.66-1.17v5.52h-4.48V6.02h4.15l.33.76zm.13 8.84c0 2.55 1.25 4.14 3.07 4.14 1.77 0 3.01-1.55 3.01-4.14 0-2.5-1.24-4.06-3.01-4.06-1.82 0-3.07 1.56-3.07 4.06zM24.79 6.02v13.88h-4.48V6.02h4.48zm-2.24-6.02c1.47 0 2.55 1.08 2.55 2.52 0 1.47-1.08 2.55-2.55 2.55-1.44 0-2.52-1.08-2.52-2.55 0-1.44 1.08-2.52 2.52-2.52zm-8.87 9.87c0-.98-.79-1.44-2.09-1.44-1.42 0-3.04.57-4.19 1.25V5.91c1.33-.57 2.99-.95 4.67-.95 4.07 0 6.06 2.06 6.06 5.43v9.51h-4.13l-.32-.87c-1.19.73-2.63 1.14-4.02 1.14-3.09 0-5.18-1.95-5.18-4.83 0-4.02 4.62-4.59 9.2-4.48zm0 2.55c-2.39-.14-4.73.27-4.73 2.15 0 1.11.82 1.79 2.04 1.79 1.44 0 2.69-.95 2.69-2.39v-1.55zM4.69 11.23c0-.9-.73-1.33-1.93-1.33-1.33 0-3.01.54-4.22 1.22V7.19C-.07 6.49 1.69 6.02 3.4 6.02c3.78 0 6.09 1.93 6.09 5.24 0 5.11-7.03 4.32-7.03 6.55 0 1.03.87 1.44 2.17 1.44 1.52 0 3.32-.6 4.62-1.33v3.94c-1.47.65-3.32.95-5.08.95C.3 22.81-2 20.88-2 17.54c0-5.27 7.03-4.32 7.03-6.31z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">Stripe</span>
                                </div>

                                {/* 5. GitHub */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0 text-slate-900 dark:text-white fill-current" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">GitHub</span>
                                </div>

                                {/* 6. Microsoft */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                                        <rect fill="#F25022" x="1" y="1" width="10" height="10"/>
                                        <rect fill="#7FBA00" x="13" y="1" width="10" height="10"/>
                                        <rect fill="#00A4EF" x="1" y="13" width="10" height="10"/>
                                        <rect fill="#FFB900" x="13" y="13" width="10" height="10"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">Microsoft</span>
                                </div>

                                {/* 7. Laravel */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0 text-[#FF2D20] fill-current" viewBox="0 0 24 24">
                                        <path d="M21.578 6.425a.86.86 0 0 0-.422-.162l-7.39-1.286a.859.859 0 0 0-.825.328L9.08 10.37a.86.86 0 0 0 .167 1.208l1.378.966-5.845 7.027a.86.86 0 0 0-.166.426.863.863 0 0 0 .863.863h13.91a.863.863 0 0 0 .862-.863V7.288a.86.86 0 0 0-.271-.613v-.25zM10.74 11.23l2.87-3.483 5.488.955-4.103 4.97-4.255-2.442zm-4.32 7.085 4.945-5.945 3.58 2.055v3.89H6.42zm11.332 0v-4.88l1.725-.997v5.877h-1.725z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">Laravel</span>
                                </div>

                                {/* 8. AWS */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0 text-[#FF9900] fill-current" viewBox="0 0 24 24">
                                        <path d="M12.44 16.59c-3.14 0-5.74-1.38-7.23-3.48-.19-.27-.12-.64.15-.83.27-.19.64-.12.83.15 1.28 1.8 3.52 2.99 6.25 2.99 2.73 0 4.97-1.19 6.25-2.99.19-.27.56-.34.83-.15.27.19.34.56.15.83-1.49 2.1-4.09 3.48-7.23 3.48zM19.5 13.5c-.3 0-.55-.2-.65-.48-.52-1.48-1.89-2.52-3.52-2.52-2.03 0-3.67 1.64-3.67 3.67s1.64 3.67 3.67 3.67c1.63 0 3-1.04 3.52-2.52.1-.28.35-.48.65-.48.41 0 .75.34.75.75 0 .15-.05.29-.12.41-.75 2.05-2.65 3.51-4.8 3.51-2.85 0-5.17-2.32-5.17-5.17s2.32-5.17 5.17-5.17c2.15 0 4.05 1.46 4.8 3.51.07.12.12.26.12.41 0 .41-.34.75-.75.75z"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">AWS</span>
                                </div>

                                {/* 9. React */}
                                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/60 transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs">
                                    <svg className="size-5 shrink-0 text-[#61DAFB] fill-current" viewBox="0 0 24 24">
                                        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(30 12 12)"/>
                                        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(90 12 12)"/>
                                        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(150 12 12)"/>
                                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                                    </svg>
                                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">React</span>
                                </div>

                            </InfiniteSlider>

                            {/* Left & Right Gradient Fades */}
                            <div className="bg-gradient-to-r from-background via-background/60 to-transparent absolute inset-y-0 left-0 w-24 pointer-events-none z-10"></div>
                            <div className="bg-gradient-to-l from-background via-background/60 to-transparent absolute inset-y-0 right-0 w-24 pointer-events-none z-10"></div>
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <img
            src={logo}
            alt="InfozaTech Logo"
            className={cn('h-10 w-auto object-contain brightness-0 invert', className)}
        />
    )
}
