import React from 'react';
import { Link } from '@inertiajs/react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="https://www.codedex.io/_next/image?url=%2Fimages%2Fmascot.png&w=64&q=75" alt="Logo" width={32} height={32} />
              <span className="font-semibold text-foreground">Codedex Mentoring</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Belajar coding dengan kurikulum interaktif dan proyek nyata.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Menu</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li><Link href="/courses" className="hover:text-primary">Courses</Link></li>
                <li><Link href="/projects" className="hover:text-primary">Projects</Link></li>
                <li><Link href="/club" className="hover:text-primary">Club</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-muted-foreground">© 2025 Codedex Mentoring Clone</p>
            <div className="mt-3 inline-flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="Twitter" className="hover:text-primary">Twitter</a>
              <a href="#" aria-label="YouTube" className="hover:text-primary">YouTube</a>
              <a href="#" aria-label="GitHub" className="hover:text-primary">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;