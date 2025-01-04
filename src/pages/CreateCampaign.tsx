import { CreateCampaignForm } from "@/components/CreateCampaignForm";
import { useWeb3 } from "@/contexts/Web3Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const CreateCampaign = () => {
  const { account } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      toast.error("Please connect your wallet first");
      navigate("/");
    }
  }, [account, navigate]);

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