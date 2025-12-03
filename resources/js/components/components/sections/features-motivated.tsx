import Image from "next/image";
import { Heart, Flame, Star } from "lucide-react";

const FeaturesMotivated = () => {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Flame className="w-4 h-4" />
              <span>Stay Consistent</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2.25rem] lg:text-[2.625rem] leading-[1.2] tracking-[-0.5px]">
              tetap termotivasi
            </h2>
            <p className="mt-6 text-lg text-[#777777] leading-[1.6] max-w-lg mx-auto lg:mx-0">
              Kami membuat mudah untuk membentuk kebiasaan kesehatan mental dengan fitur gamifikasi, tantangan yang menyenangkan, dan reminder dari komunitas supportif kami. Raih streak harian dan jadilah versi terbaik dirimu! 🌟
            </p>

            {/* Motivation features */}
            <div className="grid grid-cols-2 gap-3 mt-8 max-w-lg mx-auto lg:mx-0">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white p-4 rounded-xl shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover-bob cursor-pointer">
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-bold text-sm">Daily Streaks</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover-bob cursor-pointer">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-sm">Achievements</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-4 rounded-xl shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover-bob cursor-pointer">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-sm">Progress Tracking</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover-bob cursor-pointer">
                <div className="text-3xl mb-2">💪</div>
                <div className="font-bold text-sm">Daily Goals</div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6">
                {/* Streak visualization */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">
                    <Flame className="w-6 h-6" fill="currentColor" />
                    <span>15 Day Streak!</span>
                  </div>
                </div>

                {/* Weekly activity */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{day}</div>
                      <div className={`w-full h-10 rounded-lg ${idx < 5 ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-200'} flex items-center justify-center`}>
                        {idx < 5 && <span className="text-xl">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Daily challenge */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    <span className="font-bold text-gray-800">Daily Challenge</span>
                  </div>
                  <div className="text-sm text-gray-600">5-minute meditation 🧘</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500"></div>
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

export default FeaturesMotivated;