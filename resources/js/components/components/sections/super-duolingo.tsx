import React from 'react';
import { Crown, Zap, Star, Sparkles, CheckCircle2, Brain, Heart } from 'lucide-react';

const SuperDuolingoSection = () => {
  const features = [
    { icon: Heart, text: 'Unlimited Access', color: 'text-red-400' },
    { icon: Star, text: 'Premium Content', color: 'text-yellow-400' },
    { icon: Sparkles, text: 'Ad-Free Experience', color: 'text-purple-400' },
    { icon: CheckCircle2, text: '1-on-1 Counseling', color: 'text-cyan-400' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] py-20 md:py-28 overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column: Premium mockup */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Premium mockup with mental health focus */}
              <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 rounded-[3rem] p-8 shadow-2xl border-4 border-purple-500/30">
                <div className="bg-gradient-to-br from-purple-800 to-blue-900 rounded-[2rem] p-6 shadow-inner">
                  {/* Premium brain icon */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-xl animate-float">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  {/* Premium features */}
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="text-gradient-adventure text-2xl font-bold mb-2">
                        PREMIUM WELLNESS
                      </div>
                      <div className="text-white/80 text-sm">
                        Akses penuh untuk kesehatan mental terbaikmu!
                      </div>
                    </div>
                    
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        <span className="text-white font-semibold text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating sparkles */}
              <div className="absolute -top-6 -left-6 text-yellow-400 animate-float">
                <Sparkles className="w-10 h-10" fill="currentColor" />
              </div>
              <div className="absolute -bottom-6 -right-6 text-pink-400 animate-float" style={{ animationDelay: '1s' }}>
                <Star className="w-8 h-8" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Right Column: Premium CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              <Crown className="w-4 h-4" />
              <span>UPGRADE SEKARANG</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white/90">
                LEVEL UP DENGAN
              </h3>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-[#58cc02] via-[#1cd8d2] to-[#ce82ff] bg-clip-text text-transparent">
                  MINDQUEST PRO
                </span>
              </h2>

              <p className="text-white/80 text-lg max-w-lg">
                Dapatkan akses unlimited ke semua program premium, sesi konseling 1-on-1, konten eksklusif, dan fitur advanced untuk mempercepat perjalanan mental wellnessmu! 🧠✨
              </p>
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {[
                '♾️ Unlimited Programs',
                '🎧 Live Counseling',
                '📚 Premium Library',
                '⚡ Priority Support',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              <button className="group relative flex-1 bg-white hover:bg-gray-100 text-purple-900 px-8 py-4 rounded-2xl font-bold uppercase transition-all hover:scale-105 shadow-xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  Coba 1 Minggu Gratis
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-200/30 to-transparent"></div>
              </button>
              
              <button className="flex-1 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-bold uppercase transition-all hover:scale-105">
                Lihat Paket
              </button>
            </div>

            {/* Trust badge */}
            <p className="text-white/60 text-xs">
              ✨ Lebih dari 500K pengguna premium worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperDuolingoSection;