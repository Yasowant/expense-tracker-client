
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <AppLayout isAuthenticated={false}>
      <div className="container py-12 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect plan for your needs. Always know what you'll pay.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {/* Free Plan */}
          <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div>
              <h3 className="font-semibold">Free</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-100">
                <span className="text-3xl font-bold tracking-tight">$0</span>
                <span className="ml-1 text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Perfect for individuals and small groups just starting out.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Up to 5 groups</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Basic expense tracking</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Simple settlement</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link to="/register">
                <Button className="w-full" variant="outline">Get Started</Button>
              </Link>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="flex flex-col justify-between rounded-lg border bg-primary p-6 text-primary-foreground shadow-lg relative">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-accent py-1 text-center text-xs font-medium text-accent-foreground">
              Most Popular
            </div>
            <div>
              <h3 className="font-semibold">Pro</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold tracking-tight">$9</span>
                <span className="ml-1 text-sm opacity-70">/month</span>
              </div>
              <p className="mt-4 text-sm opacity-90">
                For friend groups and roommates with frequent expenses.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm">Unlimited groups</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm">Advanced expense categories</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm">Expense history & analytics</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm">Payment reminders</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 text-sm">Receipt scanning</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link to="/register">
                <Button className="w-full bg-background text-primary hover:bg-background/90">Subscribe</Button>
              </Link>
            </div>
          </div>
          
          {/* Business Plan */}
          <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div>
              <h3 className="font-semibold">Business</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-100">
                <span className="text-3xl font-bold tracking-tight">$19</span>
                <span className="ml-1 text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                For teams and businesses with complex expense management needs.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Everything in Pro</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Team roles & permissions</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Expense approval workflows</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Accounting integrations</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="ml-3 text-sm">Priority support</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link to="/register">
                <Button className="w-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include 24/7 support and a 14-day money-back guarantee.
          </p>
          <p className="mt-2 text-muted-foreground">
            Have questions? <a href="#" className="text-primary underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pricing;
