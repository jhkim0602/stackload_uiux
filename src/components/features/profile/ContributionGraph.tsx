'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Activity {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  data: Activity[];
}

export function ContributionGraph({ data }: ContributionGraphProps) {
  // Simple tiered coloring based on count
  const getLevelColor = (count: number) => {
    if (count === 0) return 'bg-[var(--surface-hover)]';
    if (count <= 2) return 'bg-emerald-900';
    if (count <= 5) return 'bg-emerald-700';
    if (count <= 8) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="mb-4 text-lg font-semibold">Learning Activity</h3>
      <div className="flex flex-wrap gap-1">
        {data.map((item, index) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.001 }}
            className={cn(
              "h-3 w-3 rounded-sm",
              getLevelColor(item.count)
            )}
            title={`${item.date}: ${item.count} contributions`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-[var(--muted-foreground)]">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-[var(--surface-hover)]" /> {/* 0 */}
          <div className="h-3 w-3 rounded-sm bg-emerald-900" />
          <div className="h-3 w-3 rounded-sm bg-emerald-700" />
          <div className="h-3 w-3 rounded-sm bg-emerald-500" />
          <div className="h-3 w-3 rounded-sm bg-emerald-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
