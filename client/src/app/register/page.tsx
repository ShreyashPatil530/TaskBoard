'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API_BASE_URL from '@/lib/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/login');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4 bg-mesh relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_50%)]" />

            <div className="w-full max-w-md space-y-8 rounded-[2.5rem] bg-white/[0.03] p-10 backdrop-blur-2xl border border-white/10 shadow-2xl relative z-10 animate-fade-in">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">Join TaskFlow</h2>
                    <p className="text-gray-400 font-medium">Start your productivity journey today</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-red-400 text-xs font-bold text-center bg-red-500/10 py-3 rounded-2xl border border-red-500/20 uppercase tracking-widest">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Create a strong password"
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl bg-blue-600 py-4 text-white font-black hover:bg-blue-500 transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Creating account...</span>
                            </div>
                        ) : 'Create Account'}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-sm text-gray-500 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
