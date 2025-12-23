'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send, Hash, Image as ImageIcon, X, Users, Code2, Calendar, MapPin, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function WriteForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTag = searchParams.get('tag') || '';

    // Mode: 'GENERAL' or 'RECRUIT'
    const [mode, setMode] = useState<'GENERAL' | 'RECRUIT'>('GENERAL');

    useEffect(() => {
        if (initialTag === 'TeamRecruit') {
            setMode('RECRUIT');
        }
    }, [initialTag]);

    // Common State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // General Mode State
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');

    // Recruit Mode State
    const [positions, setPositions] = useState<{role: string, count: number}[]>([{ role: 'Frontend', count: 1 }]);
    const [meetingType, setMeetingType] = useState('Online'); // Online, Offline, Hybrid
    const [duration, setDuration] = useState('1개월 - 3개월');

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault();
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addPosition = () => {
        setPositions([...positions, { role: '', count: 1 }]);
    };

    const updatePosition = (index: number, field: 'role' | 'count', value: string | number) => {
        const newPositions = [...positions];
        // @ts-ignore
        newPositions[index][field] = value;
        setPositions(newPositions);
    };

    const removePosition = (index: number) => {
        setPositions(positions.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        // 실제 구현에서는 API 호출이 필요합니다.
        if (mode === 'RECRUIT') {
            alert('팀원 모집 글이 성공적으로 등록되었습니다!\n(워크스페이스 로비로 이동합니다)');
            router.push('/workspace');
        } else {
            alert('게시글이 등록되었습니다.');
            router.push('/community');
        }
    };

    return (
        <div className="bg-white min-h-screen py-10 font-sans text-slate-900 border-t border-slate-100">
            <div className="container max-w-5xl mx-auto px-4">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-12">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                    </button>
                    <div className="text-sm font-semibold text-slate-400">
                        New Post
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left Sidebar: Minimalist Tab */}
                    <div className="w-full lg:w-48 shrink-0 sticky top-10">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Post Type</h3>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setMode('GENERAL')}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors",
                                    mode === 'GENERAL'
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <Send className="w-4 h-4" />
                                <span>General</span>
                            </button>

                            <button
                                onClick={() => setMode('RECRUIT')}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors",
                                    mode === 'RECRUIT'
                                        ? "bg-indigo-600 text-white"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <Users className="w-4 h-4" />
                                <span>Recruit</span>
                            </button>
                        </div>

                        {mode === 'RECRUIT' && (
                             <div className="mt-8 px-4 py-4 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-xs leading-relaxed font-medium text-slate-500">
                                    <strong className="text-slate-900 block mb-1">Tip</strong>
                                    상세한 모집 요건을 작성할수록 핏(Fit)이 맞는 팀원을 더 빠르게 만날 수 있어요.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Main Form Area - Clean & Borderless Input Feel */}
                    <div className="flex-1 w-full max-w-3xl">
                        <div className="space-y-12">
                            {/* Title Input */}
                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={mode === 'RECRUIT' ? "프로젝트 제목을 입력하세요" : "제목을 입력하세요"}
                                    className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none p-0 focus:ring-0 placeholder:text-slate-300 text-slate-900 tracking-tight"
                                />
                            </div>

                            {/* Recruit Specific Fields - Clean Grid */}
                            {mode === 'RECRUIT' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 py-8 border-y border-slate-100">
                                    <div className="col-span-full space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-bold text-slate-900">모집 포지션</label>
                                            <button onClick={addPosition} className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> 포지션 추가
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {positions.map((pos, idx) => (
                                                <div key={idx} className="flex gap-3 items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Role (e.g. Frontend)"
                                                        value={pos.role}
                                                        onChange={(e) => updatePosition(idx, 'role', e.target.value)}
                                                        className="flex-1 bg-slate-50 rounded-lg px-4 py-3 text-sm font-medium border border-transparent focus:bg-white focus:border-slate-200 focus:ring-0 outline-none transition-all placeholder:text-slate-400"
                                                    />
                                                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-3 w-28 border border-transparent focus-within:bg-white focus-within:border-slate-200">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={pos.count}
                                                            onChange={(e) => updatePosition(idx, 'count', parseInt(e.target.value))}
                                                            className="w-full text-center text-sm font-bold bg-transparent outline-none"
                                                        />
                                                        <span className="text-xs text-slate-400 shrink-0 font-medium">명</span>
                                                    </div>
                                                    {positions.length > 1 && (
                                                        <button onClick={() => removePosition(idx)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-3">진행 방식</label>
                                        <div className="relative">
                                            <select
                                                value={meetingType}
                                                onChange={(e) => setMeetingType(e.target.value)}
                                                className="w-full bg-slate-50 appearance-none rounded-lg px-4 py-3 text-sm font-medium border border-transparent focus:bg-white focus:border-slate-200 outline-none cursor-pointer"
                                            >
                                                <option value="Online">Online</option>
                                                <option value="Offline">Offline</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-3">예상 기간</label>
                                        <div className="relative">
                                            <select
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className="w-full bg-slate-50 appearance-none rounded-lg px-4 py-3 text-sm font-medium border border-transparent focus:bg-white focus:border-slate-200 outline-none cursor-pointer"
                                            >
                                                <option>1개월 이내</option>
                                                <option>1개월 - 3개월</option>
                                                <option>3개월 - 6개월</option>
                                                <option>6개월 이상</option>
                                            </select>
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Content Editor */}
                            <div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={mode === 'RECRUIT' ? "프로젝트의 목표, 진행 상황, 바라는 팀원상 등을 솔직하게 작성해주세요." : "여러분의 이야기를 들려주세요..."}
                                    className="w-full h-[400px] resize-none bg-transparent p-0 text-lg text-slate-700 leading-loose placeholder:text-slate-300 outline-none border-none focus:ring-0 font-medium"
                                />
                            </div>

                            {/* General Tags */}
                            {mode === 'GENERAL' && (
                                <div className="border-t border-slate-100 pt-8">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold flex items-center gap-2">
                                                #{tag}
                                                <button onClick={() => removeTag(tag)} className="text-slate-400 hover:text-slate-600"><X className="w-3 h-3" /></button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyDown={handleAddTag}
                                            placeholder="+ 태그 입력"
                                            className="bg-transparent outline-none text-sm font-bold text-slate-500 placeholder:text-slate-300 w-32 px-2 py-1"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-16 flex items-center justify-between border-t border-slate-100 pt-8">
                             <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                                    <Code2 className="w-5 h-5" />
                                </button>
                             </div>

                             <button
                                onClick={handleSubmit}
                                className={cn(
                                    "px-8 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2",
                                    mode === 'RECRUIT' ? "bg-indigo-600 text-white" : "bg-slate-900 text-white"
                                )}
                             >
                                 <span>{mode === 'RECRUIT' ? '모집글 등록하기' : '등록하기'}</span>
                                 <Send className="w-4 h-4" />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WritePage() {
  return (
    <Suspense>
      <WriteForm />
    </Suspense>
  );
}
