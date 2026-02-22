'use client';

import { Card, Category } from '@/types';

interface CardModalProps {
  card: Card | null;
  category?: Category;
  onClose: () => void;
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

export default function CardModal({ card, category, onClose }: CardModalProps) {
  if (!card) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcons[card.type] || '•'}</span>
            <span className="text-sm font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {card.type}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-2xl"
          >
            ×
          </button>
        </div>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {card.title}
        </h2>

        {category && (
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {category.name}
            </span>
          </div>
        )}

        {card.goal && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Goal
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{card.goal}</p>
          </div>
        )}

        {card.notes && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Notes
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
              {card.notes}
            </p>
          </div>
        )}

        {card.tags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
          {card.owner && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              👤 <strong>Owner:</strong> {card.owner}
            </div>
          )}
          {card.parent && (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Parent: {card.parent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
