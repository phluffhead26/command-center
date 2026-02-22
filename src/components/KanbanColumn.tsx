'use client';

import { Card, Category } from '@/types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  cards: Card[];
  categories: Category[];
  onCardClick: (card: Card) => void;
}

export default function KanbanColumn({
  title,
  color,
  cards,
  categories,
  onCardClick,
}: KanbanColumnProps) {
  const getCategory = (categoryId: string) =>
    categories.find((c) => c.id === categoryId);

  return (
    <div className="flex flex-col min-w-[280px] w-full sm:w-80 flex-shrink-0">
      <div
        className="flex items-center justify-between p-3 rounded-t-lg"
        style={{ backgroundColor: color + '20' }}
      >
        <h2 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
          {title}
        </h2>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
          {cards.length}
        </span>
      </div>
      
      <div
        className="flex-1 p-3 rounded-b-lg min-h-[200px] max-h-[calc(100vh-200px)] overflow-y-auto"
        style={{ backgroundColor: color + '10' }}
      >
        {cards.length === 0 ? (
          <div className="text-center text-zinc-400 dark:text-zinc-500 text-sm py-8">
            No items
          </div>
        ) : (
          cards.map((card) => (
            <TaskCard
              key={card.id}
              card={card}
              category={getCategory(card.category)}
              onClick={() => onCardClick(card)}
            />
          ))
        )}
      </div>
    </div>
  );
}
