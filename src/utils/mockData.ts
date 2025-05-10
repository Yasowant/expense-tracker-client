
import { User, Group, Expense, Settlement, ExpenseCategory } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'You',
    email: 'you@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  },
  {
    id: 'u2',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 'u3',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
  },
  {
    id: 'u4',
    name: 'Taylor Brown',
    email: 'taylor@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
  },
  {
    id: 'u5',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
  }
];

// Mock Groups
export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Apartment 304',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-22')
  },
  {
    id: 'g2',
    name: 'Weekend Trip',
    members: [mockUsers[0], mockUsers[1], mockUsers[3], mockUsers[4]],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-15')
  },
  {
    id: 'g3',
    name: 'Lunch Club',
    members: [mockUsers[0], mockUsers[2], mockUsers[3]],
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-06-01')
  }
];

// Helper to create expense with proper date objects
const createExpense = (
  id: string,
  description: string,
  amount: number,
  category: ExpenseCategory,
  paidBy: User,
  splitWith: { user: User; amount: number }[],
  groupId: string | undefined,
  createdAt: string
): Expense => ({
  id,
  description,
  amount,
  category,
  paidBy,
  splitWith,
  groupId,
  createdAt: new Date(createdAt),
  updatedAt: new Date(createdAt)
});

// Mock Expenses
export const mockExpenses: Expense[] = [
  createExpense(
    'e1',
    'Groceries',
    120.50,
    'food',
    mockUsers[0],
    [
      { user: mockUsers[0], amount: 40.17 },
      { user: mockUsers[1], amount: 40.17 },
      { user: mockUsers[2], amount: 40.16 }
    ],
    'g1',
    '2023-05-20'
  ),
  createExpense(
    'e2',
    'Netflix Subscription',
    17.99,
    'entertainment',
    mockUsers[1],
    [
      { user: mockUsers[0], amount: 6.00 },
      { user: mockUsers[1], amount: 5.99 },
      { user: mockUsers[2], amount: 6.00 }
    ],
    'g1',
    '2023-05-15'
  ),
  createExpense(
    'e3',
    'Hotel Booking',
    350.00,
    'travel',
    mockUsers[3],
    [
      { user: mockUsers[0], amount: 87.50 },
      { user: mockUsers[1], amount: 87.50 },
      { user: mockUsers[3], amount: 87.50 },
      { user: mockUsers[4], amount: 87.50 }
    ],
    'g2',
    '2023-03-12'
  ),
  createExpense(
    'e4',
    'Thai Food',
    95.60,
    'food',
    mockUsers[0],
    [
      { user: mockUsers[0], amount: 31.87 },
      { user: mockUsers[2], amount: 31.87 },
      { user: mockUsers[3], amount: 31.86 }
    ],
    'g3',
    '2023-05-29'
  ),
  createExpense(
    'e5',
    'Utility Bill',
    210.75,
    'utilities',
    mockUsers[2],
    [
      { user: mockUsers[0], amount: 70.25 },
      { user: mockUsers[1], amount: 70.25 },
      { user: mockUsers[2], amount: 70.25 }
    ],
    'g1',
    '2023-05-05'
  )
];

// Mock Settlements
export const mockSettlements: Settlement[] = [
  {
    id: 's1',
    amount: 40.17,
    paidBy: mockUsers[1],
    paidTo: mockUsers[0],
    groupId: 'g1',
    createdAt: new Date('2023-05-22')
  },
  {
    id: 's2',
    amount: 70.25,
    paidBy: mockUsers[0],
    paidTo: mockUsers[2],
    groupId: 'g1',
    createdAt: new Date('2023-05-06')
  },
  {
    id: 's3',
    amount: 87.50,
    paidBy: mockUsers[0],
    paidTo: mockUsers[3],
    groupId: 'g2',
    createdAt: new Date('2023-03-15')
  }
];

// Calculate mock balances based on expenses and settlements
export const calculateMockBalances = () => {
  const balances = new Map<string, number>();
  
  // Initialize all users with 0 balance
  mockUsers.forEach(user => {
    balances.set(user.id, 0);
  });

  // Process expenses
  mockExpenses.forEach(expense => {
    // Add the full amount to the payer
    balances.set(
      expense.paidBy.id,
      (balances.get(expense.paidBy.id) || 0) + expense.amount
    );
    
    // Subtract each person's share
    expense.splitWith.forEach(split => {
      balances.set(
        split.user.id,
        (balances.get(split.user.id) || 0) - split.amount
      );
    });
  });

  // Process settlements
  mockSettlements.forEach(settlement => {
    // Subtract from the person who paid
    balances.set(
      settlement.paidBy.id,
      (balances.get(settlement.paidBy.id) || 0) - settlement.amount
    );
    
    // Add to the person who received
    balances.set(
      settlement.paidTo.id,
      (balances.get(settlement.paidTo.id) || 0) + settlement.amount
    );
  });

  return Object.entries(Object.fromEntries(balances)).map(([userId, amount]) => {
    const user = mockUsers.find(u => u.id === userId);
    return {
      userId,
      userName: user ? user.name : 'Unknown User',
      amount: parseFloat(amount.toFixed(2))
    };
  });
};

export const mockBalances = calculateMockBalances();
