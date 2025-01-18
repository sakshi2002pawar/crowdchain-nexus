import { useWeb3 } from "@/contexts/Web3Context";
import { useAuth } from "@/contexts/AuthContext";
import { mockCampaigns } from "@/data/mockCampaigns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ethers } from "ethers";
import { CampaignCard } from "@/components/CampaignCard";

const UserProfile = () => {
  const { account } = useWeb3();
  const { user } = useAuth();

  // Filter campaigns created by the user
  const userCampaigns = mockCampaigns.filter(
    campaign => campaign.creator === account
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Connected Wallet</p>
                  <p className="font-medium">{account || "Not connected"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email || "Not available"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Campaigns Created</p>
                  <p className="font-medium">{userCampaigns.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Funds Raised</p>
                  <p className="font-medium">
                    {ethers.utils.formatEther(
                      userCampaigns.reduce(
                        (acc, campaign) => acc.add(campaign.raised),
                        ethers.utils.parseEther("0")
                      )
                    )} ETH
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
            {userCampaigns.length === 0 && (
              <p className="text-gray-500">No campaigns created yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;