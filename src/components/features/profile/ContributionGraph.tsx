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
  // Syntro Green Scale for Contribution
  const getLevelColor = (count: number) => {
    if (count === 0) return 'bg-base-100';
    if (count <= 2) return 'bg-green-200';
    if (count <= 5) return 'bg-green-400';
    if (count <= 8) return 'bg-green-500';
    return 'bg-green-600';
  };

  return (
    <div className="bg-white">
      <div className="flex flex-wrap gap-1.5">
        {data.map((item, index) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.001 }}
            className={cn(
              "h-3.5 w-3.5 rounded-sm transition-colors hover:ring-2 hover:ring-offset-1 hover:ring-green-400 cursor-pointer",
              getLevelColor(item.count)
            )}
            title={`${item.date}: ${item.count} contributions`}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-end gap-2 text-xs font-bold text-base-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-base-100" /> {/* 0 */}
          <div className="h-3 w-3 rounded-sm bg-green-200" />
          <div className="h-3 w-3 rounded-sm bg-green-400" />
          <div className="h-3 w-3 rounded-sm bg-green-500" />
          <div className="h-3 w-3 rounded-sm bg-green-600" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
