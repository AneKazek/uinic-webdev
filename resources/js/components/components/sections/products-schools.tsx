import { Users, ArrowRight, HeartHandshake, MessageCircle, Sparkles, Zap } from 'lucide-react';

const ProductsSchools = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 rounded-3xl p-8 shadow-2xl max-w-md">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-6xl mb-4">🤖💬</div>
                <div className="font-bold text-gray-800 text-xl mb-3">AI Chatbot Assistant</div>
                <div className="text-gray-600 text-sm mb-6">
                  Berbicara dengan AI yang memahami dan siap membantu kapan saja
                </div>

                {/* Chatbot stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">100K+</div>
                    <div className="text-xs">Conversations</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">&lt;1s</div>
                    <div className="text-xs">Response Time</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Fitur Chatbot:
                  </div>
                  <div className="space-y-2">
                    {['Emotional Support', 'Mental Health Tips', '24/7 Availability'].map((feature) => (
                      <div key={feature} className="bg-white px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 flex items-center gap-2">
                        <span className="text-green-500">●</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl shadow-xl animate-float">
                <div className="text-lg font-bold">AI</div>
                <div className="text-xs font-bold">Powered</div>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <MessageCircle className="w-4 h-4" />
              <span>Always Available</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2rem] lg:text-[2.5rem] leading-[1.2] tracking-[-0.5px] mb-6">
              chatbot ai kami
            </h2>
            
            <p className="text-lg text-[#777777] leading-[1.6] mb-8 max-w-lg mx-auto lg:mx-0">
              Berbicara dengan AI chatbot yang empatik dan memahami! Dapatkan dukungan instan, tips kesehatan mental, dan panduan personal 24/7. Selalu siap mendengarkan kapanpun kamu butuhkan. 🤖✨
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                '✓ 24/7 Instant Response',
                '✓ Empathetic AI Conversations',
                '✓ Personalized Mental Health Tips',
                '✓ Private & Confidential',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="text-purple-500 text-xl">{feature.split(' ')[0]}</div>
                  <span className="font-semibold">{feature.substring(2)}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#1cb0f6] bg-white px-8 py-4 font-bold uppercase text-[#1cb0f6] transition hover:bg-[#1cb0f6] hover:text-white shadow-md hover:shadow-lg"
            >
              Mulai Chat
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSchools;