import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Sparkles, Trophy, Heart } from 'lucide-react';

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-2 border-purple-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" aria-label="Homepage" className="flex items-center gap-3 group">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/de7b5419-dde1-4cb1-a038-6340aedeafa6-duolingo-com/assets/svgs/f92d5f2f7d56636846861c458c0d0b6c-1.svg"
              alt="MindQuest"
              width={149}
              height={39}
              className="h-auto w-[140px] transition-transform group-hover:scale-105"
              priority
            />
            {/* Fun badge next to logo - Codedex style */}
            <div className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Mental Wellness</span>
            </div>
          </Link>
          
          {/* Center navigation items - Codedex inspired */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="#" className="text-gray-700 hover:text-purple-600 font-semibold transition-colors">
              Program
            </Link>
            <Link href="#" className="text-gray-700 hover:text-cyan-600 font-semibold transition-colors">
              Latihan
            </Link>
            <Link href="#" className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors">
              Komunitas
            </Link>
          </div>

          {/* Right side with wellness points and level - gamification */}
          <div className="flex items-center gap-3">
            {/* Wellness Points Counter - Codedex style */}
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-3 py-1.5 rounded-xl shadow-md">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="font-bold text-sm">250 Poin</span>
            </div>

            {/* Level Badge */}
            <div className="hidden md:flex items-center gap-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-3 py-1.5 rounded-xl shadow-md">
              <Trophy className="w-4 h-4" fill="currentColor" />
              <span className="font-bold text-sm">Level 5</span>
            </div>
            
            {/* Language selector with adventure styling */}
            <button className="flex items-center gap-x-2 rounded-xl bg-white border-2 border-purple-200 px-4 py-2 text-[14px] font-bold text-gray-700 transition-all hover:border-purple-300 hover:shadow-md hover:scale-105">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/de7b5419-dde1-4cb1-a038-6340aedeafa6-duolingo-com/assets/svgs/c6eae48dd48246c89e415b89f9e55282-2.svg"
                alt=""
                width={18}
                height={18}
              />
              <span className="hidden sm:inline">ID</span>
              <ChevronDown className="h-4 w-4 text-current" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;