
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout isAuthenticated={false}>
      <div className="relative overflow-hidden pb-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-muted/30 dark:from-background dark:to-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Split Expenses <span className="text-primary">Without the Stress</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  DivideShare makes it simple to track shared expenses, manage IOUs, and settle up with friends, roommates, and travel companions.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="animate-slide-in">Get Started Free</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground mt-2 mb-8">Split expenses in three easy steps</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Add Expenses</h3>
                <p className="text-muted-foreground">
                  Easily record expenses as they happen. Just enter what you spent and who was involved.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Split with Friends</h3>
                <p className="text-muted-foreground">
                  Create groups for trips, roommates, or events. Invite members and share expenses easily.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Settle Up</h3>
                <p className="text-muted-foreground">
                  See who owes what at a glance. Settle debts with ease and track who has paid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-12 md:py-20 bg-muted/30 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">What Our Users Say</h2>
              <p className="text-muted-foreground mt-2">People love how simple it is to split bills with DivideShare</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Jane Doe</h4>
                    <p className="text-sm text-muted-foreground">Roommate</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "DivideShare solved all our roommate bill-splitting problems. Now we can see exactly who owes what with no awkward conversations."
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">MS</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Mark Smith</h4>
                    <p className="text-sm text-muted-foreground">Traveler</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Used this for our group trip to Europe and it was a lifesaver. We could all see our expenses in real-time and settle up easily."
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm lg:col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">LJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Lisa Johnson</h4>
                    <p className="text-sm text-muted-foreground">Event Planner</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Perfect for organizing group events. I use it for every gathering to make sure everyone pays their fair share without any hassle."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to start splitting expenses?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
                  Join thousands of users who are already enjoying stress-free expense sharing.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg">Sign Up For Free</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
