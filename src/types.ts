export type CategoryId = 'all' | 'physical' | 'psychological' | 'spiritual' | 'family' | 'financial' | 'legal' | 'fitness';

export interface NaqshConfig {
  title: string;
  nameOfAllahOrVerse: string;
  abjadTotal: number;
  type: 'musallas' | 'plate' | 'amulet' | 'tilsam';
  matrix?: number[][]; // For 3x3 Musallas
  instruction: string;
  ink: string; // e.g. "زعفران و عرقِ گلاب" (Saffron and Rosewater)
  wearingPosition: string; // e.g. "گلے میں دل کے برابر"
  precautions?: string[];
}

export interface QuranicRemedy {
  surahOrVerseTitle: string;
  arabicVerse: string;
  urduTranslation: string;
  repetitionCount: number;
  timing: string; // e.g., "فجر یا مغرب کے بعد"
  method: string; // e.g., "41 بار پڑھ کر پانی پر دم کر کے پییں"
  specialNotes?: string;
}

export interface PropheticRemedy {
  title: string;
  ingredients: { name: string; quantity: string; note?: string }[];
  method: string;
  hadithReference?: string;
  benefitsSummary: string;
}

export interface Disease {
  id: string;
  number: number;
  titleUrdu: string;
  titleEnglish: string;
  categoryId: 'physical' | 'psychological' | 'spiritual' | 'family' | 'financial' | 'legal' | 'fitness';
  categoryTitleUrdu: string;
  spiritualDiagnosis: {
    element: string; // e.g., "آتشی عنصر / خون کی حدت", "سوداوی کیفیت / زحل کی نحوست"
    spiritualCauses: string[];
    summary: string;
  };
  symptoms: string[];
  propheticRemedy?: PropheticRemedy;
  quranicRemedy: QuranicRemedy;
  naqsh: NaqshConfig;
  additionalGuidelines?: string[];
}

export interface Category {
  id: CategoryId;
  titleUrdu: string;
  titleEnglish: string;
  badge: string;
  iconName: string;
  description: string;
}
