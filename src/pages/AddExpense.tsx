
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddExpenseForm from "@/components/expenses/AddExpenseForm";

const AddExpense = () => {
  return (
    <AppLayout isAuthenticated={true}>
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add New Expense</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Expense Details</CardTitle>
              <CardDescription>
                Enter the expense details and how you want to split it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddExpenseForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddExpense;
