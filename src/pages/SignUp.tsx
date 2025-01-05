import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle user registration
    toast.success("Account created successfully!");
    navigate("/home"); // Redirect to home page after signup
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <BackButton />
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Enter your full name" 
              required 
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password" 
              required 
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Sign Up
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-primary hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;