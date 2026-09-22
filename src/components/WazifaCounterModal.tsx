import React, { useState } from 'react';
import { QuranicRemedy } from '../types';
import { X, RotateCcw, CheckCircle2, Volume2, Sparkles, Heart } from 'lucide-react';

interface Props {
  remedy: QuranicRemedy;
  diseaseTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const WazifaCounterModal: React.FC<Props> = ({
  remedy,
  diseaseTitle,
  isOpen,
  onClose,
}) => {
  const [count, setCount] = useState<number>(0);
  const target = remedy.repetitionCount;

  if (!isOpen) return null;

  const isCompleted = count >= target;
  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  const handleIncrement = () => {
    if (count < target) {
      setCount(prev => prev + 1);
      // Try soft haptic if supported
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(30);
      }
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-stone-50 border border-stone-200 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-4 sm:p-5 rounded-t-3xl flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-300 font-arabic block mb-0.5">
              روحانی و قرآنی وظیفہ تسبیح برائے:
            </span>
            <h3 className="font-bold text-lg font-nastaliq text-white">
              {diseaseTitle} — {remedy.surahOrVerseTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quranic Verse Box */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-2xl text-center shadow-inner relative">
            <span className="text-emerald-900/60 font-quran text-sm block mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <p className="font-quran text-xl sm:text-2xl font-bold text-emerald-950 leading-loose">
              {remedy.arabicVerse}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 text-stone-700 text-xs sm:text-sm font-nastaliq leading-relaxed">
              <span className="font-bold text-amber-950 block mb-0.5">اردو ترجمہ و مفہوم:</span>
              {remedy.urduTranslation}
            </div>
          </div>

          {/* Practical Method & Timing */}
          <div className="p-3 bg-white border border-stone-200 rounded-xl text-xs font-nastaliq space-y-1 text-stone-700">
            <div>
              <b className="text-emerald-900">وقت و طریقہ:</b> {remedy.timing}
            </div>
            <div>
              <b className="text-emerald-900">عمل:</b> {remedy.method}
            </div>
          </div>

          {/* Interactive Counter Circle */}
          <div className="flex flex-col items-center justify-center pt-2 pb-4">
            <button
              type="button"
              id="wazifa-tap-counter-btn"
              onClick={handleIncrement}
              disabled={isCompleted}
              className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-xl border-4 ${
                isCompleted
                  ? 'bg-emerald-600 text-white border-emerald-400 cursor-default'
                  : 'bg-gradient-to-b from-emerald-800 to-emerald-950 text-white border-amber-400/80 hover:shadow-emerald-900/30 cursor-pointer'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-amber-300 mb-1" />
                  <span className="text-xs font-nastaliq font-bold">مکمل ہوا</span>
                  <span className="text-xl font-bold font-arabic">{target} / {target}</span>
                </>
              ) : (
                <>
                  <span className="text-[11px] text-amber-200 font-nastaliq mb-0.5">
                    تسبیح کے لیے دبائیں
                  </span>
                  <span className="text-4xl sm:text-5xl font-bold font-arabic tracking-tight">
                    {count}
                  </span>
                  <span className="text-xs text-emerald-200 font-arabic mt-1">
                    ہدف: {target} مرتبہ
                  </span>
                </>
              )}
            </button>

            {/* Progress bar */}
            <div className="w-full max-w-xs mt-4">
              <div className="flex justify-between text-xs text-stone-500 font-arabic mb-1">
                <span>پیش رفت: {progressPercent}%</span>
                <span>باقی: {Math.max(0, target - count)}</span>
              </div>
              <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Completion instructions */}
            {isCompleted ? (
              <div className="mt-4 p-3.5 bg-emerald-100 border border-emerald-300 rounded-xl text-center animate-fade-in w-full">
                <div className="flex items-center justify-center gap-1.5 text-emerald-900 font-bold font-nastaliq text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  ماشاء اللہ! آپ نے {target} مرتبہ وظیفہ مکمل کر لیا ہے۔
                </div>
                <p className="text-xs text-emerald-800 font-nastaliq mt-1">
                  اب پانی پر یا سینے پر 3 مرتبہ "ھُو" کے ساتھ دم کریں اور صدقِ دل سے شفا کی دعا مانگیں۔
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-stone-500 font-nastaliq mt-2 text-center">
                خشوع و خضوع کے ساتھ تلاوت کرتے ہوئے ہر بار دائرے کو ٹیپ کریں۔
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-stone-200 bg-stone-100 flex items-center justify-between rounded-b-3xl">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-nastaliq text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            شروع سے تسبیح
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-nastaliq font-bold transition shadow-sm"
          >
            مکمل و بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
