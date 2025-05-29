
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
);

export default App;
