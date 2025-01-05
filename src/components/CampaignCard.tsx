import { Campaign } from "@/types/Campaign";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";
import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  campaign: Campaign;
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const { account } = useWeb3();
  const navigate = useNavigate();
  const [isContributing, setIsContributing] = useState(false);
  const progress = (Number(ethers.utils.formatEther(campaign.raised)) / Number(ethers.utils.formatEther(campaign.goal))) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)));

  const handleContribute = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <Card 
      className="w-full max-w-sm transition-transform duration-200 hover:scale-105 animate-fade-in cursor-pointer"
      onClick={() => navigate(`/campaign/${campaign.id}`)}
    >
      <CardHeader>
        <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-48 object-cover rounded-t-lg" />
        <CardTitle className="mt-4">{campaign.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>{ethers.utils.formatEther(campaign.raised)} ETH raised</span>
            <span>{daysLeft} days left</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          onClick={handleContribute}
          disabled={isContributing}
        >
          {isContributing ? "Contributing..." : "Contribute"}
        </Button>
      </CardFooter>
    </Card>
  );
};