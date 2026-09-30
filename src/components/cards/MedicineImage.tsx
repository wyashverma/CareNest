import type { MedicineForm } from '@/types/medicine';
import { cn } from '@/utils/cn';

type Shape = 'strip' | 'bottle' | 'tube' | 'box';

const shapeByForm: Record<MedicineForm, Shape> = {
  tablet: 'strip', capsule: 'strip', syrup: 'bottle', spray: 'bottle', cream: 'tube', gel: 'tube', sachet: 'box', device: 'box', kit: 'box', other: 'box',
};

const tintByCategory: Record<string, string> = {
  'Pain & Fever': '#0B6E8A',
  'Cold & Allergy': '#2F6F9F',
  'Digestive Care': '#2E7D6B',
  'Vitamins & Supplements': '#B26A00',
  'Diabetes Care': '#4A5FA8',
  'Heart Care': '#7A4A8A',
  'Skin Care': '#3D7F8F',
  'First Aid & Wellness': '#4B5B68',
};

/** Lightweight illustrated placeholder. Swap for real product photos (with width/height and lazy loading) once available. */
export function MedicineImage({ form, category, className }: { form: MedicineForm; category: string; className?: string }) {
  const tint = tintByCategory[category] ?? '#0B6E8A';
  const shape = shapeByForm[form];
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" className={cn('h-full w-full', className)}>
      <rect width="200" height="200" fill="#F6F9FB" />
      {shape === 'strip' && (
        <g>
          <rect x="46" y="44" width="108" height="112" rx="10" fill="#fff" stroke="#DDE5EB" strokeWidth="2" />
          {[0, 1, 2].map((r) => [0, 1].map((c) => (
            <ellipse key={`${r}-${c}`} cx={82 + c * 36} cy={72 + r * 34} rx="13" ry="10" fill={tint} opacity="0.85" />
          )))}
          <rect x="60" y="140" width="80" height="6" rx="3" fill={tint} opacity="0.25" />
        </g>
      )}
      {shape === 'bottle' && (
        <g>
          <rect x="84" y="30" width="32" height="20" rx="4" fill={tint} />
          <rect x="88" y="48" width="24" height="14" fill="#DDE5EB" />
          <rect x="62" y="60" width="76" height="110" rx="14" fill="#fff" stroke="#DDE5EB" strokeWidth="2" />
          <rect x="62" y="96" width="76" height="46" fill={tint} opacity="0.9" />
          <path d="M100 106v26M87 119h26" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {shape === 'tube' && (
        <g>
          <path d="M70 50h60l8 96H62z" fill="#fff" stroke="#DDE5EB" strokeWidth="2" />
          <rect x="82" y="26" width="36" height="26" rx="5" fill={tint} />
          <rect x="62" y="146" width="76" height="16" rx="3" fill={tint} opacity="0.9" />
          <path d="M100 74v40M80 94h40" stroke={tint} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        </g>
      )}
      {shape === 'box' && (
        <g>
          <rect x="48" y="58" width="104" height="90" rx="8" fill="#fff" stroke="#DDE5EB" strokeWidth="2" />
          <rect x="48" y="58" width="104" height="22" rx="8" fill={tint} />
          <path d="M100 96v34M83 113h34" stroke={tint} strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
