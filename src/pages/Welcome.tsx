import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4">
          Welcome to CryptoFund
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Join our decentralized crowdfunding platform and be part of the future of fundraising.
          Support innovative projects or launch your own campaign with the power of blockchain technology.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 max-w-lg mx-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Creators</h3>
            <p className="text-gray-600 text-sm">
              Launch your campaign and connect with supporters worldwide.
            </p>
            <Button
              onClick={() => navigate("/signup")}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
            >
              Start Your Campaign
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Supporters</h3>
            <p className="text-gray-600 text-sm">
              Discover and support innovative projects with secure blockchain transactions.
            </p>
            <Button
              onClick={() => navigate("/signin")}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              Browse Projects
            </Button>
          </div>
        </div>

        <div className="pt-12 space-y-4">
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
  );
};

export default Welcome;