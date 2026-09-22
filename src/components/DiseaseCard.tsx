import React, { useState } from 'react';
import { Disease } from '../types';
import { NaqshVisualizer } from './NaqshVisualizer';
import { PlateVisualizer } from './PlateVisualizer';
import {
  Flame,
  CheckSquare,
  Square,
  BookOpen,
  Sparkles,
  Shield,
  Clock,
  Compass,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Copy,
  Share2,
  Video,
  X,
  Check,
} from 'lucide-react';

interface Props {
  disease: Disease;
  onOpenCounter: (disease: Disease) => void;
  onOpenHisar: () => void;
}

export const DiseaseCard: React.FC<Props> = ({
  disease,
  onOpenCounter,
  onOpenHisar,
}) => {
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'prophetic' | 'quranic' | 'naqsh'>('quranic');
  const [checkedSymptoms, setCheckedSymptoms] = useState<Record<number, boolean>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showShortsModal, setShowShortsModal] = useState<boolean>(false);
  const [isScriptCopied, setIsScriptCopied] = useState<boolean>(false);

  const toggleSymptom = (index: number) => {
    setCheckedSymptoms(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyPrescription = () => {
    const textToCopy = `مرض: ${disease.titleUrdu} (${disease.titleEnglish})
روحانی تشخیص: ${disease.spiritualDiagnosis.summary}
نبوی نسخہ: ${disease.propheticRemedy?.title || 'مذکور نہیں'}
قرآنی وظیفہ: ${disease.quranicRemedy.surahOrVerseTitle} (${disease.quranicRemedy.repetitionCount} مرتبہ)
تعویذ/نقش: ${disease.naqsh.title}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const getShortsScript = () => {
    return `🎬 عنوان (Hook):
کیا آپ یا آپ کے گھر میں کوئی "${disease.titleUrdu}" کے مسئلے سے پریشان ہے؟

🔍 روحانی تشخیص و باطنی وجہ:
${disease.spiritualDiagnosis.summary}

📖 فوری قرآنی وظیفہ:
${disease.quranicRemedy.surahOrVerseTitle}
عربی کلمات: "${disease.quranicRemedy.arabicVerse.slice(0, 100)}..."
تعداد: ${disease.quranicRemedy.repetitionCount} مرتبہ (${disease.quranicRemedy.timing})

🌿 طبِ نبوی ﷺ کا طریقہ:
${disease.propheticRemedy ? disease.propheticRemedy.title + ' - ' + disease.propheticRemedy.method.slice(0, 90) + '...' : 'صدقہ اور کثرتِ استغفار'}

✨ صدقہ جاریہ کے لیے اس ویڈیو کو لائک اور شیئر کریں تاکہ کسی ضرورت مند کا بھلا ہو سکے!`;
  };

  const handleCopyShortsScript = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getShortsScript());
      setIsScriptCopied(true);
      setTimeout(() => setIsScriptCopied(false), 2500);
    }
  };

  const categoryColorMap: Record<string, { bg: string; text: string; border: string }> = {
    physical: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    psychological: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
    spiritual: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    family: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    financial: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' },
    legal: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
    fitness: { bg: 'bg-lime-50', text: 'text-lime-900', border: 'border-lime-300' },
    'womens-health': { bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-200' },
    addiction: { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-200' },
    education: { bg: 'bg-cyan-50', text: 'text-cyan-900', border: 'border-cyan-200' },
    sleep: { bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-200' },
  };

  const colors = categoryColorMap[disease.categoryId] || categoryColorMap.physical;

  return (
    <article
      id={`disease-card-${disease.id}`}
      className="bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden scroll-mt-24"
    >
      {/* Top Banner with Number & Title */}
      <div className="p-5 sm:p-6 border-b border-stone-100 bg-gradient-to-r from-stone-50 via-white to-stone-50">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-sm font-arabic shadow-xs">
              {disease.number}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-nastaliq font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
              {disease.categoryTitleUrdu}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowShortsModal(true)}
              className="text-xs px-2.5 py-1 rounded-lg border border-red-200 bg-red-50/80 text-red-700 hover:bg-red-100 transition flex items-center gap-1 font-nastaliq"
              title="یوٹیوب شارٹس و واٹس ایپ اسکرپٹ تیار کریں"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>شارٹس اسکرپٹ</span>
            </button>
            <button
              type="button"
              onClick={handleCopyPrescription}
              className="text-xs px-2.5 py-1 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition flex items-center gap-1 font-nastaliq"
              title="نسخہ کاپی کریں"
            >
              <Copy className="w-3.5 h-3.5" />
              {isCopied ? 'کاپی ہو گیا!' : 'کاپی نسخہ'}
            </button>
            {disease.id === 'black-magic-jinn' && (
              <button
                type="button"
                onClick={onOpenHisar}
                className="text-xs px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition flex items-center gap-1 font-nastaliq shadow-xs"
              >
                <Shield className="w-3.5 h-3.5" />
                آیت الکرسی حصار گائیڈ
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-nastaliq tracking-tight">
            {disease.titleUrdu}
          </h3>
          <span className="text-xs sm:text-sm text-stone-500 font-sans tracking-wide">
            ({disease.titleEnglish})
          </span>
        </div>

        {/* Diagnosis element badge */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs font-nastaliq text-amber-950">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span><b>روحانی سبب و عنصر:</b> {disease.spiritualDiagnosis.element}</span>
        </div>
      </div>

      {/* Symptoms Checklist */}
      <div className="px-5 sm:px-6 py-4 bg-stone-50/60 border-b border-stone-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-800 font-nastaliq flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            علامات و تشخیصی علامات (اپنی علامات پر نشان لگائیں):
          </span>
          <span className="text-[11px] text-stone-500 font-arabic">
            {Object.values(checkedSymptoms).filter(Boolean).length} / {disease.symptoms.length} تصدیق شدہ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {disease.symptoms.map((symptom, idx) => {
            const isChecked = !!checkedSymptoms[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleSymptom(idx)}
                className={`text-right p-2.5 rounded-xl border text-xs sm:text-sm font-nastaliq flex items-start gap-2.5 transition ${
                  isChecked
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-white border-stone-200/70 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="mt-0.5 text-emerald-700 shrink-0">
                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-stone-400" />}
                </span>
                <span className="leading-snug">{symptom}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-5 sm:px-6 pt-4 border-b border-stone-200 flex gap-2 overflow-x-auto bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('quranic')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold font-nastaliq border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'quranic'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          قرآنی علاج و وظیفہ
        </button>

        {disease.propheticRemedy && (
          <button
            type="button"
            onClick={() => setActiveTab('prophetic')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold font-nastaliq border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'prophetic'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            طبی / نبوی علاج
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab('naqsh')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold font-nastaliq border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'naqsh'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Shield className="w-4 h-4 text-emerald-600" />
          نقش / تعویذ و عملیات
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diagnosis')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold font-nastaliq border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'diagnosis'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-600" />
          روحانی تشخیص و وجوہات
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5 sm:p-6 bg-white">
        {/* Tab: Quranic Wazifa */}
        {activeTab === 'quranic' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h4 className="font-bold text-base text-stone-900 font-nastaliq">
                  {disease.quranicRemedy.surahOrVerseTitle}
                </h4>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-nastaliq mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>تعداد: <b>{disease.quranicRemedy.repetitionCount} مرتبہ</b></span>
                  <span>•</span>
                  <span>{disease.quranicRemedy.timing}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCounter(disease)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-nastaliq font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                تسبیح کاؤنٹر شروع کریں ({disease.quranicRemedy.repetitionCount} بار)
              </button>
            </div>

            {/* Arabic Verse Box */}
            <div className="p-4 sm:p-5 bg-amber-50/60 border border-amber-200/90 rounded-2xl text-center">
              <p className="font-quran text-lg sm:text-2xl font-bold text-emerald-950 leading-loose">
                {disease.quranicRemedy.arabicVerse}
              </p>
              <div className="mt-3 pt-3 border-t border-amber-200 text-stone-700 text-xs sm:text-sm font-nastaliq leading-relaxed text-right">
                <span className="font-bold text-amber-900 block mb-0.5">اردو ترجمہ:</span>
                {disease.quranicRemedy.urduTranslation}
              </div>
            </div>

            {/* Detailed Method */}
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-xs sm:text-sm font-nastaliq text-stone-700">
              <b className="text-stone-900 block mb-1">طریقۂ دم و شفا:</b>
              <p className="leading-relaxed whitespace-pre-line">{disease.quranicRemedy.method}</p>
              {disease.quranicRemedy.specialNotes && (
                <div className="mt-2 pt-2 border-t border-stone-200 text-emerald-900 font-medium">
                  {disease.quranicRemedy.specialNotes}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Prophetic Remedy */}
        {activeTab === 'prophetic' && disease.propheticRemedy && (
          <div className="space-y-4 font-nastaliq text-stone-800">
            <div className="border-b border-stone-100 pb-3">
              <h4 className="font-bold text-base text-stone-900">
                {disease.propheticRemedy.title}
              </h4>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                {disease.propheticRemedy.benefitsSummary}
              </p>
            </div>

            {/* Ingredients table / pills */}
            <div>
              <span className="text-xs font-bold text-stone-700 block mb-2">اجزائے نسخہ و مقدار:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {disease.propheticRemedy.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="font-bold text-stone-900 block text-xs sm:text-sm">{ing.name}</span>
                    <span className="text-xs text-emerald-800 mt-1 block">{ing.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation and consumption method */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs sm:text-sm space-y-1">
              <span className="font-bold text-emerald-950 block">استعمال و تیاری کا طریقہ:</span>
              <p className="text-stone-800 leading-relaxed">{disease.propheticRemedy.method}</p>
            </div>

            {/* Hadith reference */}
            {disease.propheticRemedy.hadithReference && (
              <div className="p-3.5 bg-amber-50 border border-amber-200/90 rounded-xl text-xs sm:text-sm">
                <span className="font-bold text-amber-950 block mb-1">حدیثِ مبارکہ کا حوالہ:</span>
                <p className="text-stone-700 italic leading-relaxed">{disease.propheticRemedy.hadithReference}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Naqsh */}
        {activeTab === 'naqsh' && (
          <div>
            {disease.naqsh.type === 'musallas' && (
              <NaqshVisualizer naqsh={disease.naqsh} diseaseTitle={disease.titleUrdu} />
            )}
            {disease.naqsh.type === 'plate' && (
              <PlateVisualizer naqsh={disease.naqsh} diseaseTitle={disease.titleUrdu} />
            )}
            {(disease.naqsh.type === 'amulet' || disease.naqsh.type === 'tilsam') && (
              <div className="p-4 sm:p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
                  <Shield className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h4 className="font-bold text-stone-900 font-nastaliq text-base">
                      {disease.naqsh.title}
                    </h4>
                    <span className="text-xs text-stone-500 font-arabic">
                      روشنائی: {disease.naqsh.ink} | مقام: {disease.naqsh.wearingPosition}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl text-center space-y-2">
                  <span className="text-xs text-stone-500 font-nastaliq">مبارک کلمات برائے تعویذ:</span>
                  <p className="font-quran text-xl sm:text-2xl font-bold text-emerald-950">
                    {disease.naqsh.nameOfAllahOrVerse}
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm font-nastaliq text-stone-700 leading-relaxed">
                  <b className="text-stone-900 block">طریقہ تحریر و استعمال:</b>
                  <p>{disease.naqsh.instruction}</p>
                </div>

                {disease.id === 'black-magic-jinn' && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onOpenHisar}
                      className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-nastaliq font-bold flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <Shield className="w-4 h-4 text-amber-300" />
                      آیت الکرسی کے 7 طرفہ حفاظتی حصار کا طریقہ دیکھیں
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab: Diagnosis */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-4 font-nastaliq text-stone-800 text-xs sm:text-sm leading-relaxed">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
              <h4 className="font-bold text-amber-950 text-base mb-1">
                روحانی تشخیص کا خلاصہ:
              </h4>
              <p className="text-stone-700 leading-relaxed">{disease.spiritualDiagnosis.summary}</p>
            </div>

            <div>
              <span className="font-bold text-stone-900 block mb-2">بنیادی باطنی و روحانی اسباب:</span>
              <ul className="list-disc list-inside space-y-1.5 text-stone-700 pr-1">
                {disease.spiritualDiagnosis.spiritualCauses.map((cause, idx) => (
                  <li key={idx}>{cause}</li>
                ))}
              </ul>
            </div>

            {disease.additionalGuidelines && (
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                <span className="font-bold text-stone-900 block mb-1">ہدایات و شرعی احتیاط:</span>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  {disease.additionalGuidelines.map((guide, idx) => (
                    <li key={idx}>{guide}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* YouTube Shorts & WhatsApp Reel Script Modal */}
      {showShortsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-red-100 text-red-700 rounded-xl">
                  <Video className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-stone-900 font-nastaliq text-base sm:text-lg">
                    یوٹیوب شارٹس و واٹس ایپ اسکرپٹ (45 سیکنڈ)
                  </h3>
                  <p className="text-xs text-stone-500 font-nastaliq">
                    موضوع: {disease.titleUrdu}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowShortsModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl font-nastaliq text-stone-800 text-xs sm:text-sm whitespace-pre-line leading-relaxed max-h-[50vh] overflow-y-auto">
              {getShortsScript()}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-stone-500 font-nastaliq">
                * یہ اسکرپٹ شارٹس، ریلز اور واٹس ایپ اسٹیٹس پر لاکھوں ناظرین کے لیے مجرب ہے۔
              </span>
              <button
                type="button"
                onClick={handleCopyShortsScript}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-nastaliq font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition"
              >
                {isScriptCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>اسکرپٹ کاپی ہو گیا!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>مکمل اسکرپٹ کاپی کریں</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
