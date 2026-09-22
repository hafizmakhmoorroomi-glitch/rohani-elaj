import React from 'react';
import { Search, Shield, BookOpen, Sparkles, Printer } from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/diseasesData';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (c: CategoryId) => void;
  onOpenHisar: () => void;
}

export const Header: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenHisar,
}) => {
  return (
    <header className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white border-b-4 border-amber-500/80 shadow-lg relative overflow-hidden">
      {/* Subtle Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Top Calligraphy Bismillah */}
        <div className="text-center mb-4">
          <span className="font-quran text-2xl sm:text-4xl text-amber-300 drop-shadow-sm font-bold block tracking-wider">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <p className="text-[12px] sm:text-xs text-emerald-200/80 font-nastaliq mt-1">
            "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ" (اور جب میں بیمار ہوتا ہوں تو وہی مجھے شفا دیتا ہے)
          </p>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-nastaliq text-white tracking-tight mb-2">
            روحانی علاج و طبِ نبوی
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-nastaliq leading-relaxed">
            مستند قرآنی آیات، نبوی نسخہ جات، روحانی تشخیص، اور مصدقہ نقوش و تعویذات کا جامع رہنما
          </p>
        </div>

        {/* Search Bar & Quick Action */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              id="search-disease-input"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="مرض کا نام، علامت، قرآنی آیت یا نبوی نسخہ تلاش کریں (مثلاً: شوگر، جادو، خوف، تلبینہ)..."
              className="w-full py-3.5 pr-11 pl-4 rounded-2xl bg-white/95 text-stone-900 placeholder-stone-400 text-xs sm:text-sm font-nastaliq border-2 border-amber-400/80 shadow-md focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition"
            />
            <Search className="w-5 h-5 text-emerald-900 absolute right-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-3 text-stone-400 hover:text-stone-700 text-xs font-nastaliq bg-stone-100 px-2 py-0.5 rounded-full"
              >
                صاف کریں
              </button>
            )}
          </div>
        </div>

        {/* Category Pills & Quick Feature Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-emerald-800/80">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              id={`category-tab-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-nastaliq font-bold transition flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-800 border border-emerald-700'
              }`}
            >
              <span>{cat.titleUrdu}</span>
            </button>
          ))}

          {/* Quick Hisar Modal Trigger Button */}
          <button
            type="button"
            onClick={onOpenHisar}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-nastaliq font-bold bg-amber-500/20 text-amber-200 border border-amber-400/50 hover:bg-amber-500/30 transition flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>حصارِ آیت الکرسی</span>
          </button>
        </div>
      </div>
    </header>
  );
};
