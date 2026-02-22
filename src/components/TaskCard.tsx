'use client';

import { Card, Category } from '@/types';

interface TaskCardProps {
  card: Card;
  category?: Category;
  onClick: () => void;
}

const typeIcons: Record<string, string> = {
  Project: '🚀',
  Task: '✓',
  Idea: '💡',
  Recurring: '⟳',
  Setup: '⚙️',
  Automation: '⚡',
  'Bug Fix': '🐛',
  Research: '🔍',
  Infrastructure: '🏗️',
};

export default function TaskCard({ card, category, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-zinc-800 rounded-lg p-4 mb-3 shadow-sm border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
          {typeIcons[card.type] || '•'} {card.type}
        </span>
        {category && (
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
            title={category.name}
          />
        )}
      </div>
      
      <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2">
        {card.title}
      </h3>
      
      {card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {card.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
          {card.tags.length > 3 && (
            <span className="text-xs text-zinc-400">+{card.tags.length - 3}</span>
          )}
        </div>
      )}
      
      {card.owner && (
        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          👤 {card.owner}
        </div>
      )}
    </div>
  );
}
