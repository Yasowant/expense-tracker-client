
import { Balance } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BalanceSummaryProps {
  balances: Balance[];
  currentUserId: string;
}

const BalanceSummary = ({ balances, currentUserId }: BalanceSummaryProps) => {
  // Find the current user's balance
  const currentUserBalance = balances.find(balance => balance.userId === currentUserId);
  
  // Calculate total owed to you
  const totalOwedToYou = balances
    .filter(balance => balance.userId !== currentUserId && balance.amount < 0)
    .reduce((sum, balance) => sum + Math.abs(balance.amount), 0);
  
  // Calculate total you owe
  const totalYouOwe = balances
    .filter(balance => balance.userId !== currentUserId && balance.amount > 0)
    .reduce((sum, balance) => sum + balance.amount, 0);
  
  // Calculate net balance
  const netBalance = (currentUserBalance?.amount || 0) - totalYouOwe;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Determine the status text and color
  let statusText = "You're all settled up";
  let statusColorClass = "text-primary";
  
  if (netBalance > 0) {
    statusText = "You are owed money";
    statusColorClass = "text-expense-green";
  } else if (netBalance < 0) {
    statusText = "You owe money";
    statusColorClass = "text-expense-red";
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-expense-green' : 'text-expense-red'}`}>
            {formatCurrency(Math.abs(netBalance))}
          </div>
          <p className={`mt-1 text-xs ${statusColorClass}`}>
            {statusText}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            You Are Owed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-green">
            {formatCurrency(totalOwedToYou)}
          </div>
          <p className="mt-1 text-xs">
            {totalOwedToYou > 0 
              ? `From ${balances.filter(b => b.userId !== currentUserId && b.amount < 0).length} people` 
              : "No one owes you"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            You Owe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-red">
            {formatCurrency(totalYouOwe)}
          </div>
          <p className="mt-1 text-xs">
            {totalYouOwe > 0 
              ? `To ${balances.filter(b => b.userId !== currentUserId && b.amount > 0).length} people` 
              : "You don't owe anyone"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSummary;
