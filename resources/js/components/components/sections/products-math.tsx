import { BookHeart, ArrowRight, Pen } from 'lucide-react';

const ProductsMath = () => {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative flex justify-center lg:justify-end lg:order-2">
            <div className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-3xl p-8 shadow-2xl max-w-md">
              <div className="bg-white rounded-2xl p-6">
                <div className="text-6xl mb-4 text-center">📝✨</div>
                <div className="font-bold text-gray-800 text-xl mb-3 text-center">Daily Journaling</div>
                <div className="text-gray-600 text-sm mb-6 text-center">
                  Express yourself dan track emosi dengan journaling
                </div>

                {/* Journal prompts */}
                <div className="space-y-3 mb-4">
                  {[
                    { emoji: '🌅', prompt: 'Morning Reflection' },
                    { emoji: '💭', prompt: 'Gratitude Journal' },
                    { emoji: '🎯', prompt: 'Goal Setting' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-xl flex items-center gap-3">
                      <div className="text-2xl">{item.emoji}</div>
                      <div className="text-sm font-semibold text-gray-700">{item.prompt}</div>
                    </div>
                  ))}
                </div>

                {/* Streak counter */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold mb-1">🔥 7 Days Streak!</div>
                  <div className="text-xs">Keep journaling every day</div>
                </div>
              </div>

              {/* Floating pen badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-xl shadow-xl animate-float">
                <Pen className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <BookHeart className="w-4 h-4" />
              <span>Self Expression</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2rem] lg:text-[2.5rem] leading-[1.2] tracking-[-0.5px] mb-6">
              mindquest journal
            </h2>
            
            <p className="text-lg text-[#777777] leading-[1.6] mb-8 max-w-lg mx-auto lg:mx-0">
              Tulis perjalanan mentalmu dengan journaling yang dipandu. Track mood, ekspresikan perasaan, dan refleksikan pengalaman. Journaling terbukti meningkatkan kesehatan mental! 📝💖
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                '✓ Guided Prompts',
                '✓ Mood Tracking',
                '✓ Private & Secure',
                '✓ Daily Reminders',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="text-orange-500 text-xl">{feature.split(' ')[0]}</div>
                  <span className="font-semibold">{feature.substring(2)}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#1cb0f6] bg-white px-8 py-4 font-bold uppercase text-[#1cb0f6] transition hover:bg-[#1cb0f6] hover:text-white shadow-md hover:shadow-lg"
            >
              Mulai Journaling
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsMath;
