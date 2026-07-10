'use client'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'
import logo from '../../assets/images/logo/infozatech-logo.png'

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-medium tracking-tight text-white">Build 10x Faster with InfozaTech</h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg font-normal text-white/80">We design and build powerful websites, applications, and custom software solutions that help your business scale and grow faster.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base bg-white text-black hover:bg-white/90">
                                        <Link to="/contact">
                                            <span className="text-nowrap">Get Started</span>
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
                <section className="bg-background pb-2">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm">Powering the best teams</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/nvidia/000000"
                                            alt="Nvidia"
                                            height="20"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">NVIDIA</span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-4.5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/stripe/000000"
                                            alt="Stripe"
                                            height="18"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Stripe</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-4.5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/github/000000"
                                            alt="GitHub"
                                            height="18"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">GitHub</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-4.5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/nike/000000"
                                            alt="Nike"
                                            height="18"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Nike</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-4.5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/lemonsqueezy/000000"
                                            alt="Lemon Squeezy"
                                            height="18"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Lemon Squeezy</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-4.5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/laravel/000000"
                                            alt="Laravel"
                                            height="18"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Laravel</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/google/000000"
                                            alt="Google"
                                            height="20"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Google</span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <img
                                            className="h-5 w-fit dark:invert opacity-75"
                                            src="https://cdn.simpleicons.org/openai/000000"
                                            alt="OpenAI"
                                            height="20"
                                            width="auto"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">OpenAI</span>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-gradient-to-r from-background to-transparent absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-gradient-to-l from-background to-transparent absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Careers', href: '/careers' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            const isDesktop = window.innerWidth >= 1024
            setScrolled(isDesktop && window.scrollY > 600)
        }
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        handleScroll()
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    if (scrolled) return null;

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-20 w-full pt-2">
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-background/50 backdrop-blur-2xl')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-white text-black hover:bg-white/90 rounded-full px-5 h-9 text-sm font-semibold">
                                    <a href="tel:+919155596712">
                                        <span>Book a Call</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
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
