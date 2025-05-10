
import { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import { mockUsers } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MessageSquarePlus, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AppLayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

const AppLayout = ({ children, isAuthenticated = false }: AppLayoutProps) => {
  const currentUser = isAuthenticated ? mockUsers[0] : undefined;
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    // In a real application, we would clear auth tokens here
    console.log('User logged out');
    // Redirect to login page would happen here
    window.location.href = '/login';
  };

  const handleContactClick = () => {
    toast.success("Contact request received", {
      description: "Our team will get back to you shortly!",
      duration: 5000,
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed!", {
        description: "You'll now receive updates on new features and tips.",
        duration: 5000,
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  // Show welcome toast for new visitors
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (showWelcomeMessage && !hasSeenWelcome && !isAuthenticated) {
      setTimeout(() => {
        toast("👋 Welcome to DivideShare!", {
          description: "The easiest way to split expenses with friends and family.",
          duration: 6000,
          action: {
            label: "Learn More",
            onClick: () => window.location.href = '/features',
          },
        });
        localStorage.setItem('hasSeenWelcome', 'true');
        setShowWelcomeMessage(false);
      }, 1500);
    }
  }, [isAuthenticated, showWelcomeMessage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isAuthenticated={isAuthenticated}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Floating contact button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={handleContactClick}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageSquarePlus className="h-6 w-6" />
          <span className="sr-only">Contact Support</span>
        </Button>
      </div>
      
      {/* Newsletter subscription - only show on homepage and when not authenticated */}
      {window.location.pathname === '/' && !isAuthenticated && (
        <div className="bg-primary/5 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tighter">Stay updated with DivideShare</h2>
              <p className="max-w-[600px] text-muted-foreground">
                Subscribe to our newsletter for tips on expense management, feature updates, and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <footer className="border-t py-6 bg-muted/40">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 md:px-6 text-sm text-muted-foreground">
          <div className="flex gap-4 mb-2">
            <a href="/features" className="hover:text-primary transition-colors">Features</a>
            <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" onClick={handleContactClick} className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p>© 2025 DivideShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
