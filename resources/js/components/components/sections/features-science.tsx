import Image from "next/image";
import { Microscope, BookOpen, Brain } from "lucide-react";

const FeaturesScience = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Microscope className="w-4 h-4" />
              <span>Berbasis Riset</span>
            </div>

            <h2 className="font-extrabold text-[#58cc02] text-[2.25rem] lg:text-[2.625rem] leading-[1.2] tracking-[-0.5px]">
              didukung oleh sains
            </h2>
            <p className="mt-6 text-lg text-[#777777] leading-[1.6] max-w-lg mx-auto lg:mx-0">
              Kami menggunakan kombinasi metode terapi yang terbukti secara ilmiah dan konten yang menyenangkan untuk menciptakan program yang efektif meningkatkan kesehatan mental, mindfulness, dan kesejahteraan emosional!
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white rounded-xl p-4 shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                <div className="text-2xl font-bold text-purple-600">90%</div>
                <div className="text-xs text-gray-600">Mengurangi Stress</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                <div className="text-2xl font-bold text-cyan-600">85%</div>
                <div className="text-xs text-gray-600">Tidur Lebih Baik</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                <div className="text-2xl font-bold text-emerald-600">95%</div>
                <div className="text-xs text-gray-600">Mood Membaik</div>
              </div>
            </div>
          </div>
          <div className="lg:order-1">
            <div className="relative bg-gradient-to-br from-purple-100 via-cyan-50 to-blue-100 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="text-6xl mb-4">🧠📚</div>
                <div className="font-bold text-gray-800 text-xl mb-2">Metode Terbukti</div>
                <div className="text-gray-600 text-sm">CBT, Mindfulness & Positive Psychology</div>
                
                <div className="mt-6 space-y-3">
                  {['Cognitive Therapy', 'Mindfulness Practice', 'Emotional Regulation'].map((method, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-cyan-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesScience;