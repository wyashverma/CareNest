import type { SearchCategory } from '@/types/search';

/**
 * MOCK DATA: a lightweight search index used until each domain has its own service.
 * All names are fictional sample data. Once the domain services exist, searchService
 * should aggregate them (or call a real /search endpoint) and this file can be deleted.
 */
export interface SearchIndexEntry {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  keywords?: string[];
}

export const searchCategoryMeta: Record<SearchCategory, { label: string; route: string }> = {
  medicines: { label: 'Medicines', route: '/medicines' },
  doctors: { label: 'Doctors', route: '/doctors' },
  hospitals: { label: 'Hospitals', route: '/hospital-beds' },
  'lab-tests': { label: 'Lab Tests', route: '/lab-tests' },
  vaccines: { label: 'Vaccines', route: '/vaccines' },
  equipment: { label: 'Medical Equipment', route: '/medical-equipment' },
  'home-care': { label: 'Home Care', route: '/home-care' },
};

/** Display order of groups in results. */
export const searchCategoryOrder: SearchCategory[] = [
  'medicines', 'doctors', 'hospitals', 'lab-tests', 'vaccines', 'equipment', 'home-care',
];

export const popularSearches: string[] = ['Oxygen', 'General physician', 'ICU beds', 'Blood sugar test', 'Flu vaccine', 'Home nurse'];

