<<<<<<< HEAD
import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageLoader from './components/PageLoader';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuth } from './contexts/AuthContext';

// Lazy load dos componentes de página com os nomes de arquivo corretos
const Home = lazy(() => import("./pages/Home"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePasswordPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const NotFound = lazy(() => import("./pages/NotFound"));

const AppContent: React.FC = () => {
  const { isLoading: authIsLoading } = useAuth();

  if (authIsLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="eventos/:eventId" element={<EventDetailPage />} />
          <Route path="calendario" element={<CalendarPage />} />
          <Route path="noticias" element={<NewsPage />} />
          <Route path="noticias/:newsId" element={<NewsDetailPage />} />
          <Route path="contato" element={<ContactPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="perfil" element={<UserProfilePage />} />
            <Route path="perfil/alterar-senha" element={<ChangePasswordPage />} />
            <Route element={<AdminRoute />}>
              <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </TooltipProvider>
=======

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Calendar from "./pages/Calendar";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/eventos" element={<Layout><Events /></Layout>} />
          <Route path="/calendario" element={<Layout><Calendar /></Layout>} />
          <Route path="/noticias" element={<Layout><News /></Layout>} />
          <Route path="/contatos" element={<Layout showSidebar={false}><Contact /></Layout>} />
          <Route path="*" element={<Layout showSidebar={false}><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
);

export default App;
