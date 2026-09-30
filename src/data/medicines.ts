import type { Availability } from '@/types/common';
import type { Medicine, MedicineForm } from '@/types/medicine';

/**
 * MOCK DATA. Brand and manufacturer names are fictional; generic names and compositions are
 * illustrative. Prices and availability are sample values. Product text is general labelling-style
 * information and is not medical advice.
 */
const manufacturers: Record<string, string> = {
  Medora: 'Medora Pharma Pvt. Ltd.',
  Vitalis: 'Vitalis Healthcare Ltd.',
  Arogya: 'Arogya Labs Pvt. Ltd.',
  NovaCure: 'NovaCure Pharmaceuticals',
  BlueLeaf: 'BlueLeaf Wellness Pvt. Ltd.',
  Sanjeevani: 'Sanjeevani Remedies',
  PureLife: 'PureLife Naturals',
  Everwell: 'Everwell Pharma Ltd.',
};

const DEFAULT_STORAGE = 'Store in a cool, dry place away from direct sunlight. Keep out of reach of children.';

interface Seed {
  id: string;
  name: string;
  generic: string;
  brand: keyof typeof manufacturers;
  category: string;
  form: MedicineForm;
  pack: string;
  mrp: number;
  price: number;
  comp: string[];
  uses: string;
  rx?: boolean;
  stock?: Availability;
  storage?: string;
}

const med = (s: Seed): Medicine => ({
  id: s.id,
  name: s.name,
  genericName: s.generic,
  brand: s.brand,
  manufacturer: manufacturers[s.brand],
  category: s.category,
  form: s.form,
  packSize: s.pack,
  price: s.price,
  mrp: s.mrp,
  discountPct: Math.round(((s.mrp - s.price) / s.mrp) * 100),
  composition: s.comp,
  uses: s.uses,
  storage: s.storage ?? DEFAULT_STORAGE,
  requiresPrescription: s.rx ?? false,
  availability: s.stock ?? 'available',
});

const PAIN = 'Pain & Fever';
const COLD = 'Cold & Allergy';
const DIGEST = 'Digestive Care';
const VITA = 'Vitamins & Supplements';
const DIAB = 'Diabetes Care';
const HEART = 'Heart Care';
const SKIN = 'Skin Care';
const AID = 'First Aid & Wellness';

