import "./App.css";
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import CurriculumPage from './pages/CurriculumPage';
import PracticalTrainingPage from './pages/PracticalTrainingPage';
import CertificationPage from './pages/CertificationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import AdminHome from "./pages/admin/AdminHome";
import AdminInquiries from "./pages/admin/AdminInquiries";
import UserDashboard from "./pages/dashboard/UserDashboard";

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollHandler/>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/practical-training" element={<PracticalTrainingPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />

                  {/* USER PROTECTED */}
          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <ProgramsPage />
              </ProtectedRoute>
            }
          />
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />


          {/* ADMIN PROTECTED (placeholder for now) */}
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
        <Footer />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
