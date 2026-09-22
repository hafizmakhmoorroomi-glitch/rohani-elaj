import React, { useState } from 'react';
import { NaqshConfig } from '../types';
import { Sparkles, Droplets, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  naqsh: NaqshConfig;
  diseaseTitle: string;
}

export const PlateVisualizer: React.FC<Props> = ({ naqsh, diseaseTitle }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // 11 repetitions of "یا بارد یا سلام"
  const repetitions = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <div id="plate-visualizer-container" className="bg-sky-50/60 border border-sky-200/80 rounded-2xl p-4 sm:p-6 my-4 shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-sky-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-sky-100 text-sky-800 rounded-xl">
            <Droplets className="w-5 h-5 text-sky-700" />
          </span>
          <div>
            <h4 className="text-lg font-bold text-sky-950 font-nastaliq">{naqsh.title}</h4>
            <p className="text-xs text-sky-800 font-arabic">
              طریقہ: چینی کی سفید پلیٹ پر زعفران سے تحریر و شستشو (پانی سے دھو کر پینا)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-lg border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          تعداد: 11 مرتبہ زعفرانی تحریر
        </div>
      </div>

      {/* Visual Porcelain Plate Rendering */}
      <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-200 rounded-2xl shadow-inner max-w-lg mx-auto">
        <div className="text-center mb-2">
          <span className="text-xs font-nastaliq text-stone-500">
            تصویری خاکہ: چینی کی صاف سفید پلیٹ پر زعفران کی روشنائی
          </span>
        </div>

        {/* Circular Porcelain Plate */}
        <div className="relative w-64 h-64 sm:w-76 sm:h-76 rounded-full bg-gradient-to-tr from-stone-100 via-white to-stone-50 border-8 border-stone-200/90 shadow-xl flex items-center justify-center p-4 transition-all">
          {/* Subtle plate rim shine */}
          <div className="absolute inset-1 rounded-full border border-stone-300 pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-dashed border-amber-300/60 pointer-events-none" />

          {/* Center Calligraphy */}
          <div className="text-center z-10 p-3 bg-amber-50/60 rounded-full border border-amber-200/50 backdrop-blur-xs">
            <span className="font-quran text-lg sm:text-xl font-bold text-amber-800 block">
              ﷽
            </span>
            <span className="font-arabic font-bold text-amber-900 text-sm sm:text-base tracking-wider block mt-0.5">
              یَا بَارِدُ یَا سَلَامُ
            </span>
            <span className="text-[10px] text-amber-700 font-nastaliq block">
              (جگر و معدہ کی تپش دور کرنے کے لیے)
            </span>
          </div>

          {/* 10 outer circular inscriptions around the center */}
          {repetitions.slice(0, 10).map((num, i) => {
            const angle = (i * 36) * (Math.PI / 180);
            const radius = 95; // px from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={num}
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${i * 36 + 90}deg)`,
                }}
                className="absolute text-[10px] sm:text-xs font-bold text-amber-800/90 font-arabic whitespace-nowrap select-none"
              >
                یَا بَارِدُ یَا سَلَامُ
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-stone-600 font-nastaliq">
            رنگ: خالص زعفران (Saffron) | پلیٹ: چینی کی بنا ڈیزائن والی کوری سفید پلیٹ
          </p>
        </div>
      </div>

      {/* Step by step interactive tab */}
      <div className="mt-5 space-y-3 font-nastaliq text-stone-800 text-sm leading-relaxed">
        <div className="flex gap-2 border-b border-sky-200 pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeStep === 1 ? 'bg-sky-700 text-white shadow-sm' : 'bg-white text-sky-900 border border-sky-200'
            }`}
          >
            مرحلہ 1: تحریر کا طریقہ
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeStep === 2 ? 'bg-sky-700 text-white shadow-sm' : 'bg-white text-sky-900 border border-sky-200'
            }`}
          >
            مرحلہ 2: دھونا اور پلانا
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeStep === 3 ? 'bg-sky-700 text-white shadow-sm' : 'bg-white text-sky-900 border border-sky-200'
            }`}
          >
            احتیاطی تدابیر
          </button>
        </div>

        {activeStep === 1 && (
          <div className="p-3.5 bg-white border border-sky-200 rounded-xl space-y-2">
            <h5 className="font-bold text-sky-950 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              زعفران سے لکھنے کا طریقہ:
            </h5>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              تھوڑا سا زعفران لے کر عرقِ گلاب میں بھگوئیں تاکہ گہرا پیلا یا نارنجی رنگ نکل آئے۔ کسی نرم لکڑی کے قلم یا ماچس کی صاف تیلی پر تھوڑی روئی لپیٹ کر اس روشنائی سے پلیٹ پر ۱۱ مرتبہ خوشخط "یَا بَارِدُ یَا سَلَامُ" دائرہ وار لکھیں۔
            </p>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-3.5 bg-white border border-sky-200 rounded-xl space-y-2">
            <h5 className="font-bold text-sky-950 flex items-center gap-1.5 text-sm">
              <Droplets className="w-4 h-4 text-sky-600" />
              پانی سے دھونا اور پینے کا طریقہ:
            </h5>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              تحریر خشک ہونے کے بعد اس پر آدھا کپ آبِ زم زم یا صاف بارش کا یا ابلا ہوا ٹھنڈا پانی ڈالیں۔ انگلی کی پور سے زعفرانی تحریر کو اچھی طرح گھول لیں اور مریض کو صبح نہار منہ دعا مانگ کر پلائیں۔ یہ عمل کم از کم 7 تا 11 دن مسلسل دہرائیں۔
            </p>
          </div>
        )}

        {activeStep === 3 && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <h5 className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              لازمی احتیاطی ہدایات:
            </h5>
            <ul className="list-disc list-inside text-xs sm:text-sm text-stone-700 space-y-1">
              <li>پلیٹ پر کوئی تصویر، گل کاری یا کیمیکل پرنٹ نہ ہو۔ خالص سادہ سفید چینی کی پلیٹ ہو۔</li>
              <li>کسی مارکر یا کیمیائی سیاہی سے ہرگز نہ لکھیں، صرف قدرتی زعفران و عرقِ گلاب استعمال کریں۔</li>
              <li>پانی پیتے وقت "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ" پڑھیں۔</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
