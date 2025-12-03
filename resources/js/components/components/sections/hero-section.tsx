import { ParallaxLayer } from '@/components/ui/parallax';
import { Brain, Heart, Sparkles, Star } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

const HeroSection = () => {
    const { auth } = usePage<any>().props;
    return (
        <main className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-cyan-50 min-h-[calc(100vh-64px)] pt-8 md:pt-12">
            <ParallaxLayer speed={0.1} className="absolute top-20 left-10 animate-float">
                <div className="h-8 w-8 rotate-12 rounded-lg bg-yellow-400 opacity-60"></div>
            </ParallaxLayer>
            <ParallaxLayer speed={0.06} className="absolute top-40 right-20 animate-float" >
                <Star className="h-10 w-10 text-purple-400 opacity-50" fill="currentColor" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.14} className="absolute bottom-32 left-20 animate-float" >
                <Sparkles className="h-12 w-12 text-cyan-400 opacity-40" />
            </ParallaxLayer>
            <ParallaxLayer speed={0.08} className="absolute top-60 right-10 animate-float" >
                <div className="h-6 w-6 rounded-full bg-pink-400 opacity-50"></div>
            </ParallaxLayer>

            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-2 px-5 pb-4 md:pb-6 lg:grid-cols-2 lg:gap-x-16 lg:pb-7">
                {/* Left Column: Image with adventure badges */}
                <div className="relative flex sm:min-h-80 mt-28 justify-center lg:justify-start lg:ml-32 lg:mt-32">
                    <div className="relative md:mt-20">
                        <div className="absolute -top-10 left-0 right-0 h-16 bg-white/70 rounded-b-[2rem]" />
                        <ParallaxLayer speed={0.22}>
                            <div className="flex justify-center absolute -top-10 left-1/2 -translate-x-1/2 md:-left-10 md:translate-x-0 z-10 rounded-3xl border-2 border-purple-100 bg-white/70 shadow-xl backdrop-blur-sm px-4 py-5">
                                <div className="absolute -top-5 -right-3 h-6 w-6 rounded-full bg-pink-300/60" />
                                <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-lg bg-cyan-300/60 rotate-12" />
                                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/60" />
                            </div>
                        </ParallaxLayer>
                        <ParallaxLayer speed={0.18}>
                            <script
                                type="module"
                                src="https://unpkg.com/@splinetool/viewer@1.10.99/build/spline-viewer.js"
                            ></script>
                            {/* @ts-expect-error spline-viewer is a custom element */}
                            <spline-viewer url="https://prod.spline.design/2pXoBvPOhLXPorS1/scene.splinecode"></spline-viewer>
                        </ParallaxLayer>

                        
                        
                        <ParallaxLayer speed={0.26}>
                            <div className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 md:left-2 md:translate-x-0 z-10">
                                <div className="relative mx-auto max-w-[340px] sm:max-w-[380px] rounded-3xl bg-gradient-to-br from-rose-100 via-purple-100 to-cyan-100 p-1 shadow-2xl">
                                    <div className="rounded-[22px] bg-white p-5">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 text-sm font-bold shadow">
                                                <span className="inline-flex items-center gap-2"><Brain className="h-4 w-4" />Goal Harian</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-3 text-sm">
                                            <div>
                                                <div className="flex items-center justify-between"><span className="text-gray-700">XP Hari Ini</span><span className="font-bold text-gray-900">30 XP</span></div>
                                                <div className="mt-1 h-2 w-48 sm:w-64 max-w-full rounded-full bg-gray-200"><div className="h-2 w-[30%] rounded-full bg-gradient-to-r from-emerald-400 to-green-600"></div></div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between"><span className="text-gray-700">Misi Aktif</span><span className="font-bold text-gray-900">2/3</span></div>
                                                <div className="mt-1 h-2 w-48 sm:w-64 max-w-full rounded-full bg-gray-200"><div className="h-2 w-[66%] rounded-full bg-gradient-to-r from-amber-400 to-orange-600"></div></div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between"><span className="text-gray-700">Jurnal</span><span className="font-bold text-gray-900">1x</span></div>
                                                <div className="mt-1 h-2 w-48 sm:w-64 max-w-full rounded-full bg-gray-200"><div className="h-2 w-[100%] rounded-full bg-gradient-to-r from-sky-400 to-blue-600"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" md:block animate-float absolute -top-8 left-1/2 -translate-x-1/2 md:-left-10 md:translate-x-0 -rotate-6 z-30 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 px-3 py-2 text-white shadow-lg" style={{ animationDelay: '0.4s' }}>
                                        <div className="flex items-center gap-1">
                                            <Brain className="h-4 w-4" />
                                            <span className="text-sm font-bold">Mental Warrior</span>
                                        </div>
                                    </div>
                                    <div className=" md:block animate-float absolute -bottom-14 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 rotate-12 z-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 px-4 py-2 text-white shadow-lg" style={{ animationDelay: '1s' }}>
                                        <div className="flex items-center gap-1.5">
                                            <Heart className="h-5 w-5" fill="currentColor" />
                                            <span className="text-lg font-bold">+10 Poin</span>
                                        </div>
                                    </div>
                                    <div className="absolute -top-3 -right-3 flex items-center justify-center h-9 w-9 rounded-full bg-pink-400 text-white shadow"><Heart className="h-5 w-5" fill="currentColor" /></div>
                                </div>
                            </div>
                        </ParallaxLayer>
                    </div>
                </div>

                {/* Right Column: Text & Buttons with adventure theme */}
                <div className="flex flex-col items-center gap-5 text-center mt-40 sm:mt-48 md:mt-0 lg:items-start lg:text-left">
                    {/* Adventure subtitle with stars */}
                    <div className="flex items-center gap-2 hidden sm:flex text-sm font-bold tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        <Star className="h-4 w-4 text-indigo-500" fill="currentColor" />
                        <span>Mulai Perjalanan Kesehatan Mental Bersama MindQuest</span>
                        <Star className="h-4 w-4 text-purple-600" fill="currentColor" />
                    </div>

                    <h1 className="text-3xl leading-[1.1] font-bold text-[#131f40] md:text-[38px] lg:text-[44px]">
                        Cara{' '}
                        <span className="text-gradient-adventure">
                            Seru & Gratis
                        </span>{' '}
                        untuk Merawat Kesehatan Mentalmu!
                    </h1>

                    <p className="max-w-xl text-base text-gray-600 md:text-lg hidden sm:flex">
                        Bergabunglah dalam petualangan epik kesehatan mental!
                        Kumpulkan poin wellness, raih achievement badges, dan
                        unlock level ketenangan baru setiap hari. 🧠✨
                    </p>

                    {/* Stats bar - Codedex inspired */}
                    <div className="flex gap-4 text-sm">
                        <div className="rounded-xl border-2 border-purple-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-bold text-purple-600">5M+</div>
                            <div className="text-xs text-gray-600">
                                Pengguna
                            </div>
                        </div>
                        <div className="rounded-xl border-2 border-cyan-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-bold text-cyan-600">20+</div>
                            <div className="text-xs text-gray-600">Program</div>
                        </div>
                        <div className="rounded-xl border-2 border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-bold text-emerald-600">
                                100%
                            </div>
                            <div className="text-xs text-gray-600">Gratis</div>
                        </div>
                    </div>

                    <div className="mt-2 flex w-full max-w-md flex-col items-stretch gap-3">
                        <Link
                            href={dashboard()}
                            className="group hover-bob relative block overflow-hidden rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] px-8 py-4 text-center font-bold text-white uppercase transition-all duration-200 ease-out hover:scale-[1.02] hover:brightness-105 hover:-translate-y-1 active:translate-y-0.5 active:border-b-2"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Brain className="h-5 w-5" />
                                Mulai Perjalanan
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                        </Link>
                        {!auth?.user && (
                            <Link
                                href={dashboard()}
                                className="hover-bob block rounded-2xl border-2 border-solid border-purple-300 bg-white px-8 py-4 text-center font-bold text-purple-600 uppercase shadow-sm transition-all duration-200 ease-out hover:border-purple-400 hover:bg-purple-50 hover:-translate-y-1 active:translate-y-px"
                            >
                                Saya Sudah Punya Akun
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HeroSection;
