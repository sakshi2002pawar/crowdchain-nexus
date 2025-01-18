import { BigNumber } from "ethers";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: BigNumber;
  raised: BigNumber;
  deadline: Date;
  creator: string;
  imageUrl: string;
  updates?: CampaignUpdate[];
}

export interface CampaignUpdate {
  id: string;
  campaignId: string;
  message: string;
  timestamp: Date;
  creator: string;
}