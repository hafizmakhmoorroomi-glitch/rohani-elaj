import React, { useState, useMemo } from 'react';
import { DISEASES, CATEGORIES } from './data/diseasesData';
import { Disease, CategoryId } from './types';
import { Header } from './components/Header';
import { DiseaseCard } from './components/DiseaseCard';
import { WazifaCounterModal } from './components/WazifaCounterModal';
import { HisarGuideModal } from './components/HisarGuideModal';
import {
  HeartPulse,
  Activity,
  ShieldAlert,
  Sparkles,
  Info,
  BookOpen,
  HelpCircle,
  PhoneCall,
  Printer,
  ChevronLeft,
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [counterDisease, setCounterDisease] = useState<Disease | null>(null);
  const [isHisarOpen, setIsHisarOpen] = useState<boolean>(false);
  const [showAdabModal, setShowAdabModal] = useState<boolean>(false);

  // Filter diseases based on Category and Search Query
  const filteredDiseases = useMemo(() => {
    return DISEASES.filter(item => {
      const matchesCategory =
        selectedCategory === 'all' || item.categoryId === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle =
        item.titleUrdu.toLowerCase().includes(q) ||
        item.titleEnglish.toLowerCase().includes(q);
      const inDiagnosis =
        item.spiritualDiagnosis.summary.toLowerCase().includes(q) ||
        item.spiritualDiagnosis.element.toLowerCase().includes(q);
      const inSymptoms = item.symptoms.some(s => s.toLowerCase().includes(q));
      const inProphetic = item.propheticRemedy
        ? item.propheticRemedy.title.toLowerCase().includes(q) ||
          item.propheticRemedy.ingredients.some(i => i.name.toLowerCase().includes(q))
        : false;
      const inQuranic =
        item.quranicRemedy.surahOrVerseTitle.toLowerCase().includes(q) ||
        item.quranicRemedy.arabicVerse.includes(q) ||
        item.quranicRemedy.urduTranslation.includes(q);
      const inNaqsh = item.naqsh.title.toLowerCase().includes(q);

      return inTitle || inDiagnosis || inSymptoms || inProphetic || inQuranic || inNaqsh;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 font-sans flex flex-col selection:bg-emerald-800 selection:text-amber-100">
      {/* Header with Search and Categories */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenHisar={() => setIsHisarOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Category Description Banner */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-900 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-700" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-nastaliq">
                {CATEGORIES.find(c => c.id === selectedCategory)?.titleUrdu}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-nastaliq">
              {CATEGORIES.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowAdabModal(true)}
              className="text-xs px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-nastaliq font-bold transition flex items-center gap-1.5 border border-stone-200"
            >
              <Info className="w-3.5 h-3.5 text-stone-600" />
              شرائط و آدابِ علاج
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-nastaliq font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              تمام نسخہ جات پرنٹ کریں
            </button>
          </div>
        </div>

        {/* Diseases List */}
        {filteredDiseases.length > 0 ? (
          <div className="space-y-6">
            {filteredDiseases.map(disease => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                onOpenCounter={d => setCounterDisease(d)}
                onOpenHisar={() => setIsHisarOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
            <span className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 inline-flex items-center justify-center mx-auto text-xl">
              🔍
            </span>
            <h3 className="text-lg font-bold text-stone-900 font-nastaliq">
              کوئی مرض یا نسخہ نہیں ملا
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-nastaliq max-w-md mx-auto">
              آپ کے تلاش کردہ الفاظ "{searchQuery}" کے مطابق کوئی اندراج نہیں ملا۔ براہِ کرم دوسرے الفاظ یا تمام کیٹیگریز منتخب کریں۔
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-emerald-800 text-white text-xs font-nastaliq rounded-xl font-bold mt-2"
            >
              تمام امراض دکھائیں
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-8 px-4 text-center mt-12 font-nastaliq text-xs leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-quran text-lg text-amber-400">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ
          </p>
          <p className="text-stone-400 max-w-2xl mx-auto">
            شرعی و طبی نوٹ: تمام قرآنی وظائف اور نبوی علاج باعثِ برکت و شفا ہیں۔ تاہم کسی بھی شدید جسمانی ایمرجنسی میں مستند ڈاکٹر یا طبیب سے رجوع کرنا بھی سنتِ نبوی کے عین مطابق ہے۔ شفا فقط ربِ کائنات کے حکم سے ہوتی ہے۔
          </p>
          <div className="text-stone-500 text-[11px] pt-3 border-t border-stone-800 font-arabic">
            روحانی علاج و طبِ نبوی انسائیکلوپیڈیا — تمام حقوق محفوظ ہیں
          </div>
        </div>
      </footer>

      {/* Wazifa Counter Modal */}
      {counterDisease && (
        <WazifaCounterModal
          remedy={counterDisease.quranicRemedy}
          diseaseTitle={counterDisease.titleUrdu}
          isOpen={!!counterDisease}
          onClose={() => setCounterDisease(null)}
        />
      )}

      {/* Hisar Guide Modal */}
      <HisarGuideModal
        isOpen={isHisarOpen}
        onClose={() => setIsHisarOpen(false)}
      />

      {/* Adab & Rules Modal */}
      {showAdabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-stone-200 font-nastaliq space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                روحانی و قرآنی علاج کے لازمی آداب و شرائط
              </h3>
              <button
                type="button"
                onClick={() => setShowAdabModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <b className="text-emerald-950 block mb-0.5">1. یقینِ کامل اور اخلاص:</b>
                شفا کا اصل مالک اللہ تعالیٰ ہے۔ کلامِ پاک پر غیر متزلزل یقین رکھیں کہ اس کے ہر حرف میں شفا ہے۔
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <b className="text-stone-900 block mb-0.5">2. طہارت و نماز کی پابندی:</b>
                وظیفہ یا تعویذ لکھنے اور پڑھنے سے قبل باوضو ہونا، قبلہ رخ بیٹھنا اور پنجگانہ نماز کی پابندی لازم ہے۔
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <b className="text-stone-900 block mb-0.5">3. رزقِ حلال اور صدقہ:</b>
                حرام لقمے سے وظائف کی تاثیر زائل ہو جاتی ہے۔ عمل شروع کرنے سے قبل حسبِ توفیق صدقہ ضرور نکالیں۔
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <b className="text-amber-950 block mb-0.5">4. اول و آخر درود شریف:</b>
                ہر قرآنی دعا اور وظیفے کے شروع اور آخر میں 3 یا 11 مرتبہ درودِ ابراہیمی پڑھنا دعا کی فوری قبولیت کی ضمانت ہے۔
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowAdabModal(false)}
                className="w-full py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition"
              >
                سمجھ گیا / جزاک اللہ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
