import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeb3 } from "@/contexts/Web3Context";
import { ethers } from "ethers";
import { toast } from "sonner";
import { mockCampaigns } from "@/data/mockCampaigns";
import { BackButton } from "@/components/BackButton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContributePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, provider } = useWeb3();
  const [amount, setAmount] = useState("");
  const [isContributing, setIsContributing] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const campaign = mockCampaigns.find(c => c.id === id);

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !provider) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsContributing(true);
    try {
      // Get the signer from provider
      const signer = provider.getSigner();
      
      // Create transaction object
      const tx = await signer.sendTransaction({
        to: campaign.creator,
        value: ethers.utils.parseEther(amount),
        gasLimit: 21000, // Basic ETH transfer gas limit
      });

      // Show pending transaction notification
      toast.loading("Transaction pending...", {
        id: "contribution",
      });

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      setTransactionHash(receipt.transactionHash);

      // Update toast with success message
      toast.success("Contribution successful!", {
        id: "contribution",
      });

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate(`/campaign/${id}`);
      }, 2000);
    } catch (error: any) {
      console.error("Error contributing:", error);
      toast.error(error.message || "Failed to contribute");
    } finally {
      setIsContributing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8">
        <BackButton />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Contribute to {campaign.title}</h1>
          
          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Campaign Details</h2>
              <p className="text-gray-600">{campaign.description}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Current: {ethers.utils.formatEther(campaign.raised)} ETH
              </p>
              <p className="text-sm text-gray-600">
                Goal: {ethers.utils.formatEther(campaign.goal)} ETH
              </p>
            </div>

            {transactionHash && (
              <Alert className="mb-6">
                <AlertDescription>
                  Transaction successful! Hash: {transactionHash.slice(0, 10)}...
                  {transactionHash.slice(-8)}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleContribute} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Amount (ETH)
                </label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in ETH"
                  className="w-full"
                  disabled={isContributing}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                disabled={isContributing}
              >
                {isContributing ? "Processing Transaction..." : "Contribute"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;