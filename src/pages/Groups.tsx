
import AppLayout from "@/components/layout/AppLayout";
import { mockGroups, mockUsers } from "@/utils/mockData";
import GroupList from "@/components/groups/GroupList";

const Groups = () => {
  const currentUser = mockUsers[0]; // In a real app, this would come from auth context

  return (
    <AppLayout isAuthenticated={true}>
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Groups</h1>
          <p className="text-muted-foreground mt-1">
            Manage your expense groups and shared bills
          </p>
        </div>
        
        <GroupList groups={mockGroups} currentUser={currentUser} />
      </div>
    </AppLayout>
  );
};

export default Groups;
