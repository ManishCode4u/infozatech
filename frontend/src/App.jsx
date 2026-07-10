import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";

import Navbar from "./components/common/Navbar";
import { Header } from "./components/ui/header-1";
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

  const [isAtTop, setIsAtTop] = useState(true);
  const [showHomeHeader, setShowHomeHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
      setShowHomeHeader(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup dark mode from html element when on public routes
  useEffect(() => {
    if (!isAdminRoute) {
      document.documentElement.classList.remove("dark");
    }
  }, [isAdminRoute]);

  // Disable Lenis smooth scroll to avoid scroll-locking and touch-interactivity issues
  /*
  useEffect(() => {
    // Only initialize Lenis on desktop / non-touch devices
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.innerWidth < 1024;

    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  */

  return (
    <>
      <ScrollToTop />
      {/* HEADER WRAPPER (ANNOUNCEMENT + NAVBAR) */}
      {!isAdminRoute ? (
        isHomeRoute ? (
          /* Home page: original behavior (hidden on lg+ desktop) */
          <>
            <div className="fixed top-0 left-0 right-0 z-[1000] flex flex-col bg-white transition-all duration-300 lg:hidden">
              {showAnnouncement && <AnnouncementBar isAtTop={isAtTop} isHome={true} onClose={() => setShowAnnouncement(false)} />}
              <Navbar />
            </div>
            {/* Desktop Home Page: Render new Header when scrolled down */}
            {showHomeHeader && (
              <div className="hidden lg:block">
                <Header />
              </div>
            )}
          </>
        ) : (
          /* Other pages: new Header on desktop (md+), original Navbar on mobile (<md) */
          <>
            <div className="md:hidden fixed top-0 left-0 right-0 z-[1000] flex flex-col bg-white">
              {showAnnouncement && <AnnouncementBar isAtTop={isAtTop} isHome={false} onClose={() => setShowAnnouncement(false)} />}
              <Navbar />
            </div>
            <div className="hidden md:block">
              <Header />
            </div>
          </>
        )
      ) : null}

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
          <Route path="leads" element={<AdminLeads />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="notes" element={<AdminNotes />} />
          <Route path="applications" element={<AdminApplications />} />
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
        <Route path="/about" element={<AboutInfozaTech />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/projects" element={<Projects page={true} />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/careers" element={<Careers />} />
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
