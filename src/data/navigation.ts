import {
  Home, Pill, Stethoscope, Building2, FlaskConical, HeartHandshake, Syringe, Accessibility, LayoutGrid, User as UserIcon,
  ClipboardList, CalendarDays, FileText, Bookmark, MapPin, CreditCard, Bell, Package, BedDouble, House,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/', icon: Home, end: true },
  { label: 'Medicines', to: '/medicines', icon: Pill },
  { label: 'Doctors', to: '/doctors', icon: Stethoscope },
  { label: 'Hospitals', to: '/hospitals', icon: Building2 },
  { label: 'Lab Tests', to: '/lab-tests', icon: FlaskConical },
  { label: 'Home Care', to: '/home-care', icon: HeartHandshake },
  { label: 'Vaccines', to: '/vaccines', icon: Syringe },
  { label: 'Medical Equipment', to: '/medical-equipment', icon: Accessibility },
];

/** Extra entries shown only in the mobile menu. */
export const mobileExtraNav: NavItem[] = [
  { label: 'Hospital Beds', to: '/hospital-beds', icon: BedDouble },
  { label: 'Home Doctor', to: '/home-doctor', icon: House },
  { label: 'Prescriptions', to: '/prescriptions', icon: FileText },
  { label: 'My Orders', to: '/orders', icon: Package },
  { label: 'My Appointments', to: '/appointments', icon: CalendarDays },
];

export const bottomNav: NavItem[] = [
  { label: 'Home', to: '/', icon: Home, end: true },
  { label: 'Medicines', to: '/medicines', icon: Pill },
  { label: 'Doctors', to: '/doctors', icon: Stethoscope },
  { label: 'Account', to: '/dashboard', icon: UserIcon },
];

export interface DashboardSection {
  slug: string; // '' = overview
  label: string;
  description: string;
  icon: LucideIcon;
}

export const dashboardSections: DashboardSection[] = [
  { slug: '', label: 'Overview', description: 'A summary of your orders, appointments and bookings.', icon: LayoutGrid },
  { slug: 'profile', label: 'Profile', description: 'Manage your personal details.', icon: UserIcon },
  { slug: 'orders', label: 'Orders', description: 'Track and review your medicine and equipment orders.', icon: Package },
  { slug: 'appointments', label: 'Appointments', description: 'View and manage your doctor appointments.', icon: CalendarDays },
  { slug: 'prescriptions', label: 'Prescriptions', description: 'Uploaded prescriptions you can use while ordering.', icon: ClipboardList },
  { slug: 'healthcare-bookings', label: 'Healthcare bookings', description: 'Lab tests, vaccinations and other bookings.', icon: FileText },
  { slug: 'home-care-bookings', label: 'Home care bookings', description: 'Nurse, caregiver and home visit bookings.', icon: HeartHandshake },
  { slug: 'saved-doctors', label: 'Saved doctors', description: 'Doctors you have saved for quick booking.', icon: Bookmark },
  { slug: 'saved-hospitals', label: 'Saved hospitals', description: 'Hospitals you have saved.', icon: Building2 },
  { slug: 'addresses', label: 'Addresses', description: 'Delivery and visit addresses.', icon: MapPin },
  { slug: 'payment-methods', label: 'Payment methods', description: 'Saved payment options (demo only).', icon: CreditCard },
  { slug: 'notifications', label: 'Notifications', description: 'Reminders and updates.', icon: Bell },
];

export interface FooterGroup {
  title: string;
  links: { label: string; to: string }[];
}

export const footerGroups: FooterGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Healthcare',
    links: [
      { label: 'Medicines', to: '/medicines' },
      { label: 'Doctors', to: '/doctors' },
      { label: 'Hospitals', to: '/hospitals' },
      { label: 'Lab Tests', to: '/lab-tests' },
      { label: 'Home Care', to: '/home-care' },
      { label: 'Vaccines', to: '/vaccines' },
      { label: 'Medical Equipment', to: '/medical-equipment' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/help' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Refund Policy', to: '/refund-policy' },
      { label: 'Shipping Policy', to: '/shipping-policy' },
    ],
  },
];
