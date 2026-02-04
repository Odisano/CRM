import React from 'react';
import { Category } from '../types';
import { CATEGORY_LABELS } from '../constants';

interface CategoryFilterProps {
  selected: Category | 'all';
  onSelect: (c: Category | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onSelect }) => {
  const categories: (Category | 'all')[] = ['all', 'mom_care', 'pumping', 'storage', 'feeding'];

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === cat
              ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
          }`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
};