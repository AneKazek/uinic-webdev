import React from 'react';
import { Heart, TrendingUp, Award, Brain } from 'lucide-react';

const FeaturesEffective = () => {
  return (
    <section className="relative bg-white py-8 md:py-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-cyan-200 rounded-full opacity-20 blur-2xl"></div>

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Text content with mental health elements */}
          <div className="space-y-6">
            {/* Badge indicator */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">
              <Award className="w-4 h-4" />
              <span>Terbukti Efektif</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="text-[#58cc02]">gratis. seru. efektif.</span>
            </h2>

            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                Merawat kesehatan mental dengan <strong className="text-purple-600">MindQuest</strong> itu seru banget, dan penelitian menunjukkan{' '}
                <a href="#" className="text-cyan-600 hover:text-cyan-700 font-semibold underline">
                  ini benar-benar berhasil
                </a>
                !
              </p>
              <p>
                Dengan latihan singkat yang fun, kamu akan dapat poin wellness dan unlock level baru sambil meningkatkan kesehatan mental dan ketenangan pikiran.
              </p>
            </div>

            {/* Stats cards - gamified */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-2xl shadow-lg transform transition-all duration-200 ease-out hover:scale-[1.02] hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-semibold opacity-90">Efektivitas</span>
                </div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-xs opacity-80">Tingkat Kepuasan</div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-5 rounded-2xl shadow-lg transform transition-all duration-200 ease-out hover:scale-[1.02] hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span className="text-sm font-semibold opacity-90">Well-being</span>
                </div>
                <div className="text-3xl font-bold">8x</div>
                <div className="text-xs opacity-80">Lebih Bahagia</div>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration with wellness elements */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-md">
              {/* Main illustration placeholder with wellness overlay */}
              <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 rounded-3xl p-8 shadow-2xl border-4 border-white">
                <div className="bg-white rounded-2xl p-6 shadow-inner">
                  {/* Wellness progress mockup */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                      <Brain className="w-6 h-6" />
                      <span>Progress Mental</span>
                    </div>
                  </div>
                  
                  {/* Wellness metrics */}
                  <div className="space-y-3">
                    {[
                      { metric: 'Mood Score 🎉', score: 95, color: 'from-yellow-400 to-amber-500' },
                      { metric: 'Mindfulness', score: 85, color: 'from-purple-400 to-purple-500' },
                      { metric: 'Sleep Quality', score: 90, color: 'from-blue-400 to-blue-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">{item.metric}</span>
                          <span className="text-sm font-bold text-gray-900">{item.score}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white p-3 rounded-2xl shadow-xl animate-float z-10">
                <Heart className="w-8 h-8" fill="currentColor" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-xl animate-float z-10" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <div className="font-bold text-sm">Hebat!</div>
                    <div className="text-xs opacity-90">+50 Poin</div>
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

export default FeaturesEffective;
