import React from 'react';
import { Smartphone, Download, Zap, Heart, Brain } from 'lucide-react';

const LearningAnywhere = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-cyan-50 to-purple-50 py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg mb-8">
            <Smartphone className="w-5 h-5" />
            <span>Available Everywhere</span>
          </div>

          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Jaga Kesehatan Mental{' '}
            <span className="text-gradient-adventure">Kapan Saja, Di Mana Saja</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Akses program mental wellness favorit kamu di smartphone, tablet, atau komputer. Meditasi pagi, journaling siang, atau relaxation malam - semua dalam genggaman! 📱✨
          </p>

          {/* Start Session button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#" 
              className="group relative flex items-center justify-center gap-3 bg-[#58cc02] hover:bg-[#46a302] text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg border-b-4 border-[#46a302] active:translate-y-0.5 active:border-b-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Mulai Sesi
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </a>
          </div>

          {/* Feature highlights with floating devices */}
          <div className="relative py-12">
            {/* Center device mockup */}
            <div className="relative max-w-xs mx-auto">
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 rounded-[2.5rem] p-1 shadow-2xl transform hover:scale-105 transition-transform">
                <div className="bg-white rounded-[2.3rem] p-6">
                  <div className="text-center space-y-4">
                    <div className="text-5xl">🧘‍♀️</div>
                    <div className="font-bold text-gray-800 text-lg">MindQuest App</div>
                    <div className="space-y-2">
                      {['Daily Meditation', 'Mood Tracker', 'Sleep Stories'].map((feature, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-purple-50 to-cyan-50 p-3 rounded-xl text-sm font-semibold text-gray-700">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around device */}
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 animate-float">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-4 rounded-2xl shadow-xl">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
            </div>

            <div className="absolute top-10 right-1/4 transform translate-x-1/2 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-xl">
                <Zap className="w-8 h-8 text-white" fill="currentColor" />
              </div>
            </div>

            <div className="absolute bottom-0 left-1/3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 px-6 py-3 rounded-xl shadow-xl text-white font-bold">
                <div className="text-2xl">⭐ 4.9</div>
                <div className="text-xs">User Rating</div>
              </div>
            </div>

            <div className="absolute bottom-10 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 px-5 py-3 rounded-xl shadow-xl text-white font-bold text-center">
                <div className="text-xl">5M+</div>
                <div className="text-xs">Downloads</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { icon: '📱', label: 'Cross-Platform', value: 'iOS & Android', color: 'from-violet-400 to-purple-500' },
              { icon: '💾', label: 'Offline Mode', value: 'Available', color: 'from-teal-400 to-cyan-600' },
              { icon: '🔔', label: 'Smart Reminders', value: 'Enabled', color: 'from-pink-500 to-rose-600' },
              { icon: '🌙', label: 'Night Mode', value: 'Supported', color: 'from-indigo-500 to-blue-600' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-purple-300 cursor-pointer"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="font-bold text-gray-800 text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningAnywhere;