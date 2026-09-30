import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import RouteError from '@/pages/RouteError';

// Route-level code splitting: each page is its own chunk.
const SearchResultsPage = lazy(() => import('@/pages/search/SearchResultsPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const MedicinesPage = lazy(() => import('@/pages/medicines/MedicinesPage'));
const MedicineDetailPage = lazy(() => import('@/pages/medicines/MedicineDetailPage'));
const DoctorsPage = lazy(() => import('@/pages/doctors/DoctorsPage'));
const DoctorProfilePage = lazy(() => import('@/pages/doctors/DoctorProfilePage'));
const DoctorBookingPage = lazy(() => import('@/pages/doctors/DoctorBookingPage'));
const AppointmentsPage = lazy(() => import('@/pages/appointments/AppointmentsPage'));
const HospitalsPage = lazy(() => import('@/pages/hospitals/HospitalsPage'));
const HospitalBedsPage = lazy(() => import('@/pages/hospitals/HospitalBedsPage'));
const HospitalDetailPage = lazy(() => import('@/pages/hospitals/HospitalDetailPage'));
const HomeDoctorPage = lazy(() => import('@/pages/homeCare/HomeDoctorPage'));
const HomeCarePage = lazy(() => import('@/pages/homeCare/HomeCarePage'));
const CareBookingPage = lazy(() => import('@/pages/homeCare/CareBookingPage'));
const VaccinesPage = lazy(() => import('@/pages/vaccines/VaccinesPage'));
const VaccineBookingPage = lazy(() => import('@/pages/vaccines/VaccineBookingPage'));
const LabTestsPage = lazy(() => import('@/pages/labTests/LabTestsPage'));
const MedicalEquipmentPage = lazy(() => import('@/pages/equipment/MedicalEquipmentPage'));
const PrescriptionsPage = lazy(() => import('@/pages/prescriptions/PrescriptionsPage'));
const CartPage = lazy(() => import('@/pages/commerce/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/commerce/CheckoutPage'));
const OrdersPage = lazy(() => import('@/pages/commerce/OrdersPage'));
const ProfilePage = lazy(() => import('@/pages/account/ProfilePage'));
const NotificationsPage = lazy(() => import('@/pages/account/NotificationsPage'));
const DashboardSectionPage = lazy(() => import('@/pages/account/DashboardSectionPage'));
const LoginPage = lazy(() => import('@/pages/account/LoginPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          // Public
          { index: true, element: <HomePage /> },
          { path: 'search', element: <SearchResultsPage /> },
          { path: 'medicines', element: <MedicinesPage /> },
          { path: 'medicines/:id', element: <MedicineDetailPage /> },
          { path: 'doctors', element: <DoctorsPage /> },
          { path: 'doctors/:id', element: <DoctorProfilePage /> },
          { path: 'hospitals', element: <HospitalsPage /> },
          { path: 'hospitals/:id', element: <HospitalDetailPage /> },
          { path: 'hospital-beds', element: <HospitalBedsPage /> },
          { path: 'vaccines', element: <VaccinesPage /> },
          { path: 'lab-tests', element: <LabTestsPage /> },
          { path: 'home-doctor', element: <HomeDoctorPage /> },
          { path: 'home-care', element: <HomeCarePage /> },
          { path: 'medical-equipment', element: <MedicalEquipmentPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'login', element: <LoginPage /> },

          // Authenticated (mock auth)
          {
            element: <ProtectedRoute />,
            children: [
              { path: 'doctors/:id/book', element: <DoctorBookingPage /> },
              { path: 'appointments', element: <AppointmentsPage /> },
              { path: 'vaccines/:id/book', element: <VaccineBookingPage /> },
              { path: 'home-care/:id/book', element: <CareBookingPage /> },
              { path: 'prescriptions', element: <PrescriptionsPage /> },
              { path: 'checkout', element: <CheckoutPage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'notifications', element: <NotificationsPage /> },
              {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                  { index: true, element: <DashboardSectionPage /> },
                  { path: ':section', element: <DashboardSectionPage /> },
                ],
              },
            ],
          },

          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
