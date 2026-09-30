import { Pill, Stethoscope, Building2, FlaskConical, Syringe, Accessibility, HeartHandshake, type LucideIcon } from 'lucide-react';
import type { SearchCategory } from '@/types/search';

export const categoryIcons: Record<SearchCategory, LucideIcon> = {
  medicines: Pill,
  doctors: Stethoscope,
  hospitals: Building2,
  'lab-tests': FlaskConical,
  vaccines: Syringe,
  equipment: Accessibility,
  'home-care': HeartHandshake,
};
