import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export const Header = ({ isAuthenticated, userName, userAvatar, onLogout }: HeaderProps) => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    if (onLogout) onLogout();
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    // Close the mobile menu
    setIsMenuOpen(false);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string = "User") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/groups" className="text-sm font-medium hover:text-primary transition-colors">
                Groups
              </Link>
              <Link to="/add-expense" className="text-sm font-medium hover:text-primary transition-colors">
                Add Expense
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link to="/profile">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </div>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/features" 
                    className="text-base font-medium p-2 hover:bg-secondary/20 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="text-base font-medium p-2 hover:bg-secondary/20 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </div>
                
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{userName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link 
                        to="/dashboard" 
                        className="text-base font-medium p-2 hover:bg-secondary/20 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/groups" 
                        className="text-base font-medium p-2 hover:bg-secondary/20 rounded-md" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Groups
                      </Link>
                      <Link 
                        to="/add-expense" 
                        className="text-base font-medium p-2 hover:bg-secondary/20 rounded-md" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Expense
                      </Link>
                      <Link 
                        to="/profile" 
                        className="text-base font-medium p-2 hover:bg-secondary/20 rounded-md" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Button variant="outline" onClick={handleLogout} className="mt-4">
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link 
                      to="/login" 
                      className="w-full" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link 
                      to="/register" 
                      className="w-full" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
