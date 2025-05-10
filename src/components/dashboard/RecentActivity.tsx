
import { useNavigate } from 'react-router-dom';
import { Expense, Settlement } from '@/utils/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RecentActivityProps {
  expenses: Expense[];
  settlements: Settlement[];
  currentUserId: string;
}

type ActivityItem = {
  id: string;
  type: 'expense' | 'settlement';
  description: string;
  amount: number;
  date: Date;
  avatarUrl?: string;
  avatarFallback: string;
};

const RecentActivity = ({ expenses, settlements, currentUserId }: RecentActivityProps) => {
  const navigate = useNavigate();

  // Convert expenses and settlements into a common format
  const activityItems: ActivityItem[] = [
    ...expenses.map(expense => ({
      id: expense.id,
      type: 'expense' as const,
      description: expense.description,
      amount: expense.paidBy.id === currentUserId 
        ? expense.amount 
        : -expense.splitWith.find(split => split.user.id === currentUserId)?.amount || 0,
      date: expense.createdAt,
      avatarUrl: expense.paidBy.avatar,
      avatarFallback: getInitials(expense.paidBy.name),
    })),
    ...settlements.map(settlement => ({
      id: settlement.id,
      type: 'settlement' as const,
      description: `Settlement with ${settlement.paidBy.id === currentUserId ? settlement.paidTo.name : settlement.paidBy.name}`,
      amount: settlement.paidBy.id === currentUserId ? -settlement.amount : settlement.amount,
      date: settlement.createdAt,
      avatarUrl: settlement.paidBy.id === currentUserId ? settlement.paidTo.avatar : settlement.paidBy.avatar,
      avatarFallback: getInitials(settlement.paidBy.id === currentUserId ? settlement.paidTo.name : settlement.paidBy.name),
    })),
  ];

  // Sort by date, most recent first
  const sortedActivity = activityItems.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  // Take the 5 most recent items
  const recentActivity = sortedActivity.slice(0, 5);

  // Helper function to get initials for avatar fallback
  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  // Helper function to format date
  function formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  // Helper function to format currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/expenses')}>View all</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map(item => (
              <div key={item.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={item.avatarUrl} alt="Avatar" />
                  <AvatarFallback>{item.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                    </div>
                    <div className={`text-sm font-medium ${item.amount >= 0 ? 'text-expense-green' : 'text-expense-red'}`}>
                      {item.amount >= 0 ? '+' : '-'} {formatCurrency(item.amount)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
