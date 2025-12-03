import Image from "next/image";
import { Sparkles, User, Target } from "lucide-react";

const FeaturesPersonalized = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-cyan-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="lg:order-2 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <User className="w-4 h-4" />
              <span>Personalized for You</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2.25rem] lg:text-[2.625rem] leading-[1.2] tracking-[-0.5px]">
              pembelajaran personal
            </h2>
            <p className="mt-6 text-lg text-[#777777] leading-[1.6] max-w-lg mx-auto lg:mx-0">
              Menggabungkan AI terbaik dan ilmu psikologi, program kami disesuaikan untuk membantumu berkembang pada tingkat dan kecepatan yang tepat. Setiap perjalanan kesehatan mental adalah unik! 🎯✨
            </p>

            {/* Personalization features */}
            <div className="space-y-4 mt-8 max-w-lg mx-auto lg:mx-0">
              {[
                { icon: '🎯', title: 'Goal Setting', desc: 'Set dan track tujuan personalmu' },
                { icon: '📈', title: 'Adaptive Content', desc: 'Konten yang menyesuaikan progressmu' },
                { icon: '🤖', title: 'AI Companion', desc: 'Assistant AI yang memahami kebutuhanmu' },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <div className="font-bold text-gray-800">{feature.title}</div>
                    <div className="text-sm text-gray-600">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:order-1">
            <div className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6">
                {/* Personal profile mockup */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <div className="font-bold text-gray-800 text-lg">Your Wellness Profile</div>
                </div>

                {/* Personal metrics */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Focus Area</span>
                      <span className="text-xs text-purple-600 font-bold">Stress Management</span>
                    </div>
                    <div className="flex gap-2">
                      {['😌', '🧘', '💆'].map((emoji, idx) => (
                        <div key={idx} className="flex-1 bg-white rounded-lg p-2 text-center text-xl">
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Preferred Time</span>
                      <span className="text-xs text-cyan-600 font-bold">Morning 🌅</span>
                    </div>
                    <div className="text-xs text-gray-600">Best time for your practice</div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Difficulty Level</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <div key={level} className={`w-6 h-6 rounded ${level <= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPersonalized;