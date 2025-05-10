import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { mockGroups, mockUsers } from "@/utils/mockData";
import { ExpenseCategory } from "@/utils/types";

const expenseCategories: ExpenseCategory[] = [
  "food",
  "rent",
  "utilities",
  "entertainment",
  "travel",
  "shopping",
  "other"
];

const expenseSchema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters"),
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.enum(["food", "rent", "utilities", "entertainment", "travel", "shopping", "other"]),
  groupId: z.string().optional(),
  split: z.string(),
  splitWith: z.record(z.string(), z.boolean())
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

const AddExpenseForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>([]);

  // Get current user (mocked)
  const currentUser = mockUsers[0];
  
  // Create form with validation
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "other",
      groupId: "",
      split: "equal",
      splitWith: {}
    }
  });

  // Watch for group selection changes
  const selectedGroupId = form.watch("groupId");
  
  // Update selected members when group changes
  const onGroupChange = (groupId: string) => {
    // Find selected group
    const selectedGroup = mockGroups.find(g => g.id === groupId);
    
    // Extract member IDs
    const memberIds = selectedGroup?.members.map(m => m.id) || [];
    
    // Update selected members
    setSelectedGroupMembers(memberIds);
    
    // Initialize splitWith checkboxes
    const splitWithValues: Record<string, boolean> = {};
    memberIds.forEach(id => {
      if (id !== currentUser.id) {
        splitWithValues[id] = true;
      }
    });
    
    form.setValue("splitWith", splitWithValues);
  };

  const onSubmit = async (data: ExpenseFormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      console.log("Expense data:", data);
      
      // Get the selected members to split with
      const selectedMembers = Object.entries(data.splitWith)
        .filter(([_, isSelected]) => isSelected)
        .map(([userId]) => userId);
      
      console.log("Splitting with:", selectedMembers);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Expense added successfully",
        description: `$${data.amount} for ${data.description} has been added.`,
      });
      
      // Navigate back to dashboard after success
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding expense:", error);
      
      toast({
        title: "Failed to add expense",
        description: "An error occurred while adding the expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Dinner at restaurant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  min="0.01" 
                  step="0.01" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expenseCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group (optional)</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onGroupChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="personal">No group (personal)</SelectItem>
                  {mockGroups.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="split"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Split Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select split type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="equal">Split equally</SelectItem>
                  <SelectItem value="exact">Enter exact amounts</SelectItem>
                  <SelectItem value="percentage">Enter percentages</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {selectedGroupId && (
          <div className="space-y-4">
            <div className="text-sm font-medium">Split with</div>
            <div className="space-y-2">
              {mockGroups
                .find(group => group.id === selectedGroupId)
                ?.members.map(member => {
                  // Skip current user in the split list
                  if (member.id === currentUser.id) return null;
                  
                  return (
                    <FormField
                      key={member.id}
                      control={form.control}
                      name={`splitWith.${member.id}`}
                      render={({ field }) => (
                        <div className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <label 
                              htmlFor={member.id}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {member.name}
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  );
                })}
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Expense"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddExpenseForm;
