import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-emerald-100 z-50">
        <div className="px-12 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-emerald-600">
            Gavin Lin
          </div>
          <div className="flex gap-8">
            <button className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
              About
            </button>
            <button className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
              Projects
            </button>
            <button className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-60 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
          {/* Profile Picture */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-96 h-96 rounded-full overflow-hidden ring-4 ring-emerald-400 shadow-xl">
              <Image
                src="/headshot.jpg"
                alt="Profile picture"
                fill
                sizes="384px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <span className="text-emerald-600 text-lg font-semibold tracking-wider uppercase">
                Full-Stack Developer
              </span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight ${playfair.className}`}>
              Hi, I'm{" "}
              <span className="text-emerald-600">
                Gavin
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Currently a senior at UC San Diego studying Mathematics and Computer Science, passionate about creating software that connects people and enhances everyday life.
              I'm a fast learner and dedicated to delivering results on every team I join.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
