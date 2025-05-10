
import { Group, User } from '@/utils/types';
import GroupItem from './GroupItem';
import { Button } from '@/components/ui/button';

interface GroupListProps {
  groups: Group[];
  currentUser: User;
}

const GroupList = ({ groups, currentUser }: GroupListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Groups</h2>
        <Button onClick={() => console.log("Create new group")}>
          Create New Group
        </Button>
      </div>

      {groups.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <GroupItem 
              key={group.id} 
              group={group}
              currentUser={currentUser} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No groups yet</h3>
          <p className="text-muted-foreground mb-6">
            Create a group to start tracking shared expenses with friends, roommates, or travel companions.
          </p>
          <Button>Create Your First Group</Button>
        </div>
      )}
    </div>
  );
};

export default GroupList;
