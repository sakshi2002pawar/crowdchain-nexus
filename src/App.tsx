import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Web3Provider } from "./contexts/Web3Context";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import Index from "./pages/Index";
import CreateCampaign from "./pages/CreateCampaign";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CampaignDetails from "./pages/CampaignDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Web3Provider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/home" 
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <PrivateRoute>
                    <CreateCampaign />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/campaign/:id" 
                element={
                  <PrivateRoute>
                    <CampaignDetails />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </TooltipProvider>
        </Web3Provider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;