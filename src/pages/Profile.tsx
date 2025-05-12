import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import axiosInstance from '@/lib/axios';

const Profile = () => {
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/users/me');
        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar || '');
      } catch (error) {
        toast({
          title: 'Failed to load profile',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await axiosInstance.patch('/users/me', { name, email });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: 'An error occurred while updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout isAuthenticated={true}>
        <div className="container py-10 text-center text-xl">Loading...</div>
      </AppLayout>
    );
  }

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
                      <AvatarFallback className="text-lg">
                        {getInitials(name)}
                      </AvatarFallback>
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
                        onChange={() =>
                          console.log('Avatar upload not implemented')
                        }
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
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? 'Saving...' : 'Save Changes'}
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
                      onClick={() => console.log('Change password')}
                    >
                      Change Password
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div>
                        <h3 className="font-medium text-red-600">
                          Danger Zone
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Delete your account and all your data
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => console.log('Delete account')}
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
