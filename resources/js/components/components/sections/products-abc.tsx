import { Moon, ArrowRight, Sparkles } from 'lucide-react';

const ProductsAbc = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Moon className="w-4 h-4" />
              <span>Better Sleep</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2rem] lg:text-[2.5rem] leading-[1.2] tracking-[-0.5px] mb-6">
              mindquest sleep
            </h2>
            
            <p className="text-lg text-[#777777] leading-[1.6] mb-8 max-w-lg mx-auto lg:mx-0">
              Tidur lebih nyenyak dengan sleep stories, guided meditations, dan soundscapes yang menenangkan. Tingkatkan kualitas tidur dan bangun dengan segar setiap hari! 🌙😴
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                '✓ Sleep Stories',
                '✓ Relaxing Soundscapes',
                '✓ Bedtime Meditations',
                '✓ Sleep Tracking',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="text-indigo-500 text-xl">{feature.split(' ')[0]}</div>
                  <span className="font-semibold">{feature.substring(2)}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#1cb0f6] bg-white px-8 py-4 font-bold uppercase text-[#1cb0f6] transition hover:bg-[#1cb0f6] hover:text-white shadow-md hover:shadow-lg"
            >
              Mulai Tidur Lebih Baik
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 rounded-3xl p-8 shadow-2xl max-w-md">
              <div className="bg-gradient-to-b from-indigo-900 to-purple-900 rounded-2xl p-6 text-center relative overflow-hidden">
                {/* Night sky stars */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="text-6xl mb-4">🌙✨</div>
                  <div className="font-bold text-white text-xl mb-3">Sleep Better Tonight</div>
                  <div className="text-white/80 text-sm mb-6">
                    Guided content untuk tidur yang lebih berkualitas
                  </div>

                  {/* Sleep programs */}
                  <div className="space-y-3">
                    {[
                      { icon: '📖', title: 'Sleep Stories', time: '20-30 min' },
                      { icon: '🎵', title: 'Soundscapes', time: '60+ min' },
                      { icon: '🧘', title: 'Meditations', time: '10-15 min' },
                    ].map((program, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3">
                        <div className="text-2xl">{program.icon}</div>
                        <div className="text-left flex-1">
                          <div className="text-white font-semibold text-sm">{program.title}</div>
                          <div className="text-white/60 text-xs">{program.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating moon badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-amber-500 text-white p-3 rounded-full shadow-xl animate-float">
                <Moon className="w-8 h-8" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsAbc;