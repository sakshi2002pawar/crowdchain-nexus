import { CreateCampaignForm } from "@/components/CreateCampaignForm";
import { useWeb3 } from "@/contexts/Web3Context";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const CreateCampaign = () => {
  const { account } = useWeb3();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in first");
      navigate("/signin");
      return;
    }
    
    if (!account) {
      toast.error("Please connect your wallet first");
      navigate("/home");
    }
  }, [account, navigate, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
          <CreateCampaignForm />
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;