'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-emerald-100 z-50">
            <div className="px-12 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Gavin Lin
                </Link>
                <div className="flex gap-8">
                    <Link
                        href="/"
                        className={`transition-colors font-medium ${isActive('/')
                            ? 'text-emerald-600 font-semibold'
                            : 'text-slate-600 hover:text-emerald-600'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/experience"
                        className={`transition-colors font-medium ${isActive('/experience')
                            ? 'text-emerald-600 font-semibold'
                            : 'text-slate-600 hover:text-emerald-600'
                            }`}
                    >
                        Experience
                    </Link>
                    <Link
                        href="/project"
                        className={`transition-colors font-medium ${isActive('/project')
                            ? 'text-emerald-600 font-semibold'
                            : 'text-slate-600 hover:text-emerald-600'
                            }`}
                    >
                        Projects
                    </Link>
                </div>
            </div>
        </nav>
    );
}