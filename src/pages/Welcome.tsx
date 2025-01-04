import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="text-center space-y-8 p-8 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Welcome to CryptoFund
        </h1>
        <p className="text-gray-600 text-lg">
          Join our decentralized crowdfunding platform and be part of the future of fundraising.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate("/signin")}
            className="bg-primary text-white px-8 py-2 text-lg"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            variant="outline"
            className="px-8 py-2 text-lg"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;