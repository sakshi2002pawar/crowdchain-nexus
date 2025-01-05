import { Campaign } from "@/types/Campaign";
import { ethers } from "ethers";

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Decentralized Education Platform",
    description: "Building a platform to make education accessible to everyone through blockchain technology. Our mission is to democratize education by leveraging blockchain technology to create a transparent, accessible, and efficient learning ecosystem.",
    goal: ethers.utils.parseEther("10"),
    raised: ethers.utils.parseEther("4"),
    deadline: new Date("2024-12-31"),
    creator: "0x123...",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
  },
  {
    id: "2",
    title: "Green Energy NFT Marketplace",
    description: "Creating a marketplace for trading renewable energy certificates as NFTs. This platform will incentivize green energy production and make it easier for consumers to support renewable energy initiatives.",
    goal: ethers.utils.parseEther("15"),
    raised: ethers.utils.parseEther("7.5"),
    deadline: new Date("2024-11-30"),
    creator: "0x456...",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
  },
  {
    id: "3",
    title: "Community Art Gallery",
    description: "Supporting local artists by creating a decentralized virtual art gallery. This platform will provide artists with new opportunities to showcase and sell their work while building a vibrant digital art community.",
    goal: ethers.utils.parseEther("5"),
    raised: ethers.utils.parseEther("2.1"),
    deadline: new Date("2024-10-15"),
    creator: "0x789...",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912",
  },
];