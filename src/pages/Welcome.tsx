import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80')",
            opacity: 0.3
          }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-6 animate-fade-in">
            Welcome to CryptoFund
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl animate-fade-in">
            Join our decentralized crowdfunding platform and be part of the future of fundraising.
            Support innovative projects or launch your own campaign with the power of blockchain technology.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full animate-fade-in">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80" 
                  alt="Creator" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">For Creators</h3>
                <p className="text-gray-600 mb-4">
                  Launch your campaign and connect with supporters worldwide.
                </p>
              </div>
              <Button
                onClick={() => navigate("/signup")}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
              >
                Start Your Campaign
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80" 
                  alt="Supporter" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">For Supporters</h3>
                <p className="text-gray-600 mb-4">
                  Discover and support innovative projects with secure blockchain transactions.
                </p>
              </div>
              <Button
                onClick={() => navigate("/signin")}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
              >
                Browse Projects
              </Button>
            </div>
          </div>

          <div className="mt-12 space-y-4 animate-fade-in">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/signin")}
                className="bg-primary text-white px-8"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                variant="outline"
                className="px-8"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;