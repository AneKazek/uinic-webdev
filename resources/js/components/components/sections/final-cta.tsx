import React from 'react';
import { Rocket, Sparkles, Star, Heart, Trophy, Brain, Zap } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

const FinalCta = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-purple-50 to-[#58cc02]/20 py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-pink-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            <Brain className="w-5 h-5" />
            <span>Siap untuk Perjalanan Mental Wellness?</span>
          </div>

          {/* Main heading with gradient */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Mulai Perjalanan{' '}
              <span className="text-gradient-adventure">Kesehatan Mental</span>{' '}
              Bersama MindQuest
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Raih ketenangan pikiran, tingkatkan well-being, dan jadilah versi terbaik dirimu. Perjalanan menuju mental wellness dimulai hari ini! 🧠✨
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Brain, label: 'Science-Based', color: 'from-purple-500 to-purple-600' },
              { icon: Heart, label: '5M+ Users', color: 'from-pink-500 to-rose-500' },
              { icon: Trophy, label: 'Award Winning', color: 'from-cyan-500 to-blue-500' },
              { icon: Star, label: '100% Gratis', color: 'from-amber-500 to-yellow-500' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all cursor-pointer`}
              >
                <item.icon className="w-8 h-8 mx-auto mb-3" fill="currentColor" />
                <div className="font-bold text-sm">{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href={dashboard()} className="group hover-bob relative inline-flex items-center gap-3 bg-[#58cc02] hover:bg-[#46a302] text-white px-12 py-5 rounded-2xl font-bold text-xl uppercase shadow-2xl transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-1 border-b-4 border-[#46a302] hover:border-b-2 active:translate-y-1 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                <Brain className="w-6 h-6" />
                Mulai Sekarang Gratis
                <Rocket className="w-6 h-6" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">5M+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="font-semibold">20+ Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="font-semibold">100% Free to Start</span>
            </div>
          </div>

          {/* Floating decorative icons */}
          <div className="relative h-40 mt-12">
            {/* Heart */}
            <div className="absolute left-1/4 top-0 transform -translate-x-1/2 animate-float">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl shadow-xl flex items-center justify-center text-3xl rotate-12">
                💖
              </div>
            </div>
            
            {/* Brain icon */}
            <div className="absolute right-1/4 top-4 transform translate-x-1/2 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Star badge */}
            <div className="absolute left-1/2 top-10 transform -translate-x-1/2 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full shadow-xl flex items-center justify-center">
                <Star className="w-7 h-7 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Meditation emoji */}
            <div className="absolute right-1/3 bottom-0 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-xl flex items-center justify-center rotate-12 text-3xl">
                🧘
              </div>
            </div>

            {/* Sparkles */}
            <div className="absolute left-1/3 bottom-4 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl flex items-center justify-center -rotate-12">
                <Sparkles className="w-7 h-7 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#58cc02]/30"></div>
    </section>
  );
};

export default FinalCta;