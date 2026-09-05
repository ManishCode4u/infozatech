import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";

import { NavbarTwoHeader } from "./components/ui/navbar-section-2";
import AnnouncementBar from "./components/common/AnnouncementBar";
import Footer from "./components/common/Footer";
import EmailCapturePopup from "./components/common/EmailCapturePopup";
import ScrollToTop from "./components/common/ScrollToTop";
import CookieConsent from "./components/common/CookieConsent";
import FloatingChatWidget from "./components/common/FloatingChatWidget";

// ADMIN
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotes from "./pages/admin/AdminNotes";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminVerifications from "./pages/admin/AdminVerifications";
import AdminProfile from "./pages/admin/AdminProfile";
import PublicVerification from "./pages/PublicVerification";

// HOME SECTIONS
import Home from "./pages/Home";
import WhyFounders from "./components/sections/WhyFounders";
import Feedback from "./components/sections/Feedback";
import AboutInfozaTech from "./pages/AboutInfozaTech";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import AppShowcase from "./components/sections/AppShowcase";
import Projects from "./pages/Projects";
import PortfolioPage from "./pages/PortfolioPage";
import OurTeam from "./components/sections/OurTeam";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

// OTHER PAGES
import Clients from "./pages/Clients";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import ProjectDetail from "./pages/ProjectDetail";
import Careers from "./pages/Careers"; // NEW CAREERS PAGE
import Internship from "./pages/Internship"; // VIRTUAL INTERNSHIP PAGE
import InternshipSubmission from "./pages/InternshipSubmission"; // INTERNSHIP TASK SUBMISSION CHECKLIST
import ApplyJob from "./pages/ApplyJob";

// LEGAL
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHomeRoute = location.pathname === '/';

  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    return localStorage.getItem("announcementDismissed") !== "true";
  });

  // Cleanup dark mode from html element when on public routes
  useEffect(() => {
    if (!isAdminRoute) {
      document.documentElement.classList.remove("dark");
    }
  }, [isAdminRoute]);

  return (
    <>
      <ScrollToTop />
      {/* HEADER WRAPPER */}
      {!isAdminRoute && <NavbarTwoHeader />}

      {/* GLOBAL POPUPS */}
      {!isAdminRoute && <EmailCapturePopup />}
      {!isAdminRoute && <CookieConsent />}

      {/* ROUTES */}
      <Routes>
        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="verifications" element={<AdminVerifications />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="notes" element={<AdminNotes />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* HOME (single-page layout) */}
        <Route
          path="/"
          element={
            <>
              {/* 1. Hero Section (inside Home) */}
              <Home />
              
              {/* 3. Services Section */}
              <Services />
              
              {/* 4. App Showcase Section (Below Our Process) */}
              <AppShowcase />
              
              {/* 5. Other Sections */}
              <HowItWorks />
              
              {/* 5. Projects Section (newly added) */}
              <Projects />
              
              {/* 6. Why Founders Choose InfozaTech Section */}
              <WhyFounders />
              
              {/* 7. Feedback / Testimonials */}
              <Feedback />
              
              <OurTeam />
              <FAQ />
            </>
          }
        />

        {/* INDIVIDUAL PAGES */}
        <Route path="/verify" element={<PublicVerification />} />
        <Route path="/about" element={<AboutInfozaTech />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/projects" element={<Projects page={true} />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/internship/submit" element={<InternshipSubmission />} />
        <Route path="/internship/submission" element={<InternshipSubmission />} />
        <Route path="/careers/internship" element={<Navigate to="/internship" replace />} />
        <Route path="/apply" element={<ApplyJob />} />
        <Route path="/startup-website-package" element={<Navigate to="/contact?package=startup" replace />} />

        {/* PROJECTS & BLOG */}
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* LEGAL */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

      </Routes>

      {/* GLOBAL OVERLAYS */}
      {!isAdminRoute && <FloatingChatWidget />}

      {/* CONTACT */}
      {!isAdminRoute && location.pathname !== '/contact' && <Contact />}

      {/* FOOTER */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
