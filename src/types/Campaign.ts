export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  deadline: Date;
  creator: string;
  imageUrl: string;
}