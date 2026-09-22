import React, { useState } from 'react';
import { Shield, X, CheckCircle2, Compass, Home, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HisarGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hisar' | 'sprinkle'>('hisar');
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const hisarSteps = [
    {
      title: 'پہلی آیت الکرسی — سامنے کی جانب',
      desc: 'ایک بار آیت الکرسی مکمل پڑھیں اور اپنے منہ کے بالکل سامنے پھونک ماریں (یہ آپ کے آگے کا حصار ہے)۔',
      direction: 'سامنے (Front)',
      icon: '↑',
    },
    {
      title: 'دوسری آیت الکرسی — پیچھے کی جانب',
      desc: 'دوسری بار پڑھیں اور اپنے پیچھے کی طرف پھونک ماریں (یہ پیٹھ کا حفاظتی قلعہ ہے)۔',
      direction: 'پیچھے (Back)',
      icon: '↓',
    },
    {
      title: 'تیسری آیت الکرسی — دائیں جانب',
      desc: 'تیسری بار پڑھ کر اپنی دائیں طرف پھونک ماریں تاکہ دائیں جانب سے آنے والے شیاطین رک سکیں۔',
      direction: 'دائیں (Right)',
      icon: '→',
    },
    {
      title: 'چوتھی آیت الکرسی — بائیں جانب',
      desc: 'چوتھی بار پڑھ کر اپنی بائیں طرف پھونک ماریں۔',
      direction: 'بائیں (Left)',
      icon: '←',
    },
    {
      title: 'پانچویں آیت الکرسی — اوپر کی جانب',
      desc: 'پانچویں بار پڑھ کر اپنے سر کے اوپر آسمان یا چھت کی سمت پھونک ماریں۔',
      direction: 'اوپر (Above)',
      icon: '⇡',
    },
    {
      title: 'چھٹی آیت الکرسی — نیچے کی جانب',
      desc: 'چھٹی بار پڑھ کر زمین یا اپنے پیروں کے نیچے کی جانب پھونک ماریں۔',
      direction: 'نیچے (Below)',
      icon: '⇣',
    },
    {
      title: 'ساتویں آیت الکرسی — مکمل دائرہ و قفل (Lock)',
      desc: 'ساتویں بار آیت الکرسی پڑھ کر اپنے ارد گرد 360 ڈگری دائرے کی صورت میں پھونکیں، پھر دونوں ہاتھوں پر دم کر کے اپنے سینے اور پورے جسم پر پھیر لیں اور کہیں: "حَصَّنْتُ نَفْسِي بِالْحَيِّ الْقَيُّومِ" (میں نے خود کو حی و قیوم کے حصار میں دے دیا)۔',
      direction: 'مکمل حصار (360° Shield)',
      icon: '⭕',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-emerald-900 text-white p-4 rounded-t-2xl flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-800 rounded-xl">
              <Shield className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <h3 className="font-bold text-lg font-nastaliq">
                آیت الکرسی کا رات کا حصار و گھر کا چھڑکاؤ
              </h3>
              <p className="text-xs text-emerald-200 font-arabic">
                کالے جادو، شیاطین، خبیث موکلات اور ڈراؤنے خوابوں سے فولادی حفاظت
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 border-b border-stone-200 flex gap-2 bg-stone-100/70">
          <button
            type="button"
            onClick={() => setActiveTab('hisar')}
            className={`flex-1 py-2 px-3 rounded-xl font-nastaliq text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'hisar'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            آیت الکرسی کا ذاتی حصار (7 اطراف)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sprinkle')}
            className={`flex-1 py-2 px-3 rounded-xl font-nastaliq text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'sprinkle'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Home className="w-4 h-4" />
            گھر کے کونوں میں دم شدہ پانی کا چھڑکاؤ
          </button>
        </div>

        {/* Tab 1: Hisar */}
        {activeTab === 'hisar' && (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Arabic Text Display */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
              <span className="font-quran text-lg sm:text-xl font-bold text-emerald-950 block leading-loose">
                اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ
              </span>
            </div>

            {/* Stepper overview */}
            <div className="flex items-center justify-between text-xs font-nastaliq text-stone-600 mb-2">
              <span>مرحلہ وار حصار بنانے کا طریقہ:</span>
              <span className="font-bold text-emerald-800">
                مرحلہ {currentStep + 1} از 7
              </span>
            </div>

            {/* Step navigation buttons */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {hisarSteps.map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`py-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center ${
                    currentStep === idx
                      ? 'bg-emerald-700 text-white ring-2 ring-emerald-500'
                      : idx < currentStep
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  <span className="text-base">{step.icon}</span>
                  <span className="text-[10px] hidden sm:inline">{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Active Step Card */}
            <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-900 font-nastaliq text-base">
                  {hisarSteps[currentStep].title}
                </h4>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs rounded-full font-arabic">
                  {hisarSteps[currentStep].direction}
                </span>
              </div>
              <p className="text-stone-700 text-sm font-nastaliq leading-relaxed">
                {hisarSteps[currentStep].desc}
              </p>
            </div>

            <div className="flex justify-between gap-2 pt-2">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
                className="px-4 py-2 bg-stone-200 text-stone-700 rounded-xl font-nastaliq text-xs font-bold disabled:opacity-40"
              >
                پچھلی سمت
              </button>
              <button
                type="button"
                disabled={currentStep === hisarSteps.length - 1}
                onClick={() => setCurrentStep(p => Math.min(hisarSteps.length - 1, p + 1))}
                className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-nastaliq text-xs font-bold hover:bg-emerald-800 transition disabled:opacity-40"
              >
                اگلی سمت ({currentStep + 1}/7)
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: House Water Sprinkling */}
        {activeTab === 'sprinkle' && (
          <div className="p-4 sm:p-6 space-y-4 font-nastaliq text-stone-800">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <h4 className="font-bold text-amber-900 text-base flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                مغرب کے وقت گھر کے کونوں میں چھڑکاؤ کا مستند طریقہ:
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                ایک پیالے یا اسپرے بوتل میں صاف پینے کا پانی لیں۔ اول و آخر 3 مرتبہ درود شریف پڑھیں۔ درمیان میں <b>11 مرتبہ آیت الکرسی</b> باآواز پڑھ کر پانی پر دم کریں۔
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5 p-3 bg-white border border-stone-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">وقت:</h5>
                  <p className="text-xs text-stone-600">
                    عین مغرب کی اذان سے کچھ دیر پہلے یا فورا بعد یہ عمل کریں۔
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-white border border-stone-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">چھڑکنے کی جگہ:</h5>
                  <p className="text-xs text-stone-600">
                    گھر کے ہر کمرے، ہال، دالان اور چھت کے چاروں کونوں پر ہلکے چھینٹے ماریں۔
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-red-700 font-bold shrink-0 mt-0.5 text-base">⚠️</span>
                <div>
                  <h5 className="font-bold text-red-900 text-sm">سخت تنبیہ:</h5>
                  <p className="text-xs text-red-800 leading-relaxed">
                    بیت الخلاء (Washrooms / Toilets) اور نالیوں وغیرہ میں دم شدہ پانی ہرگز نہ چھڑکیں۔ پاکیزگی کا مکمل دھیان رکھیں۔
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 text-white rounded-xl text-xs font-nastaliq font-bold hover:bg-stone-900 transition"
          >
            بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
