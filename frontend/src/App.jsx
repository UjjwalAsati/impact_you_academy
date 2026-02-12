import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Page Imports
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import StaffingTrainingPage from './pages/StaffingTrainingPage'; 
import CurriculumPage from './pages/CurriculumPage';
import PracticalTrainingPage from './pages/PracticalTrainingPage';
import CertificationPage from './pages/CertificationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

// Policy Pages (For Razorpay)
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';

// Dashboard & Admin Imports
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import AdminHome from "./pages/admin/AdminHome";
import AdminInquiries from "./pages/admin/AdminInquiries";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// --- LAYOUT COMPONENT ---
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is always visible */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Footer HIDDEN only on Admin Routes to prevent overlap */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollHandler/>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/staffing-training" element={<StaffingTrainingPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/practical-training" element={<PracticalTrainingPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            
            {/* Policy Routes (Razorpay Mandatory) */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            {/* USER PROTECTED */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* ADMIN PROTECTED */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="programs" element={<AdminPrograms />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="enrollments" element={<AdminEnrollments />} />
              <Route path="inquiries" element={<AdminInquiries />} />
            </Route>
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;