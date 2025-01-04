import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useWeb3 } from "@/contexts/Web3Context";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  goal: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Goal must be a positive number"),
  deadline: z.string().refine((val) => new Date(val) > new Date(), "Deadline must be in the future"),
  imageUrl: z.string().url("Please enter a valid image URL"),
});

export function CreateCampaignForm() {
  const navigate = useNavigate();
  const { account } = useWeb3();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      goal: "",
      deadline: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Here you would typically interact with your smart contract
      // For now, we'll just show a success message and redirect
      const campaign = {
        id: Date.now().toString(),
        ...values,
        goal: ethers.utils.parseEther(values.goal),
        raised: ethers.utils.parseEther("0"),
        deadline: new Date(values.deadline),
        creator: account || "0x0",
      };
      
      toast.success("Campaign created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create campaign");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter campaign title" {...field} />
              </FormControl>
              <FormDescription>
                Give your campaign a catchy title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your campaign" {...field} />
              </FormControl>
              <FormDescription>
                Explain what your campaign is about and why people should contribute
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Goal (ETH)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Enter amount in ETH" {...field} />
              </FormControl>
              <FormDescription>
                How much ETH do you want to raise?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                When should your campaign end?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormDescription>
                Add an image that represents your campaign
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Campaign</Button>
      </form>
    </Form>
  );
}