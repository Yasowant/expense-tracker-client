
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Expense } from '@/utils/types';

interface ExpenseItemProps {
  expense: Expense;
  currentUserId: string;
  onDelete?: (id: string) => void;
}

const ExpenseItem = ({ expense, currentUserId, onDelete }: ExpenseItemProps) => {
  // Determine if current user paid this expense
  const isPaidByCurrentUser = expense.paidBy.id === currentUserId;
  
  // Find how much current user owes or is owed
  const currentUserSplit = expense.splitWith.find(split => split.user.id === currentUserId);
  const currentUserAmount = currentUserSplit?.amount || 0;
  
  // Calculate net amount for current user
  const netAmount = isPaidByCurrentUser 
    ? expense.amount - currentUserAmount // You paid, so you're owed the difference
    : -currentUserAmount; // You didn't pay, so you owe your share
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return '🍔';
      case 'rent':
        return '🏠';
      case 'utilities':
        return '💡';
      case 'entertainment':
        return '🎬';
      case 'travel':
        return '✈️';
      case 'shopping':
        return '🛍️';
      default:
        return '📝';
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(expense.id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="text-xl" aria-hidden="true">
              {getCategoryIcon(expense.category)}
            </div>
            <div>
              <CardTitle className="text-lg">{expense.description}</CardTitle>
              <CardDescription>
                {formatDate(expense.createdAt)}
              </CardDescription>
            </div>
          </div>
          <Badge variant={expense.category === 'other' ? 'outline' : 'secondary'}>
            {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={expense.paidBy.avatar} />
              <AvatarFallback>{getInitials(expense.paidBy.name)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {isPaidByCurrentUser ? 'You' : expense.paidBy.name} paid
            </span>
          </div>
          <span className="font-semibold">
            {formatCurrency(expense.amount)}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-sm flex justify-between">
            <span className="text-muted-foreground">Your share:</span>
            <span className="font-medium">
              {formatCurrency(currentUserAmount)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className={`text-sm font-semibold ${netAmount > 0 ? 'text-expense-green' : netAmount < 0 ? 'text-expense-red' : ''}`}>
          {netAmount > 0 
            ? `You are owed ${formatCurrency(netAmount)}` 
            : netAmount < 0 
              ? `You owe ${formatCurrency(netAmount)}` 
              : "You're all settled"}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => console.log("Edit")}>
              Edit expense
            </DropdownMenuItem>
            <DropdownMenuItem 
              onSelect={handleDelete}
              className="text-red-600 focus:text-red-600"
            >
              Delete expense
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default ExpenseItem;
