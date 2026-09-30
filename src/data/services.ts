import { Pill, Stethoscope, BedDouble, Syringe, FlaskConical, House, HeartPulse, Wind, type LucideIcon } from 'lucide-react';

export interface QuickService {
  title: string;
  description: string;
  cta: string;
  to: string;
  icon: LucideIcon;
}

export const quickServices: QuickService[] = [
  { title: 'Medicines', description: 'Order medicines and healthcare products, and upload a prescription where one is needed.', cta: 'Order medicines', to: '/medicines', icon: Pill },
  { title: 'Find a Doctor', description: 'Search by specialisation and book online, clinic or home consultations.', cta: 'Find a doctor', to: '/doctors', icon: Stethoscope },
  { title: 'Hospital Beds', description: 'Check bed availability by type at hospitals near you.', cta: 'Check beds', to: '/hospital-beds', icon: BedDouble },
  { title: 'Vaccines', description: 'See which vaccines are available and book a slot at a centre.', cta: 'Book a vaccine', to: '/vaccines', icon: Syringe },
  { title: 'Lab Tests', description: 'Book individual tests or health packages, with home sample collection.', cta: 'Book a test', to: '/lab-tests', icon: FlaskConical },
  { title: 'Home Doctor', description: 'Request a doctor to visit you at home on a date and time you choose.', cta: 'Book a home visit', to: '/home-doctor', icon: House },
  { title: 'Home Nurse', description: 'Book private nurses, caregivers and physiotherapy at home.', cta: 'Book care', to: '/home-care', icon: HeartPulse },
  { title: 'Oxygen & Equipment', description: 'Rent or buy oxygen cylinders, concentrators and other medical equipment.', cta: 'Browse equipment', to: '/medical-equipment', icon: Wind },
];
