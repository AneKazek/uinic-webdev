import React from 'react';
import { Brain, Heart, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const aboutLinks = [
    'Tentang Kami',
    'Misi Kami',
    'Pendekatan',
    'Riset & Penelitian',
    'Tim Ahli',
    'Karir',
    'Brand Guidelines',
    'Blog',
    'Kontak Kami',
  ];

  const productLinks = [
    { name: 'MindQuest App', href: '#' },
    { name: 'MindQuest Therapy', href: '#' },
    { name: 'MindQuest Community', href: '#' },
    { name: 'MindQuest Journal', href: '#' },
    { name: 'MindQuest Pro', href: '#' },
  ];

  const resourceLinks = [
    'Android App',
    'iOS App',
    'Web App',
    'Mental Health Resources',
    'Self-Help Guides',
  ];

  const supportLinks = [
    'FAQ',
    'Customer Support',
    'Crisis Helplines',
    'Therapist Directory',
    'Status',
  ];

  const legalLinks = [
    'Community Guidelines',
    'Terms of Service',
    'Privacy Policy',
    'Cookie Policy',
  ];

  return (
    <footer className="bg-[#58cc02] text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Top section with logo and tagline */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12" />
            <h3 className="text-3xl font-extrabold">MindQuest</h3>
          </div>
          <p className="text-lg opacity-90">
            Platform kesehatan mental #1 di Indonesia 🧠✨
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Tentang</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Program</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Platform</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Bantuan</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        {/* Bottom section */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-white/80 mb-4">
            © 2025 MindQuest. Semua hak dilindungi undang-undang.
          </p>
          <p className="text-xs text-white/60">
            💚 Dibuat dengan cinta untuk kesehatan mental yang lebih baik
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/70">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span>Mental health matters. You are not alone.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
