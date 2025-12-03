import React from 'react';
import { Brain, ArrowRight, Heart, Sparkles, Smile, Wind, Moon, Sun } from 'lucide-react';

const mentalHealthPrograms = [
  { name: 'Meditasi', icon: '🧘', users: '2M', color: 'from-purple-400 to-indigo-500' },
  { name: 'Stress Relief', icon: '😌', users: '1.8M', color: 'from-cyan-400 to-blue-500' },
  { name: 'Anxiety Care', icon: '💚', users: '1.6M', color: 'from-emerald-400 to-green-500' },
  { name: 'Self Care', icon: '✨', users: '1.4M', color: 'from-amber-400 to-yellow-500' },
  { name: 'Mood Tracker', icon: '📊', users: '1.3M', color: 'from-violet-400 to-purple-500' },
  { name: 'Journaling', icon: '📝', users: '950K', color: 'from-teal-400 to-cyan-600' },
];

const LanguageCarousel = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-cyan-50 py-12 md:py-16 overflow-hidden border-y-2 border-purple-100">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        {/* Section header with adventure theme */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Pilih <span className="text-gradient-adventure">Program Mental Health</span> Anda
            </h2>
          </div>
          <p className="text-gray-600">Eksplorasi berbagai program untuk meningkatkan kesehatan mental dan kesejahteraan!</p>
        </div>

        {/* Program cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {mentalHealthPrograms.map((program, index) => (
            <button
              key={program.name}
              className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-purple-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="text-4xl md:text-5xl mb-1 transform group-hover:scale-110 transition-transform">
                  {program.icon}
                </div>
                <div className="font-bold text-gray-800 text-sm md:text-base">
                  {program.name}
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  {program.users} pengguna
                </div>
                
                {/* Arrow appears on hover */}
                <div className="absolute -right-2 -top-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageCarousel;