import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";
import { CampaignCard } from "@/components/CampaignCard";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { mockCampaigns } from "@/data/mockCampaigns";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { account, connectWallet, isConnecting } = useWeb3();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8">
        <BackButton />
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
                {isAuthenticated ? (
                  <Button
                    onClick={logout}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/signin")}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Sign In
                  </Button>
                )}
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
          <h2 className="text-3xl font-bold mb-4">Welcome {user?.name ? `, ${user.name}!` : ''}</h2>
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