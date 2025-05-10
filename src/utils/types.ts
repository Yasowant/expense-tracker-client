
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export type ExpenseCategory = 
  | 'food'
  | 'rent'
  | 'utilities'
  | 'entertainment'
  | 'travel'
  | 'shopping'
  | 'other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: User;
  splitWith: { user: User; amount: number }[];
  groupId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settlement {
  id: string;
  amount: number;
  paidBy: User;
  paidTo: User;
  groupId?: string;
  createdAt: Date;
}

export interface Balance {
  userId: string;
  userName: string;
  amount: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
}
