import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Features = () => {
  return (
    <AppLayout isAuthenticated={false}>
      <div className="container py-12 md:py-24 px-4 md:px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful features to make expense sharing simple
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            DivideShare is designed to make splitting expenses with friends, roommates, and groups effortless.
          </p>
        </div>
        
        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Intuitive Expense Tracking</h3>
            <p className="text-muted-foreground">
              Easily add expenses in seconds. Specify who paid, how much, and how to split the bill among group members. Categorize expenses for better tracking.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Group Management</h3>
            <p className="text-muted-foreground">
              Create unlimited groups for different purposes - roommates, trips, events. Invite friends with a simple link and manage group settings with ease.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Smart Balance Calculation</h3>
            <p className="text-muted-foreground">
              Automatically calculates the optimal way to settle debts, minimizing the number of transactions needed between group members.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Multiple Split Options</h3>
            <p className="text-muted-foreground">
              Split bills equally, by percentage, by specific amounts, by shares, or using custom formulas. Handles complex splitting scenarios with ease.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="m9 11-6 6v3h9l3-3" />
                <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Receipt Scanning</h3>
            <p className="text-muted-foreground">
              Take a photo of your receipt and let AI extract expense details automatically. Save time on data entry and improve expense accuracy.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Expense Analytics</h3>
            <p className="text-muted-foreground">
              Visualize spending patterns with interactive charts and reports. Track expenses by category, group, time period, or custom filters.
            </p>
          </div>

          {/* NEW Feature 7 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Payment Protection</h3>
            <p className="text-muted-foreground">
              Securely settle debts through the app using various payment methods. All transactions are encrypted and protected for your peace of mind.
            </p>
          </div>

          {/* NEW Feature 8 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="m8 2 1.5 1.5" />
                <path d="M12 2v1.5" />
                <path d="m16 2-1.5 1.5" />
                <path d="M5 7.8C4.4 8.8 4 10 4 12c0 3.5 2.5 6.5 6 7.5s6.5-1 7.5-3" />
                <path d="M19.5 14.5 18 16" />
                <path d="M17 18.5 15.5 17" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Currency Conversion</h3>
            <p className="text-muted-foreground">
              Handle expenses in multiple currencies with automatic conversion at current exchange rates. Perfect for international trips and remote teams.
            </p>
          </div>

          {/* NEW Feature 9 */}
          <div className="flex flex-col space-y-3 p-6 bg-card rounded-lg border shadow-sm">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Expense Sharing Links</h3>
            <p className="text-muted-foreground">
              Share expense details with anyone via unique links, even if they don't have an account. Perfect for one-time group expenses.
            </p>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="py-12 mb-16 bg-muted/30 rounded-lg px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tighter mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does DivideShare calculate who owes what?</AccordionTrigger>
                <AccordionContent>
                  DivideShare uses smart debt simplification algorithms to minimize the number of transactions needed. 
                  After expenses are entered, our system calculates the optimal repayment plan automatically, 
                  showing who needs to pay whom and exactly how much.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I use DivideShare for both personal and business expenses?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! DivideShare works great for both personal and business expense tracking. 
                  Our Business plan includes additional features like expense approval workflows, 
                  receipt management, and detailed reporting for professional use.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a limit to how many groups I can create?</AccordionTrigger>
                <AccordionContent>
                  Free accounts can create up to 5 active groups, while paid plans allow unlimited groups. 
                  Each group can have up to 100 members on the Standard plan and unlimited members on the Pro and 
                  Business plans.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How secure is my financial information in DivideShare?</AccordionTrigger>
                <AccordionContent>
                  We take security seriously. DivideShare uses bank-level encryption for all financial data, 
                  and we never store complete payment details on our servers. We're also fully compliant with 
                  GDPR and other privacy regulations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I split expenses with people who don't have DivideShare accounts?</AccordionTrigger>
                <AccordionContent>
                  Yes! Using our unique expense sharing links, you can share expense details with anyone, 
                  even if they don't have an account. They'll be able to see what they owe without signing up, 
                  making it perfect for one-time group expenses.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="py-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-muted rounded-lg border text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to simplify expense sharing?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join thousands of users who are already enjoying stress-free expense splitting with DivideShare.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg">Sign Up Free</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-muted/30 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Loved by thousands</h2>
            <p className="text-muted-foreground mt-2">See what our users have to say about DivideShare</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">JS</span>
                </div>
                <div>
                  <h4 className="font-medium">John S.</h4>
                  <p className="text-sm text-muted-foreground">Travel Enthusiast</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "DivideShare completely changed how we handle expenses on our group trips. No more spreadsheets or awkward money conversations!"
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">AR</span>
                </div>
                <div>
                  <h4 className="font-medium">Amy R.</h4>
                  <p className="text-sm text-muted-foreground">Apartment Renter</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Managing bills with roommates used to be a nightmare. Now we just add expenses as they happen and everyone knows exactly what they owe."
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">TK</span>
                </div>
                <div>
                  <h4 className="font-medium">Tom K.</h4>
                  <p className="text-sm text-muted-foreground">Small Business Owner</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I use the Business plan to manage team expenses. The reporting features and approval workflows save us hours every month."
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Features;