export const medicines: Medicine[] = [
  med({ id: 'paracetamol-500-tablets', name: 'Paracetamol 500 mg Tablets', generic: 'Paracetamol', brand: 'Medora', category: PAIN, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 32, price: 28, comp: ['Paracetamol IP 500 mg'], uses: 'Used for temporary relief of mild to moderate pain and for reducing fever.' }),
  med({ id: 'ibuprofen-400-tablets', name: 'Ibuprofen 400 mg Tablets', generic: 'Ibuprofen', brand: 'Arogya', category: PAIN, form: 'tablet', pack: 'Strip of 10 tablets', mrp: 45, price: 39, comp: ['Ibuprofen IP 400 mg'], uses: 'Used for short-term relief of mild to moderate pain and inflammation.' }),
  med({ id: 'pain-relief-gel', name: 'Pain Relief Gel', generic: 'Diclofenac', brand: 'Vitalis', category: PAIN, form: 'gel', pack: 'Tube of 30 g', mrp: 120, price: 102, comp: ['Diclofenac diethylamine 1.16% w/w'], uses: 'For external use on the skin over sore muscles and joints.' }),
  med({ id: 'paracetamol-oral-suspension', name: 'Paracetamol Oral Suspension 125 mg/5 ml', generic: 'Paracetamol', brand: 'Medora', category: PAIN, form: 'syrup', pack: 'Bottle of 60 ml', mrp: 48, price: 43, comp: ['Paracetamol IP 125 mg per 5 ml'], uses: 'Used for temporary relief of mild pain and for reducing fever in children.' }),

  med({ id: 'cetirizine-10-tablets', name: 'Cetirizine 10 mg Tablets', generic: 'Cetirizine', brand: 'Everwell', category: COLD, form: 'tablet', pack: 'Strip of 10 tablets', mrp: 30, price: 25, comp: ['Cetirizine hydrochloride IP 10 mg'], uses: 'Used for relief of allergy symptoms such as sneezing, runny nose and itchy eyes.' }),
  med({ id: 'saline-nasal-spray', name: 'Saline Nasal Spray', generic: 'Sodium chloride', brand: 'BlueLeaf', category: COLD, form: 'spray', pack: 'Bottle of 15 ml', mrp: 95, price: 85, comp: ['Sodium chloride 0.65% w/v'], uses: 'Used to moisten and clean the nasal passages.' }),
  med({ id: 'herbal-cough-syrup', name: 'Herbal Cough Syrup', generic: 'Herbal extracts', brand: 'PureLife', category: COLD, form: 'syrup', pack: 'Bottle of 100 ml', mrp: 110, price: 96, comp: ['Tulsi extract', 'Mulethi extract', 'Honey'], uses: 'Herbal formulation traditionally used for throat comfort.' }),
  med({ id: 'throat-lozenges', name: 'Throat Lozenges', generic: 'Herbal lozenge', brand: 'PureLife', category: COLD, form: 'other', pack: 'Pack of 12 lozenges', mrp: 60, price: 54, comp: ['Menthol', 'Ginger extract'], uses: 'Used for temporary soothing of a sore or dry throat.' }),
  med({ id: 'amoxicillin-500-capsules', name: 'Amoxicillin 500 mg Capsules', generic: 'Amoxicillin', brand: 'NovaCure', category: COLD, form: 'capsule', pack: 'Strip of 10 capsules', mrp: 110, price: 96, comp: ['Amoxicillin trihydrate IP 500 mg'], uses: 'Antibiotic used for bacterial infections. Take only as prescribed by a doctor.', rx: true }),
  med({ id: 'azithromycin-500-tablets', name: 'Azithromycin 500 mg Tablets', generic: 'Azithromycin', brand: 'NovaCure', category: COLD, form: 'tablet', pack: 'Strip of 3 tablets', mrp: 118, price: 104, comp: ['Azithromycin IP 500 mg'], uses: 'Antibiotic used for bacterial infections. Take only as prescribed by a doctor.', rx: true, stock: 'limited' }),

  med({ id: 'ors-electrolyte-sachets', name: 'ORS Electrolyte Sachets', generic: 'Oral rehydration salts', brand: 'Sanjeevani', category: DIGEST, form: 'sachet', pack: 'Pack of 5 sachets', mrp: 40, price: 36, comp: ['Sodium chloride', 'Potassium chloride', 'Sodium citrate', 'Dextrose'], uses: 'Used to replace fluids and salts lost through diarrhoea or dehydration.' }),
  med({ id: 'pantoprazole-40-tablets', name: 'Pantoprazole 40 mg Tablets', generic: 'Pantoprazole', brand: 'Arogya', category: DIGEST, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 165, price: 142, comp: ['Pantoprazole sodium IP 40 mg'], uses: 'Used to reduce stomach acid. Take only as prescribed by a doctor.', rx: true }),
  med({ id: 'antacid-suspension', name: 'Antacid Suspension', generic: 'Aluminium hydroxide + Magnesium hydroxide', brand: 'Everwell', category: DIGEST, form: 'syrup', pack: 'Bottle of 170 ml', mrp: 118, price: 104, comp: ['Aluminium hydroxide gel', 'Magnesium hydroxide', 'Simethicone'], uses: 'Used for relief of acidity and heartburn.' }),
  med({ id: 'probiotic-capsules', name: 'Probiotic Capsules', generic: 'Lactobacillus blend', brand: 'Vitalis', category: DIGEST, form: 'capsule', pack: 'Strip of 10 capsules', mrp: 180, price: 158, comp: ['Lactobacillus acidophilus', 'Bifidobacterium lactis'], uses: 'Dietary supplement containing live bacterial cultures.' }),

  med({ id: 'vitamin-d3-capsules', name: 'Vitamin D3 Capsules 60,000 IU', generic: 'Cholecalciferol', brand: 'Vitalis', category: VITA, form: 'capsule', pack: 'Strip of 4 capsules', mrp: 140, price: 119, comp: ['Cholecalciferol (Vitamin D3) 60,000 IU'], uses: 'Vitamin D supplement. Use as directed on the label or by your doctor.' }),
  med({ id: 'multivitamin-tablets', name: 'Multivitamin Tablets', generic: 'Multivitamin and minerals', brand: 'Everwell', category: VITA, form: 'tablet', pack: 'Bottle of 30 tablets', mrp: 260, price: 218, comp: ['Vitamins A, B-complex, C, D, E', 'Zinc', 'Selenium'], uses: 'Dietary supplement providing vitamins and minerals.' }),
  med({ id: 'vitamin-c-chewable', name: 'Vitamin C 500 mg Chewable Tablets', generic: 'Ascorbic acid', brand: 'PureLife', category: VITA, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 90, price: 78, comp: ['Ascorbic acid 500 mg'], uses: 'Vitamin C dietary supplement.' }),
  med({ id: 'omega-3-softgels', name: 'Omega-3 Softgels', generic: 'Fish oil', brand: 'BlueLeaf', category: VITA, form: 'capsule', pack: 'Bottle of 30 softgels', mrp: 540, price: 459, comp: ['Fish oil 1000 mg', 'EPA 180 mg', 'DHA 120 mg'], uses: 'Dietary supplement containing omega-3 fatty acids.', stock: 'limited' }),
  med({ id: 'calcium-d3-tablets', name: 'Calcium + Vitamin D3 Tablets', generic: 'Calcium carbonate + Cholecalciferol', brand: 'Arogya', category: VITA, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 130, price: 112, comp: ['Calcium carbonate 500 mg', 'Vitamin D3 250 IU'], uses: 'Dietary supplement providing calcium and vitamin D.' }),
  med({ id: 'iron-folic-acid-tablets', name: 'Iron + Folic Acid Tablets', generic: 'Ferrous fumarate + Folic acid', brand: 'Sanjeevani', category: VITA, form: 'tablet', pack: 'Strip of 30 tablets', mrp: 95, price: 82, comp: ['Ferrous fumarate 200 mg', 'Folic acid 1.5 mg'], uses: 'Dietary supplement providing iron and folic acid.' }),

  med({ id: 'metformin-500-tablets', name: 'Metformin 500 mg Tablets', generic: 'Metformin', brand: 'Arogya', category: DIAB, form: 'tablet', pack: 'Strip of 20 tablets', mrp: 38, price: 33, comp: ['Metformin hydrochloride IP 500 mg'], uses: 'Used along with diet and exercise for type 2 diabetes. Take only as prescribed by a doctor.', rx: true }),
  med({ id: 'glucose-test-strips', name: 'Blood Glucose Test Strips', generic: 'Glucose test strips', brand: 'Medora', category: DIAB, form: 'device', pack: 'Box of 50 strips', mrp: 999, price: 799, comp: ['Glucose oxidase test strips'], uses: 'For use only with the matching glucose monitor. Check compatibility before ordering.' }),
  med({ id: 'sugar-free-sweetener', name: 'Sugar-Free Sweetener Tablets', generic: 'Sweetener', brand: 'PureLife', category: DIAB, form: 'other', pack: 'Bottle of 200 tablets', mrp: 150, price: 132, comp: ['Sucralose'], uses: 'Table-top sweetener used in place of sugar.' }),

  med({ id: 'amlodipine-5-tablets', name: 'Amlodipine 5 mg Tablets', generic: 'Amlodipine', brand: 'NovaCure', category: HEART, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 62, price: 54, comp: ['Amlodipine besylate IP 5 mg'], uses: 'Used for blood pressure management. Take only as prescribed by a doctor.', rx: true }),
  med({ id: 'atorvastatin-10-tablets', name: 'Atorvastatin 10 mg Tablets', generic: 'Atorvastatin', brand: 'Medora', category: HEART, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 128, price: 112, comp: ['Atorvastatin calcium IP 10 mg'], uses: 'Used for cholesterol management. Take only as prescribed by a doctor.', rx: true }),
  med({ id: 'losartan-50-tablets', name: 'Losartan 50 mg Tablets', generic: 'Losartan', brand: 'Arogya', category: HEART, form: 'tablet', pack: 'Strip of 15 tablets', mrp: 96, price: 84, comp: ['Losartan potassium IP 50 mg'], uses: 'Used for blood pressure management. Take only as prescribed by a doctor.', rx: true, stock: 'unavailable' }),

  med({ id: 'antifungal-cream', name: 'Antifungal Cream', generic: 'Clotrimazole', brand: 'Everwell', category: SKIN, form: 'cream', pack: 'Tube of 15 g', mrp: 88, price: 76, comp: ['Clotrimazole IP 1% w/w'], uses: 'For external use on the skin for fungal skin infections.' }),
  med({ id: 'moisturising-lotion', name: 'Moisturising Body Lotion', generic: 'Emollient', brand: 'BlueLeaf', category: SKIN, form: 'cream', pack: 'Bottle of 200 ml', mrp: 320, price: 272, comp: ['Glycerin', 'Shea butter', 'Vitamin E'], uses: 'Daily moisturiser for dry skin.' }),
  med({ id: 'sunscreen-spf-50', name: 'Sunscreen SPF 50', generic: 'Sunscreen', brand: 'BlueLeaf', category: SKIN, form: 'cream', pack: 'Tube of 50 g', mrp: 450, price: 382, comp: ['Zinc oxide', 'Octinoxate'], uses: 'Sunscreen for exposed skin. Reapply as directed on the label.' }),
  med({ id: 'antiseptic-cream', name: 'Antiseptic Cream', generic: 'Povidone-iodine', brand: 'Vitalis', category: SKIN, form: 'cream', pack: 'Tube of 20 g', mrp: 70, price: 62, comp: ['Povidone-iodine IP 5% w/w'], uses: 'For external use on minor cuts, scrapes and burns.' }),

  med({ id: 'antiseptic-solution', name: 'Antiseptic Solution', generic: 'Povidone-iodine', brand: 'Medora', category: AID, form: 'syrup', pack: 'Bottle of 100 ml', mrp: 85, price: 76, comp: ['Povidone-iodine IP 10% w/v'], uses: 'For external use to clean skin around minor wounds.' }),
  med({ id: 'first-aid-kit', name: 'First Aid Kit', generic: 'Home essentials kit', brand: 'Sanjeevani', category: AID, form: 'kit', pack: 'Kit of 32 items', mrp: 650, price: 546, comp: ['Bandages', 'Antiseptic wipes', 'Gauze', 'Scissors', 'Adhesive tape'], uses: 'Basic supplies for minor cuts and scrapes at home.' }),
  med({ id: 'adhesive-bandages', name: 'Adhesive Bandages', generic: 'Adhesive strips', brand: 'Vitalis', category: AID, form: 'kit', pack: 'Box of 20 strips', mrp: 60, price: 52, comp: ['Breathable fabric strips'], uses: 'Used to cover small cuts and scrapes.' }),
  med({ id: 'digital-thermometer', name: 'Digital Thermometer', generic: 'Digital thermometer', brand: 'Medora', category: AID, form: 'device', pack: '1 unit', mrp: 250, price: 199, comp: ['Digital thermometer with battery'], uses: 'Used to measure body temperature.' }),
  med({ id: 'hand-sanitizer', name: 'Hand Sanitizer', generic: 'Alcohol-based sanitizer', brand: 'PureLife', category: AID, form: 'spray', pack: 'Bottle of 200 ml', mrp: 120, price: 108, comp: ['Isopropyl alcohol 70% v/v'], uses: 'Used to sanitise hands when soap and water are not available.' }),
  med({ id: 'portable-oxygen-can', name: 'Portable Oxygen Can (5 L)', generic: 'Oxygen', brand: 'BlueLeaf', category: AID, form: 'other', pack: '1 can, 5 litres', mrp: 799, price: 699, comp: ['Oxygen'], uses: 'Portable oxygen can for wellness use. It is not a substitute for medically prescribed oxygen therapy. In an emergency, seek immediate medical help.', stock: 'limited' }),
];