export const searchIndex: SearchIndexEntry[] = [
  // Medicines
  { id: 'm1', category: 'medicines', title: 'Paracetamol 500 mg tablets', subtitle: 'Tablets, strip of 15', keywords: ['acetaminophen'] },
  { id: 'm2', category: 'medicines', title: 'Cetirizine 10 mg tablets', subtitle: 'Tablets, strip of 10' },
  { id: 'm3', category: 'medicines', title: 'ORS electrolyte sachets', subtitle: 'Pack of 5 sachets', keywords: ['oral rehydration'] },
  { id: 'm4', category: 'medicines', title: 'Vitamin D3 capsules', subtitle: 'Strip of 4 capsules', keywords: ['cholecalciferol'] },
  { id: 'm5', category: 'medicines', title: 'Metformin 500 mg tablets', subtitle: 'Prescription required' },
  { id: 'm6', category: 'medicines', title: 'Amoxicillin 500 mg capsules', subtitle: 'Prescription required' },
  { id: 'm7', category: 'medicines', title: 'Pantoprazole 40 mg tablets', subtitle: 'Prescription required' },
  { id: 'm8', category: 'medicines', title: 'Saline nasal spray', subtitle: 'Bottle, 15 ml' },
  { id: 'm9', category: 'medicines', title: 'Portable oxygen can', subtitle: 'Wellness product, 5 litre can', keywords: ['oxygen'] },
  { id: 'm10', category: 'medicines', title: 'Antiseptic solution', subtitle: 'Bottle, 100 ml' },
  { id: 'm11', category: 'medicines', title: 'First aid kit', subtitle: 'Home essentials kit' },
  { id: 'm12', category: 'medicines', title: 'Multivitamin tablets', subtitle: 'Bottle of 30 tablets' },

  // Doctors
  { id: 'd1', category: 'doctors', title: 'General Physician', subtitle: 'Specialisation', keywords: ['gp', 'family doctor', 'physician'] },
  { id: 'd2', category: 'doctors', title: 'Cardiologist', subtitle: 'Specialisation', keywords: ['heart'] },
  { id: 'd3', category: 'doctors', title: 'Dermatologist', subtitle: 'Specialisation', keywords: ['skin'] },
  { id: 'd4', category: 'doctors', title: 'Neurologist', subtitle: 'Specialisation' },
  { id: 'd5', category: 'doctors', title: 'Pediatrician', subtitle: 'Specialisation', keywords: ['paediatrician', 'child doctor'] },
  { id: 'd6', category: 'doctors', title: 'Orthopedic', subtitle: 'Specialisation', keywords: ['orthopaedic', 'bone', 'joint'] },
  { id: 'd7', category: 'doctors', title: 'Gynecologist', subtitle: 'Specialisation', keywords: ['gynaecologist'] },
  { id: 'd8', category: 'doctors', title: 'Dentist', subtitle: 'Specialisation', keywords: ['dental', 'teeth'] },
  { id: 'd9', category: 'doctors', title: 'Psychiatrist', subtitle: 'Specialisation' },
  { id: 'd10', category: 'doctors', title: 'Ophthalmologist', subtitle: 'Specialisation', keywords: ['eye'] },
  { id: 'd11', category: 'doctors', title: 'Dr. Ananya Rao', subtitle: 'Cardiologist, sample profile' },
  { id: 'd12', category: 'doctors', title: 'Dr. Vikram Sethi', subtitle: 'General Physician, sample profile' },

  // Hospitals
  { id: 'h1', category: 'hospitals', title: 'Riverside Multispeciality Hospital', subtitle: 'Sample hospital, emergency care', keywords: ['oxygen', 'icu', 'emergency'] },
  { id: 'h2', category: 'hospitals', title: 'Lakeview Medical Centre', subtitle: 'Sample hospital, ICU beds', keywords: ['icu', 'ventilator', 'oxygen'] },
  { id: 'h3', category: 'hospitals', title: "Sunrise Children's Hospital", subtitle: 'Sample hospital, pediatric beds', keywords: ['pediatric', 'child'] },
  { id: 'h4', category: 'hospitals', title: "Greenfield Maternity & Women's Hospital", subtitle: 'Sample hospital, maternity beds', keywords: ['maternity'] },
  { id: 'h5', category: 'hospitals', title: 'CityCare Emergency Hospital', subtitle: 'Sample hospital, emergency care', keywords: ['emergency', 'oxygen'] },
  { id: 'h6', category: 'hospitals', title: 'Hillcrest General Hospital', subtitle: 'Sample hospital, general and private beds', keywords: ['general', 'private', 'semi-private'] },

  // Lab tests
  { id: 'l1', category: 'lab-tests', title: 'Complete Blood Count (CBC)', subtitle: 'Blood test', keywords: ['cbc', 'hemogram'] },
  { id: 'l2', category: 'lab-tests', title: 'Blood Sugar (fasting)', subtitle: 'Blood test', keywords: ['glucose', 'diabetes'] },
  { id: 'l3', category: 'lab-tests', title: 'Lipid Profile', subtitle: 'Blood test', keywords: ['cholesterol'] },
  { id: 'l4', category: 'lab-tests', title: 'Liver Function Test (LFT)', subtitle: 'Blood test' },
  { id: 'l5', category: 'lab-tests', title: 'Kidney Function Test (KFT)', subtitle: 'Blood test' },
  { id: 'l6', category: 'lab-tests', title: 'Thyroid Profile', subtitle: 'Blood test', keywords: ['tsh', 't3', 't4'] },
  { id: 'l7', category: 'lab-tests', title: 'Vitamin D and B12 tests', subtitle: 'Blood test', keywords: ['vitamin'] },
  { id: 'l8', category: 'lab-tests', title: 'Full body health checkup', subtitle: 'Health package, home sample collection', keywords: ['package', 'checkup'] },

  // Vaccines
  { id: 'v1', category: 'vaccines', title: 'Influenza (flu) vaccine', subtitle: 'Vaccination centres near you', keywords: ['flu'] },
  { id: 'v2', category: 'vaccines', title: 'Hepatitis B vaccine', subtitle: 'Vaccination centres near you' },
  { id: 'v3', category: 'vaccines', title: 'Typhoid vaccine', subtitle: 'Vaccination centres near you' },
  { id: 'v4', category: 'vaccines', title: 'HPV vaccine', subtitle: 'Vaccination centres near you' },
  { id: 'v5', category: 'vaccines', title: 'Tetanus (Td) booster', subtitle: 'Vaccination centres near you' },
  { id: 'v6', category: 'vaccines', title: 'MMR vaccine', subtitle: 'Vaccination centres near you' },

  // Equipment
  { id: 'e1', category: 'equipment', title: 'Oxygen cylinder', subtitle: 'Rent or buy', keywords: ['oxygen'] },
  { id: 'e2', category: 'equipment', title: 'Oxygen concentrator (5 L)', subtitle: 'Rent or buy', keywords: ['oxygen'] },
  { id: 'e3', category: 'equipment', title: 'Wheelchair', subtitle: 'Rent or buy' },
  { id: 'e4', category: 'equipment', title: 'Hospital bed (manual)', subtitle: 'Rent or buy', keywords: ['home bed'] },
  { id: 'e5', category: 'equipment', title: 'Walker', subtitle: 'Buy' },
  { id: 'e6', category: 'equipment', title: 'Nebulizer', subtitle: 'Buy', keywords: ['nebuliser'] },
  { id: 'e7', category: 'equipment', title: 'Blood pressure monitor', subtitle: 'Buy', keywords: ['bp'] },
  { id: 'e8', category: 'equipment', title: 'Glucose monitor', subtitle: 'Buy', keywords: ['glucometer', 'sugar'] },
  { id: 'e9', category: 'equipment', title: 'Patient monitor', subtitle: 'Rent or buy' },

  // Home care
  { id: 'c1', category: 'home-care', title: 'Private nurse at home', subtitle: 'Hourly, daily or monthly booking', keywords: ['nurse'] },
  { id: 'c2', category: 'home-care', title: 'Home nurse for oxygen and equipment support', subtitle: 'Daily or monthly booking', keywords: ['oxygen', 'nurse'] },
  { id: 'c3', category: 'home-care', title: 'Elder care attendant', subtitle: 'Daily or monthly booking', keywords: ['senior', 'caregiver'] },
  { id: 'c4', category: 'home-care', title: 'Post-surgery care at home', subtitle: 'Daily booking', keywords: ['recovery'] },
  { id: 'c5', category: 'home-care', title: 'Patient attendant', subtitle: 'Hourly or daily booking' },
  { id: 'c6', category: 'home-care', title: 'Physiotherapy at home', subtitle: 'Per-session booking', keywords: ['physio'] },
  { id: 'c7', category: 'home-care', title: 'Home doctor visit', subtitle: 'Book a doctor to visit', keywords: ['doctor at home'] },
];
