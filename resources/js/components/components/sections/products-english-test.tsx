import { Brain, ArrowRight, Shield } from 'lucide-react';

const ProductsEnglishTest = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Shield className="w-4 h-4" />
              <span>Professional Care</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2rem] lg:text-[2.5rem] leading-[1.2] tracking-[-0.5px] mb-6">
              mindquest therapy
            </h2>
            
            <p className="text-lg text-[#777777] leading-[1.6] mb-8 max-w-lg mx-auto lg:mx-0">
              Konseling profesional dengan terapis berlisensi yang siap membantu perjalanan kesehatan mentalmu. Nyaman, rahasia, dan terpercaya - dapatkan dukungan yang kamu butuhkan. 🎯💙
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                '✓ Terapis Berlisensi',
                '✓ Sesi Online & Offline',
                '✓ 100% Rahasia',
                '✓ Flexible Scheduling',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="text-green-500 text-xl">{feature.split(' ')[0]}</div>
                  <span className="font-semibold">{feature.substring(2)}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#1cb0f6] bg-white px-8 py-4 font-bold uppercase text-[#1cb0f6] transition hover:bg-[#1cb0f6] hover:text-white shadow-md hover:shadow-lg"
            >
              Book Sesi Konseling
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 rounded-3xl p-8 shadow-2xl max-w-md">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-6xl mb-4">🧑‍⚕️💬</div>
                <div className="font-bold text-gray-800 text-xl mb-3">Professional Support</div>
                <div className="text-gray-600 text-sm mb-6">
                  Konseling dengan ahli kesehatan mental profesional
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">⭐</span>
                    ))}
                  </div>
                  <span className="font-bold text-gray-800">4.9/5</span>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-700 font-semibold mb-2">
                    Specialties:
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Anxiety', 'Depression', 'Stress', 'Trauma'].map((spec) => (
                      <span key={spec} className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-xl animate-float">
                <div className="text-xs font-bold">Certified</div>
                <div className="text-lg font-bold">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsEnglishTest;