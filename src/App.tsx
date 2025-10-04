import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CampusLife from "./pages/CampusLife";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";
import Intake from "./pages/Intake";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/intake" element={<Intake />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
