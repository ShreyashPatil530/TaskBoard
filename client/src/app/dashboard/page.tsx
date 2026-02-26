'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, LogOut, Trash2, Edit3, CheckCircle, Clock, Loader2 } from 'lucide-react';
import API_BASE_URL from '@/lib/api';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                search,
                status: statusFilter,
                page: page.toString(),
                limit: '6'
            });
            const res = await fetch(`${API_BASE_URL}/tasks?${query.toString()}`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                setTasks(data.tasks);
                setTotalPages(data.pagination.pages);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, page]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleLogout = async () => {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        router.push('/login');
        router.refresh();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingTask ? `${API_BASE_URL}/tasks/${editingTask._id}` : `${API_BASE_URL}/tasks`;
        const method = editingTask ? 'PUT' : 'POST';

        setIsSubmitting(true);
        setErrorMsg('');
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (res.ok) {
                setShowModal(false);
                setEditingTask(null);
                setFormData({ title: '', description: '', status: 'pending' });
                fetchTasks();
            } else {
                const data = await res.json();
                setErrorMsg(data.error || 'Failed to save task');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Connection error. Please check if the server is running.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteTask = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        setFormData({ title: task.title, description: task.description, status: task.status });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 bg-mesh relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_50%)]" />

            {/* Header */}
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 relative z-10">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
                        TaskBoard
                    </h1>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1" />
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-medium"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </header>

            {/* Controls */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 relative z-10">
                <div className="relative md:col-span-2 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-all backdrop-blur-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="" className="bg-zinc-900">All Status</option>
                        <option value="pending" className="bg-zinc-900">Pending</option>
                        <option value="in-progress" className="bg-zinc-900">In Progress</option>
                        <option value="completed" className="bg-zinc-900">Completed</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                </div>
                <button
                    onClick={() => { setEditingTask(null); setFormData({ title: '', description: '', status: 'pending' }); setShowModal(true); }}
                    className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-4 font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                >
                    <Plus size={22} />
                    <span>New Task</span>
                </button>
            </div>

            {/* Task List */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {loading ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
                        <Loader2 className="animate-spin text-blue-500" size={64} />
                        <p className="text-gray-500 font-medium animate-pulse">Syncing your workspace...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                        <div className="bg-white/5 p-6 rounded-full mb-6">
                            <Plus size={48} className="text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No tasks found</h3>
                        <p className="text-gray-500 max-w-xs text-center mb-8">
                            Your list is currently empty. Start by creating a new task to organize your work.
                        </p>
                        <button
                            onClick={() => { setEditingTask(null); setFormData({ title: '', description: '', status: 'pending' }); setShowModal(true); }}
                            className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-semibold"
                        >
                            Create First Task
                        </button>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task._id} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-all group relative flex flex-col backdrop-blur-md hover:bg-white/[0.05] shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${task.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    task.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                    {task.status.replace('-', ' ')}
                                </span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                    <button onClick={() => openEditModal(task)} className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                                        <Edit3 size={18} />
                                    </button>
                                    <button onClick={() => deleteTask(task._id)} className="p-2.5 hover:bg-red-500/10 rounded-xl text-red-500/70 hover:text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{task.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 font-light">{task.description}</p>
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-auto pt-6 border-t border-white/5 font-medium">
                                <Clock size={14} className="opacity-50" />
                                <span>created {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="max-w-6xl mx-auto flex justify-center items-center gap-6 mt-16 relative z-10">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-20 hover:bg-white/10 transition-all group"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                        <span className="text-white font-bold">{page}</span>
                        <span className="text-gray-600">/</span>
                        <span className="text-gray-400">{totalPages}</span>
                    </div>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl disabled:opacity-20 hover:bg-white/10 transition-all group"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-blue-600/20 p-3 rounded-2xl">
                                <Plus size={24} className="text-blue-500" />
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight">{editingTask ? 'Edit Task' : 'New Task'}</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {errorMsg && (
                                <p className="text-red-400 text-xs font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                                    {errorMsg}
                                </p>
                            )}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="What needs to be done?"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Add more details..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['pending', 'in-progress', 'completed'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: status as any })}
                                            className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${formData.status === status
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                                : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                                                }`}
                                        >
                                            {status.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition-all font-bold text-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 bg-white text-black hover:bg-blue-50 rounded-2xl font-black transition-all transform hover:scale-[1.02] shadow-xl disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (editingTask ? 'Save Changes' : 'Create Task')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
