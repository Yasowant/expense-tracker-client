
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const currentUser = mockUsers[0]; // In a real app, this would come from auth context
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call to update the user profile
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout isAuthenticated={true}>
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col items-center gap-4 mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatar} alt={name} />
                      <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Label 
                        htmlFor="avatar-upload" 
                        className="cursor-pointer text-primary hover:underline"
                      >
                        Change avatar
                      </Label>
                      <Input 
                        id="avatar-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={() => console.log("Avatar upload not implemented")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Update your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Change your password
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => console.log("Change password")}
                    >
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div>
                        <h3 className="font-medium text-red-600">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground">
                          Delete your account and all your data
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={() => console.log("Delete account")}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
