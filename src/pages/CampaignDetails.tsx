import { useParams } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "sonner";
import { mockCampaigns } from "@/data/mockCampaigns";

const CampaignDetails = () => {
  const { id } = useParams();
  const { account } = useWeb3();
  const [isContributing, setIsContributing] = useState(false);
  
  const campaign = mockCampaigns.find(c => c.id === id);
  
  if (!campaign) {
    return (
      <div className="container px-4 py-8">
        <BackButton />
        <div>Campaign not found</div>
      </div>
    );
  }

  const progress = (Number(ethers.utils.formatEther(campaign.raised)) / Number(ethers.utils.formatEther(campaign.goal))) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)));

  const handleContribute = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsContributing(true);
    try {
      // TODO: Implement actual contribution logic with smart contract
      toast.success("Contribution successful!");
    } catch (error) {
      console.error("Error contributing:", error);
      toast.error("Failed to contribute");
    } finally {
      setIsContributing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <img 
            src={campaign.imageUrl} 
            alt={campaign.title} 
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          
          <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
          
          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <p className="text-lg text-gray-700 mb-6">{campaign.description}</p>
            
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{ethers.utils.formatEther(campaign.raised)} ETH raised</span>
                <span className="font-semibold">Goal: {ethers.utils.formatEther(campaign.goal)} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Created by: {campaign.creator}</span>
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 py-6 text-lg"
            onClick={handleContribute}
            disabled={isContributing}
          >
            {isContributing ? "Contributing..." : "Contribute to this Campaign"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;