import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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

          {/* ADMIN PROTECTED (placeholder for now) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div className="p-10 text-xl font-bold">
                  Admin Dashboard (Coming Soon)
                </div>
              </AdminRoute>
            }
          />

        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
