
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentRegister from "./pages/StudentRegister.tsx";
import CounselorRegister from "./pages/CounselorRegister.tsx";
import AdminRegister from "./pages/AdminRegister.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import CounselorDashboard from "./pages/CounselorDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/register/counselor" element={<CounselorRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/counselor" element={<CounselorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
