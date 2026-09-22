import React, { useState } from 'react';
import { NaqshConfig } from '../types';
import { Printer, Info, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  naqsh: NaqshConfig;
  diseaseTitle: string;
}

export const NaqshVisualizer: React.FC<Props> = ({ naqsh, diseaseTitle }) => {
  const [showSumBreakdown, setShowSumBreakdown] = useState(false);

  const matrix = naqsh.matrix || [
    [129, 134, 128],
    [127, 130, 134],
    [135, 127, 129],
  ];

  // Chamber order in traditional Musallas (بطد / زہج / واح)
  const chamberOrder = [
    [4, 8, 3],
    [2, 5, 7],
    [9, 1, 6],
  ];

  const rowSums = matrix.map(row => row.reduce((a, b) => a + b, 0));
  const colSums = [0, 1, 2].map(c => matrix[0][c] + matrix[1][c] + matrix[2][c]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="naqsh-visualizer-container" className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-6 my-4 shadow-sm relative overflow-hidden">
      {/* Decorative Islamic corner motifs */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600/40 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600/40 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600/40 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600/40 rounded-br-lg pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-lg font-bold text-amber-950 font-nastaliq">{naqsh.title}</h4>
            <p className="text-xs text-amber-800 font-arabic">
              اعدادِ ابجد کا مجموعہ: <span className="font-bold underline decoration-amber-400">{naqsh.abjadTotal}</span> (برائے شفا و دافعِ امراض)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            type="button"
            id="toggle-naqsh-abjad-btn"
            onClick={() => setShowSumBreakdown(!showSumBreakdown)}
            className="text-xs px-3 py-1.5 rounded-lg border border-amber-300 bg-white/80 hover:bg-amber-100 text-amber-900 transition flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-amber-700" />
            {showSumBreakdown ? 'اعداد چھپائیں' : 'اعداد و میزان کی تصدیق'}
          </button>
          <button
            type="button"
            id="print-naqsh-btn"
            onClick={handlePrint}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            پرنٹ برائے تعویذ
          </button>
        </div>
      </div>

      {/* The Printable Visual Naqsh */}
      <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-white border-2 border-amber-300 rounded-xl shadow-inner max-w-md mx-auto">
        {/* Calligraphy Header: 786 */}
        <div className="text-center mb-3">
          <span className="font-quran text-2xl sm:text-3xl font-bold text-emerald-900 tracking-wider">
            ﷽
          </span>
          <div className="text-[13px] text-stone-600 font-nastaliq mt-0.5">
            ۷۸۶ — بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="inline-block px-3 py-0.5 mt-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-nastaliq">
            نقشِ مثلث برائے شفا: {diseaseTitle}
          </div>
        </div>

        {/* 3x3 Table */}
        <div className="relative p-2 bg-gradient-to-br from-amber-50 to-orange-50/50 border-4 border-amber-600 rounded-lg shadow-md w-full max-w-[320px]">
          {/* Inner double border */}
          <div className="border border-amber-500 p-1">
            <div className="grid grid-cols-3 gap-1 bg-amber-700 p-1 rounded-sm">
              {matrix.map((row, rIdx) =>
                row.map((val, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className="relative bg-white aspect-square flex flex-col items-center justify-center border border-amber-300 shadow-sm p-1 rounded transition hover:bg-amber-50"
                  >
                    {/* Chamber number indicator */}
                    <span className="absolute top-1 right-1 text-[9px] text-stone-400 font-arabic">
                      خانہ {chamberOrder[rIdx][cIdx]}
                    </span>

                    {/* Main Abjad Number */}
                    <span className="text-xl sm:text-2xl font-bold text-amber-900 font-arabic tracking-tight">
                      {val}
                    </span>

                    {showSumBreakdown && (
                      <span className="text-[9px] text-emerald-700 font-arabic mt-0.5">
                        {rIdx === 0 && cIdx === 1 ? 'کسر +1' : 'ترتیب'}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Abjad Sum Validation Info */}
        {showSumBreakdown && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs w-full text-emerald-950 font-arabic">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              قاعدہ نقشِ مثلث و میزان (حسابِ ابجد):
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-2">
              <div className="p-1.5 bg-white rounded border border-emerald-200">
                سطر 1: {matrix[0][0]}+{matrix[0][1]}+{matrix[0][2]} = <b className="text-emerald-800">{rowSums[0]}</b>
              </div>
              <div className="p-1.5 bg-white rounded border border-emerald-200">
                سطر 2: {matrix[1][0]}+{matrix[1][1]}+{matrix[1][2]} = <b className="text-emerald-800">{rowSums[1]}</b>
              </div>
              <div className="p-1.5 bg-white rounded border border-emerald-200">
                سطر 3: {matrix[2][0]}+{matrix[2][1]}+{matrix[2][2]} = <b className="text-emerald-800">{rowSums[2]}</b>
              </div>
            </div>
            <p className="text-[11px] text-stone-700 leading-relaxed font-nastaliq">
              ہر سطر اور قطار کا میزان اسمِ ذات "{naqsh.nameOfAllahOrVerse}" کے کل ابجدی اعداد یعنی <b>{naqsh.abjadTotal}</b> کے عین مطابق درست ہے، جو کسر کے شرائط کے ساتھ مرتب کیا گیا ہے۔
            </p>
          </div>
        )}

        {/* Saffron Watermark */}
        <div className="text-center mt-3 text-[11px] text-amber-800 font-nastaliq">
          روشنی و سیاہی: خالص زعفران اور عرقِ گلاب | وقتِ تحریر: ساعتِ شمس یا بعد نمازِ فجر
        </div>
      </div>

      {/* Instructions & Precautions */}
      <div className="mt-5 space-y-3 font-nastaliq text-stone-800 text-sm leading-relaxed">
        <div className="p-3.5 bg-white/90 border border-amber-200 rounded-xl">
          <div className="font-bold text-amber-900 text-base mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            نقش لکھنے اور پہننے کا شرعی و روحانی طریقہ:
          </div>
          <p className="text-stone-700 text-xs sm:text-sm">{naqsh.instruction}</p>
        </div>

        {naqsh.precautions && (
          <div className="p-3.5 bg-amber-100/50 border border-amber-200 rounded-xl">
            <span className="font-bold text-amber-950 text-xs sm:text-sm block mb-1">
              ضروری احتیاطی تدابیر برائے تعویذ:
            </span>
            <ul className="list-disc list-inside space-y-1 text-xs text-stone-700 pr-1">
              {naqsh.precautions.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
