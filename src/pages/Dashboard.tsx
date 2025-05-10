
import AppLayout from "@/components/layout/AppLayout";
import BalanceSummary from "@/components/dashboard/BalanceSummary";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ExpenseItem from "@/components/expenses/ExpenseItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { mockBalances, mockExpenses, mockGroups, mockSettlements, mockUsers } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = mockUsers[0]; // In a real app, this would come from auth context
  
  // Get the most recent expenses
  const recentExpenses = [...mockExpenses]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  const handleDeleteExpense = (id: string) => {
    toast({
      title: "Expense deleted",
      description: "The expense has been deleted successfully.",
    });
    // In a real app, we would make an API call to delete the expense
    console.log("Deleting expense:", id);
  };

  return (
    <AppLayout isAuthenticated={true}>
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/groups")}>
                Manage Groups
              </Button>
              <Button onClick={() => navigate("/add-expense")}>
                Add Expense
              </Button>
            </div>
          </div>
          
          {/* Balance Summary Cards */}
          <BalanceSummary 
            balances={mockBalances} 
            currentUserId={currentUser.id} 
          />
          
          {/* Recent Activity & Groups Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <RecentActivity 
              expenses={mockExpenses}
              settlements={mockSettlements}
              currentUserId={currentUser.id}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Your Groups</CardTitle>
                <CardDescription>
                  You're part of {mockGroups.length} groups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGroups.slice(0, 3).map(group => (
                  <div 
                    key={group.id} 
                    className="flex justify-between items-center p-3 rounded-md border hover:bg-accent/50 cursor-pointer transition-all"
                    onClick={() => console.log(`Navigate to group ${group.id}`)}
                  >
                    <span>{group.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {group.members.length} members
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => navigate("/groups")}
                >
                  View All Groups
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Recent Expenses Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Expenses</h2>
              <Button 
                variant="ghost" 
                onClick={() => console.log("View all expenses")}
              >
                View All
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentExpenses.map(expense => (
                <ExpenseItem 
                  key={expense.id}
                  expense={expense}
                  currentUserId={currentUser.id}
                  onDelete={handleDeleteExpense}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
