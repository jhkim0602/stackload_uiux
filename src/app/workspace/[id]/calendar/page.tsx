'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Events
const EVENTS = [
  { id: 1, title: '팀 정기 회의', date: '2025-05-15', time: '20:00', type: 'Meeting', color: 'bg-indigo-500' },
  { id: 2, title: '기획안 마감', date: '2025-05-18', time: '23:59', type: 'Deadline', color: 'bg-red-500' },
  { id: 3, title: '멘토링 세션', date: '2025-05-20', time: '14:00', type: 'Mentoring', color: 'bg-green-500' },
  { id: 4, title: '해커톤 본선', date: '2025-05-24', time: '09:00', type: 'Event', color: 'bg-blue-600', isMultiDay: true, endDate: '2025-05-26' },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2025-05-15'));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-900">캘린더</h2>
                <p className="text-slate-500 text-sm">팀 일정과 마감일을 관리하세요.</p>
            </div>
            <div className="flex items-center gap-2">
                 <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                     <ChevronLeft className="w-5 h-5 text-slate-600" />
                 </button>
                 <span className="text-lg font-bold text-slate-900 min-w-[140px] text-center">
                     2025년 5월
                 </span>
                 <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                     <ChevronRight className="w-5 h-5 text-slate-600" />
                 </button>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors">
                <Plus className="w-4 h-4" /> 일정 추가
            </button>
        </div>

        <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* Main Calendar Grid */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
                    {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                        <div key={day} className={cn("py-3 text-center text-sm font-bold text-slate-500", idx === 0 && "text-red-400", idx === 6 && "text-blue-400")}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                    {blanks.map((_, i) => (
                        <div key={`blank-${i}`} className="border-b border-r border-slate-100 bg-slate-50/30" />
                    ))}
                    {days.map((day) => {
                        const dateStr = `2025-05-${String(day).padStart(2, '0')}`;
                        const dayEvents = EVENTS.filter(e => e.date === dateStr || (e.isMultiDay && e.date <= dateStr && (e.endDate || '') >= dateStr));
                        const isToday = day === 15; // Mock today

                        return (
                            <div key={day} className={cn("border-b border-r border-slate-100 p-2 relative group hover:bg-indigo-50/10 transition-colors min-h-[100px]", isToday && "bg-indigo-50/20")}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={cn(
                                        "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full",
                                        isToday ? "bg-indigo-600 text-white shadow-md scale-110" : "text-slate-700"
                                    )}>
                                        {day}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {dayEvents.map(event => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={cn(
                                                "px-2 py-1 rounded text-[10px] font-bold text-white truncate shadow-sm cursor-pointer hover:brightness-110 transition-all",
                                                event.color
                                            )}
                                        >
                                            {event.time && <span className="opacity-75 mr-1 font-normal">{event.time}</span>}
                                            {event.title}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming List Side Panel */}
            <div className="w-80 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col">
                <h3 className="font-bold text-slate-900 mb-4">다가오는 일정</h3>
                <div className="space-y-4 flex-1 overflow-auto pr-1">
                    {EVENTS.map(event => (
                        <div key={event.id} className="flex gap-3 group cursor-pointer">
                            <div className="flex flex-col items-center">
                                <div className={cn("w-3 h-3 rounded-full border-2 border-white shadow-sm z-10", event.color)} />
                                <div className="w-0.5 h-full bg-slate-100 -mt-1.5 group-last:hidden" />
                            </div>
                            <div className="pb-4">
                                <div className="text-xs font-bold text-slate-400 mb-0.5">{event.date} • {event.time}</div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                                <div className="flex gap-2">
                                     <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-medium text-slate-500">
                                         <Clock className="w-3 h-3" /> 1h
                                     </span>
                                     <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-medium text-slate-500">
                                         <Video className="w-3 h-3" /> Zoom
                                     </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
