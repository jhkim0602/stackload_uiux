'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Users, Calendar, MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function ConnectEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [positions, setPositions] = useState<{role: string, count: number}[]>([{ role: 'Frontend', count: 1 }]);
  const [meetingType, setMeetingType] = useState('Online');
  const [duration, setDuration] = useState('1개월 - 3개월');
  const [content, setContent] = useState('');

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
      alert('팀원 모집 글이 성공적으로 등록되었습니다!\n(워크스페이스 로비로 이동합니다)');
      router.push('/workspace');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-10"
    >
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => router.push('/community/write')} className="flex items-center gap-2 text-base-500 hover:text-base-900 font-bold text-sm transition-colors px-3 py-2 rounded-lg hover:bg-base-50">
          <ArrowLeft className="w-4 h-4" /> 카테고리 다시 선택
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Connect / Recruiting
        </span>
      </div>

      <div className="space-y-10">
        <div>
          <label className="block text-sm font-bold text-base-900 mb-2">프로젝트 이름 (제목)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="함께 성장할 팀원을 찾습니다!"
            className="w-full text-2xl font-bold bg-transparent border-b-2 border-base-100 py-2 focus:border-indigo-500 focus:outline-none placeholder:text-base-300 transition-colors"
          />
        </div>

        {/* Recruit Wizard Card */}
        <div className="bg-white rounded-3xl ring-4 ring-base-50 border border-base-200 p-8 space-y-8">
            <h3 className="text-lg font-black text-base-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" /> 모집 요건 설정
            </h3>

            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-base-100 pb-2">
                    <label className="text-sm font-bold text-base-600">모집 포지션</label>
                    <button onClick={addPosition} className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-md transition-colors">
                        <Plus className="w-3 h-3" /> 포지션 추가
                    </button>
                </div>
                <div className="space-y-3">
                    {positions.map((pos, idx) => (
                        <div key={idx} className="flex gap-3 items-center group">
                            <div className="flex-1 bg-base-50 rounded-xl px-4 py-3 border border-transparent focus-within:bg-white focus-within:border-indigo-200 focus-within:ring-4 focus-within:ring-indigo-50 transition-all flex items-center">
                                <input
                                    type="text"
                                    placeholder="Role (e.g. Frontend)"
                                    value={pos.role}
                                    onChange={(e) => updatePosition(idx, 'role', e.target.value)}
                                    className="flex-1 bg-transparent text-sm font-bold text-base-900 outline-none placeholder:text-base-400 placeholder:font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-2 bg-base-50 rounded-xl px-2 py-3 w-32 border border-transparent focus-within:bg-white focus-within:border-indigo-200 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                                <input
                                    type="number"
                                    min="1"
                                    value={pos.count}
                                    onChange={(e) => updatePosition(idx, 'count', parseInt(e.target.value))}
                                    className="w-full text-center text-sm font-bold bg-transparent outline-none text-base-900"
                                />
                                <span className="text-xs text-base-400 shrink-0 font-bold pr-2">명</span>
                            </div>
                            {positions.length > 1 && (
                                <button onClick={() => removePosition(idx)} className="p-3 text-base-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-base-600 mb-3 ml-1">진행 방식</label>
                    <div className="relative group">
                        <select
                            value={meetingType}
                            onChange={(e) => setMeetingType(e.target.value)}
                            className="w-full bg-base-50 appearance-none rounded-xl px-4 py-3.5 text-sm font-bold text-base-900 border border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none cursor-pointer transition-all hover:bg-base-100"
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-400 pointer-events-none group-hover:text-base-600 transition-colors" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-base-600 mb-3 ml-1">예상 기간</label>
                    <div className="relative group">
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-base-50 appearance-none rounded-xl px-4 py-3.5 text-sm font-bold text-base-900 border border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none cursor-pointer transition-all hover:bg-base-100"
                        >
                            <option>1개월 이내</option>
                            <option>1개월 - 3개월</option>
                            <option>3개월 - 6개월</option>
                            <option>6개월 이상</option>
                        </select>
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-400 pointer-events-none group-hover:text-base-600 transition-colors" />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="프로젝트의 목표, 진행 상황, 상세한 내용을 자유롭게 작성해주세요."
                className="w-full h-[400px] resize-none bg-transparent p-0 text-lg text-base-700 leading-loose placeholder:text-base-300 outline-none border-none focus:ring-0 font-medium"
            />
        </div>

        <div className="flex justify-end pt-8 border-t border-base-100 sticky bottom-6 z-10">
          <button
            onClick={handleSubmit}
            className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20"
          >
            모집글 등록하기 <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
