'use client';

import { useState, useMemo } from 'react';
import { TaskData, Card, Column, Category } from '@/types';
import KanbanColumn from './KanbanColumn';
import CardModal from './CardModal';

interface KanbanBoardProps {
  data: TaskData;
}

export default function KanbanBoard({ data }: KanbanBoardProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const filteredCards = useMemo(() => {
    return data.cards.filter((card) => {
      const matchesSearch =
        searchQuery === '' ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === '' || card.category === selectedCategory;

      const matchesType =
        selectedType === '' || card.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [data.cards, searchQuery, selectedCategory, selectedType]);

  const getCardsForColumn = (columnId: string) =>
    filteredCards.filter((card) => card.column === columnId);

  const getCategory = (categoryId: string) =>
    data.categories.find((c) => c.id === categoryId);

  const cardTypes = useMemo(() => {
    const types = new Set(data.cards.map((card) => card.type));
    return Array.from(types).sort();
  }, [data.cards]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedType('');
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || selectedType;

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              🔍
            </span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {data.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {cardTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Showing {filteredCards.length} of {data.cards.length} tasks
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 p-4 min-w-max h-full">
          {data.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              cards={getCardsForColumn(column.id)}
              categories={data.categories}
              onCardClick={setSelectedCard}
            />
          ))}
        </div>
      </div>

      {/* Card Detail Modal */}
      <CardModal
        card={selectedCard}
        category={selectedCard ? getCategory(selectedCard.category) : undefined}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
