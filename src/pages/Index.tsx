import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";
import { CampaignCard } from "@/components/CampaignCard";
import { Campaign } from "@/types/Campaign";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Decentralized Education Platform",
    description: "Building a platform to make education accessible to everyone through blockchain technology.",
    goal: ethers.utils.parseEther("10"),
    raised: ethers.utils.parseEther("4"),
    deadline: new Date("2024-12-31"),
    creator: "0x123...",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
  },
  {
    id: "2",
    title: "Green Energy NFT Marketplace",
    description: "Creating a marketplace for trading renewable energy certificates as NFTs.",
    goal: ethers.utils.parseEther("15"),
    raised: ethers.utils.parseEther("7.5"),
    deadline: new Date("2024-11-30"),
    creator: "0x456...",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
  },
  {
    id: "3",
    title: "Community Art Gallery",
    description: "Supporting local artists by creating a decentralized virtual art gallery.",
    goal: ethers.utils.parseEther("5"),
    raised: ethers.utils.parseEther("2.1"),
    deadline: new Date("2024-10-15"),
    creator: "0x789...",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912",
  },
];

const Index = () => {
  const { account, connectWallet, isConnecting } = useWeb3();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            CryptoFund
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/create")}
              className="bg-secondary text-white hover:bg-secondary/90"
            >
              Create Campaign
            </Button>
            {!account ? (
              <>
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
                <Button
                  onClick={() => navigate("/signin")}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Sign In
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="border-primary text-primary"
                onClick={connectWallet}
              >
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </Button>
            )}
          </div>
        </header>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Revolutionizing Crowdfunding with Blockchain</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of innovators and creators. Support groundbreaking projects or launch your own campaign with the power of blockchain technology.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </section>

        <section className="text-center py-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Campaign?</h3>
          <p className="text-gray-600 mb-6">
            Launch your project and connect with supporters worldwide.
          </p>
          <Button
            onClick={() => navigate("/create")}
            className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
          >
            Start Fundraising
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Index;