import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white relative overflow-hidden bg-mesh">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

            <div className="z-10 max-w-5xl w-full items-center justify-center font-sans text-sm flex flex-col space-y-12">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in tracking-tight">
                        TaskFlow Pro
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </div>

                <p className="text-2xl text-gray-400 text-center max-w-2xl leading-relaxed font-light">
                    A premium, secure, and production-ready task management application built with <span className="text-white font-medium">Next.js</span> and <span className="text-white font-medium">MongoDB</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <Link
                        href="/login"
                        className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-lg"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/register"
                        className="px-10 py-4 border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm text-lg"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </main>
    );
}
